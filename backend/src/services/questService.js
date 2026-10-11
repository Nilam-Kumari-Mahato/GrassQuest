import { generateWithOllama } from './ollamaService.js';

const moods = new Set(['bored', 'calm', 'curious', 'adventurous', 'tired', 'happy']);
const interests = new Set(['plants-flowers', 'nature-photography', 'birds-butterflies', 'cloud-watching', 'walking-exploring', 'peaceful-moments', 'tiny-details', 'creative-challenges']);
const environments = new Set(['park', 'garden', 'neighborhood', 'balcony', 'indoors', 'any']);

function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  error.publicMessage = message;
  return error;
}

export function validatePreferences(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw invalid('Provide mood, interests, duration, and environment.');
  const { mood, interests: chosenInterests, duration, environment } = input;
  if (mood == null || chosenInterests == null || duration == null || environment == null) {
    throw invalid('Provide mood, interests, duration, and environment.');
  }
  if (!moods.has(mood)) throw invalid('Choose a valid mood.');
  if (!Array.isArray(chosenInterests) || chosenInterests.length < 1 || chosenInterests.length > 3 || chosenInterests.some((item) => !interests.has(item)) || new Set(chosenInterests).size !== chosenInterests.length) {
    throw invalid('Choose between 1 and 3 valid, unique interests.');
  }
  const validDurationType = typeof duration === 'number' || (typeof duration === 'string' && /^\d+$/.test(duration));
  const minutes = validDurationType ? Number(duration) : Number.NaN;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 180) throw invalid('Duration must be a whole number between 1 and 180 minutes.');
  if (!environments.has(environment)) throw invalid('Choose a valid environment.');
  return { mood, interests: chosenInterests, duration: minutes, environment };
}

export async function createQuest(input) {
  const preferences = validatePreferences(input);
  return generateWithOllama(preferences);
}
