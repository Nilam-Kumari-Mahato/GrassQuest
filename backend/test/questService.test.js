import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuest, validatePreferences } from '../src/services/questService.js';
import { generateWithOllama, parseQuest } from '../src/services/ollamaService.js';

const preferences = {
  mood: 'curious',
  interests: ['cloud-watching'],
  duration: '15',
  environment: 'park',
};

const modelQuest = {
  title: 'Cloud story',
  description: 'Watch the clouds drift above the park.',
  instructions: ['Find a comfortable place to look up.', 'Notice how one cloud changes shape.'],
  completionMessage: 'You took time to notice the sky.',
};

function mockFetch(t, implementation) {
  const originalFetch = globalThis.fetch;
  const originalConsoleWarn = console.warn;
  globalThis.fetch = implementation;
  console.warn = () => {};
  t.after(() => {
    globalThis.fetch = originalFetch;
    console.warn = originalConsoleWarn;
  });
}

test('normalizes valid preference duration to a number', () => {
  assert.deepEqual(validatePreferences(preferences), { ...preferences, duration: 15 });
});

test('rejects missing and invalid preference values', () => {
  assert.throws(() => validatePreferences(null), { status: 400 });
  assert.throws(() => validatePreferences({ ...preferences, mood: 'sleepy' }), /valid mood/);
  assert.throws(() => validatePreferences({ ...preferences, interests: [] }), /valid, unique interests/);
  assert.throws(() => validatePreferences({ ...preferences, interests: ['not-a-real-interest'] }), /valid, unique interests/);
  assert.throws(() => validatePreferences({ ...preferences, duration: true }), /whole number/);
  assert.throws(() => validatePreferences({ ...preferences, duration: '15.5' }), /whole number/);
  assert.throws(() => validatePreferences({ ...preferences, duration: '181' }), /whole number/);
  assert.throws(() => validatePreferences({ ...preferences, environment: 'beach' }), /valid environment/);
});

test('parses structured quest JSON and applies validated preference metadata', () => {
  const result = parseQuest(`Here is the quest:\n${JSON.stringify(modelQuest)}`, { duration: 15, environment: 'park' });
  assert.deepEqual(result, { ...modelQuest, duration: 15, environment: 'park' });
});

test('rejects malformed or incomplete model output', () => {
  assert.throws(() => parseQuest('not json', { duration: 15, environment: 'park' }));
  assert.throws(() => parseQuest(JSON.stringify({ ...modelQuest, instructions: ['Only one step'] }), { duration: 15, environment: 'park' }));
  assert.throws(() => parseQuest(JSON.stringify({ ...modelQuest, title: '' }), { duration: 15, environment: 'park' }));
});

test('calls Ollama and returns a validated quest', async (t) => {
  mockFetch(t, async (_url, options) => {
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'gemma4:e2b');
    assert.equal(body.stream, false);
    assert.equal(body.format, 'json');
    return { ok: true, json: async () => ({ response: JSON.stringify(modelQuest) }) };
  });
  const result = await createQuest(preferences);
  assert.equal(result.title, modelQuest.title);
  assert.equal(result.duration, 15);
  assert.equal(result.environment, 'park');
});

test('returns a safe 502 when Ollama is unavailable', async (t) => {
  mockFetch(t, async () => { throw new TypeError('connection details should not reach the client'); });
  await assert.rejects(generateWithOllama({ duration: 15, environment: 'park' }), (error) => {
    assert.equal(error.status, 502);
    assert.match(error.publicMessage, /Check that Ollama is running/);
    assert.doesNotMatch(error.publicMessage, /connection details/);
    return true;
  });
});

test('returns a timeout-specific error when Ollama aborts', async (t) => {
  mockFetch(t, async () => {
    const error = new Error('aborted');
    error.name = 'AbortError';
    throw error;
  });
  await assert.rejects(generateWithOllama({ duration: 15, environment: 'park' }), (error) => {
    assert.equal(error.status, 502);
    assert.match(error.publicMessage, /took too long/);
    return true;
  });
});

test('does not treat malformed model output as a successful quest', async (t) => {
  mockFetch(t, async () => ({ ok: true, json: async () => ({ response: 'This is not JSON' }) }));
  await assert.rejects(generateWithOllama({ duration: 15, environment: 'park' }), { status: 502 });
});
