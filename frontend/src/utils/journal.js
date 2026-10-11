export const JOURNAL_STORAGE_KEY = 'grassquest_journal';

const sameId = (left, right) => String(left) === String(right);

export function normalizeJournalState(value, stickers) {
  const validStickerIds = new Set(stickers.map((sticker) => String(sticker.id)));
  const unlockedStickerIds = Array.isArray(value?.unlockedStickerIds)
    ? value.unlockedStickerIds
    : Array.isArray(value?.unlockedStickers)
      ? value.unlockedStickers
      : [];
  const completedQuests = Array.isArray(value?.completedQuests) ? value.completedQuests : [];

  return {
    unlockedStickerIds: [...new Set(unlockedStickerIds
      .filter((id) => validStickerIds.has(String(id)))
      .map((id) => stickers.find((sticker) => sameId(sticker.id, id)).id))],
    completedQuests: completedQuests
      .filter((quest) => typeof quest === 'string' || typeof quest === 'number' || (quest && quest.id != null))
      .map((quest) => typeof quest === 'object'
        ? quest
        : { id: String(quest), legacy: true }),
  };
}

export function loadJournalState(storage, stickers) {
  try {
    const savedJournal = storage.getItem(JOURNAL_STORAGE_KEY);
    if (savedJournal) return normalizeJournalState(JSON.parse(savedJournal), stickers);

    return normalizeJournalState({
      unlockedStickers: JSON.parse(storage.getItem('grassquest_stickers') || '[]'),
      completedQuests: JSON.parse(storage.getItem('grassquest_completed_quests') || '[]'),
    }, stickers);
  } catch {
    return { unlockedStickerIds: [], completedQuests: [] };
  }
}

export function chooseStickerReward(stickers, unlockedStickerIds, random = Math.random) {
  const eligible = stickers.filter((sticker) => !unlockedStickerIds.some((id) => sameId(id, sticker.id)));
  if (!eligible.length) return null;
  const index = Math.min(eligible.length - 1, Math.floor(Math.max(0, random()) * eligible.length));
  return eligible[index];
}

export function recordQuestCompletion(state, quest, stickers, random = Math.random, completedAt = new Date()) {
  const questId = String(quest.id);
  const existing = state.completedQuests.find((record) => sameId(record.id, questId));
  if (existing) {
    return { state, result: { alreadyCompleted: true, record: existing, sticker: null } };
  }

  const sticker = chooseStickerReward(stickers, state.unlockedStickerIds, random);
  const preferences = quest.preferences || {};
  const record = {
    id: questId,
    title: quest.title,
    description: quest.description,
    completedAt: completedAt.toISOString(),
    mood: preferences.mood,
    interests: Array.isArray(preferences.interests) ? preferences.interests : [],
    duration: quest.duration ?? preferences.duration,
    environment: quest.environment ?? preferences.environment,
    stickerId: sticker?.id ?? null,
  };

  return {
    state: {
      unlockedStickerIds: sticker
        ? [...state.unlockedStickerIds, sticker.id]
        : state.unlockedStickerIds,
      completedQuests: [record, ...state.completedQuests],
    },
    result: { alreadyCompleted: false, record, sticker },
  };
}
