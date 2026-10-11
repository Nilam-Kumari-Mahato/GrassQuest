import test from 'node:test';
import assert from 'node:assert/strict';
import { chooseStickerReward, loadJournalState, normalizeJournalState, recordQuestCompletion } from './journal.js';

const stickers = [{ id: 1, label: 'One' }, { id: 2, label: 'Two' }, { id: 3, label: 'Three' }];
const quest = {
  id: 'quest-1',
  title: 'Cloud watcher',
  description: 'Observe the clouds.',
  duration: 15,
  environment: 'park',
  preferences: { mood: 'curious', interests: ['cloud-watching'] },
};

test('normalizes legacy storage and ignores unknown sticker IDs', () => {
  const state = normalizeJournalState({
    unlockedStickers: ['clover', '2'],
    completedQuests: ['old-quest'],
  }, stickers);
  assert.deepEqual(state.unlockedStickerIds, [2]);
  assert.deepEqual(state.completedQuests, [{ id: 'old-quest', legacy: true }]);
});

test('loads the saved journal and falls back to legacy browser-storage keys', () => {
  const newJournalStorage = {
    getItem: (key) => key === 'grassquest_journal'
      ? JSON.stringify({ unlockedStickerIds: [1], completedQuests: [] })
      : null,
  };
  assert.deepEqual(loadJournalState(newJournalStorage, stickers), { unlockedStickerIds: [1], completedQuests: [] });

  const legacyStorage = {
    getItem: (key) => key === 'grassquest_stickers' ? '[2]' : key === 'grassquest_completed_quests' ? '["old"]' : null,
  };
  assert.deepEqual(loadJournalState(legacyStorage, stickers), {
    unlockedStickerIds: [2],
    completedQuests: [{ id: 'old', legacy: true }],
  });
});

test('selects only an uncollected sticker with deterministic randomness', () => {
  assert.equal(chooseStickerReward(stickers, [1, 2], () => 0).id, 3);
  assert.equal(chooseStickerReward(stickers, [1, 2, 3]), null);
});

test('records completion details and awards exactly one sticker', () => {
  const initial = { unlockedStickerIds: [], completedQuests: [] };
  const result = recordQuestCompletion(initial, quest, stickers, () => 0.5, new Date('2026-10-12T00:00:00.000Z'));
  assert.equal(result.result.sticker.id, 2);
  assert.deepEqual(result.state.unlockedStickerIds, [2]);
  assert.equal(result.state.completedQuests[0].title, quest.title);
  assert.equal(result.state.completedQuests[0].mood, 'curious');
  assert.equal(result.state.completedQuests[0].completedAt, '2026-10-12T00:00:00.000Z');
});

test('duplicate completion does not add history or another sticker', () => {
  const once = recordQuestCompletion({ unlockedStickerIds: [], completedQuests: [] }, quest, stickers, () => 0);
  const twice = recordQuestCompletion(once.state, quest, stickers, () => 0.99);
  assert.equal(twice.result.alreadyCompleted, true);
  assert.equal(twice.state, once.state);
  assert.equal(twice.state.unlockedStickerIds.length, 1);
  assert.equal(twice.state.completedQuests.length, 1);
});

test('completion remains recorded without a duplicate reward after all stickers are collected', () => {
  const initial = { unlockedStickerIds: [1, 2, 3], completedQuests: [] };
  const result = recordQuestCompletion(initial, quest, stickers);
  assert.equal(result.result.sticker, null);
  assert.deepEqual(result.state.unlockedStickerIds, [1, 2, 3]);
  assert.equal(result.state.completedQuests.length, 1);
});
