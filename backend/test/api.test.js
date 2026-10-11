import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';

let server;
let baseUrl;

function request(path, { method = 'GET', body, contentType = 'application/json' } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const requestBody = body ?? '';
    const req = http.request(url, {
      method,
      headers: {
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...(requestBody ? { 'Content-Length': Buffer.byteLength(requestBody) } : {}),
      },
    }, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: responseBody ? JSON.parse(responseBody) : null }));
    });
    req.on('error', reject);
    req.end(requestBody);
  });
}

test.before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = 'http://127.0.0.1:' + server.address().port;
});

test.after(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('health endpoint returns service status', async () => {
  const response = await request('/api/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});

test('generation endpoint returns a useful 400 for missing preferences', async () => {
  const response = await request('/api/quests/generate', { method: 'POST', body: '{}' });
  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.match(response.body.error, /mood, interests, duration, and environment/);
});

test('generation endpoint returns the stable quest contract for valid preferences', async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      response: JSON.stringify({
        title: 'Cloud story',
        description: 'Watch the clouds above you.',
        instructions: ['Find a place to look up.', 'Notice one cloud changing shape.'],
        completionMessage: 'You found a moment of wonder.',
      }),
    }),
  });
  console.warn = () => {};
  t.after(() => {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  });
  const response = await request('/api/quests/generate', {
    method: 'POST',
    body: JSON.stringify({ mood: 'curious', interests: ['cloud-watching'], duration: 15, environment: 'park' }),
  });
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.deepEqual(response.body.quest, {
    title: 'Cloud story',
    description: 'Watch the clouds above you.',
    instructions: ['Find a place to look up.', 'Notice one cloud changing shape.'],
    completionMessage: 'You found a moment of wonder.',
    duration: 15,
    environment: 'park',
  });
});

test('generation endpoint handles malformed JSON with a 400 response', async () => {
  const response = await request('/api/quests/generate', { method: 'POST', body: '{bad' });
  assert.equal(response.status, 400);
  assert.match(response.body.error, /valid JSON/);
});

test('JSON body size limit returns 413 without exposing internal errors', async () => {
  const response = await request('/api/quests/generate', { method: 'POST', body: JSON.stringify({ large: 'x'.repeat(21_000) }) });
  assert.equal(response.status, 413);
  assert.deepEqual(response.body, { success: false, error: 'Request body is too large.' });
});
