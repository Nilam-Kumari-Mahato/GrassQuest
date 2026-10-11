const baseUrl = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const model = process.env.OLLAMA_MODEL || 'gemma4:e2b';
const timeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS) || 120000;

export function parseQuest(text, preferences) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Model response was not JSON');
  const value = JSON.parse(cleaned.slice(start, end + 1));
  const { title, description, instructions, completionMessage } = value;
  if (typeof title !== 'string' || !title.trim() || title.length > 100) throw new Error('Invalid quest title');
  if (typeof description !== 'string' || !description.trim() || description.length > 600) throw new Error('Invalid quest description');
  if (!Array.isArray(instructions) || instructions.length < 2 || instructions.length > 6 || instructions.some((step) => typeof step !== 'string' || !step.trim() || step.length > 240)) throw new Error('Invalid quest instructions');
  if (typeof completionMessage !== 'string' || !completionMessage.trim() || completionMessage.length > 200) throw new Error('Invalid completion message');
  return { title: title.trim(), description: description.trim(), instructions: instructions.map((step) => step.trim()), duration: preferences.duration, environment: preferences.environment, completionMessage: completionMessage.trim() };
}

export async function generateWithOllama(preferences) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const prompt = [
    'Create one personalized, achievable nature observation quest for a general audience.',
    'Return only a JSON object with string fields title, description, completionMessage and an instructions array of 2 to 6 short strings.',
    'Keep it safe, gentle, equipment-free, and possible in the stated duration and setting.',
    'Never suggest eating unknown plants, touching unfamiliar animals, trespassing, or damaging nature.',
    'Relate it to at least one selected interest and the stated mood.',
    `Preferences: ${JSON.stringify(preferences)}`,
  ].join('\n');
  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false, format: 'json', options: { temperature: 0.8 } }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Ollama returned HTTP ${response.status}`);
    const data = await response.json();
    if (typeof data.response !== 'string') throw new Error('Ollama returned an unexpected response');
    return parseQuest(data.response, preferences);
  } catch (error) {
    console.warn('Ollama request failed:', error?.name === 'AbortError' ? 'timeout' : 'request error');
    const wrapped = new Error('Ollama quest generation failed');
    wrapped.status = 502;
    wrapped.publicMessage = error.name === 'AbortError'
      ? 'Quest generation took too long. Please try again.'
      : 'Could not generate a quest. Check that Ollama is running with gemma4:e2b and try again.';
    throw wrapped;
  } finally {
    clearTimeout(timeout);
  }
}
