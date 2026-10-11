import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Journal from './Components/Journal';
import Quest from './Components/Quest';
import { stickers } from './data/stickers';
import { JOURNAL_STORAGE_KEY, loadJournalState, recordQuestCompletion } from './utils/journal';

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'journal' | 'quest'
  const [activeQuest, setActiveQuest] = useState(null);
  const [journal, setJournal] = useState(() => {
    try {
      return loadJournalState(window.localStorage, stickers);
    } catch {
      return { unlockedStickerIds: [], completedQuests: [] };
    }
  });
  const journalRef = useRef(journal);

  useEffect(() => {
    try {
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journal));
    } catch {
      // Browser storage can be disabled; the current session still works.
    }
  }, [journal]);

  const handleCompleteQuest = (quest) => {
    const completion = recordQuestCompletion(journalRef.current, quest, stickers);
    journalRef.current = completion.state;
    setJournal(completion.state);
    return completion.result;
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative font-body bg-[#FFF9E9] text-forest">
      {/* Persistent floating glass navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 w-full flex flex-col">
        {activePage === 'home' && (
          <Hero
            onStartQuest={() => setActivePage('quest')}
            onOpenJournal={() => setActivePage('journal')}
          />
        )}

        {activePage === 'journal' && (
          <Journal
            onNavigate={setActivePage}
            unlockedStickers={journal.unlockedStickerIds}
            completedQuests={journal.completedQuests}
          />
        )}

        {activePage === 'quest' && (
          <Quest
            onNavigate={setActivePage}
            completedQuests={journal.completedQuests}
            onCompleteQuest={handleCompleteQuest}
            currentQuest={activeQuest}
            onQuestChange={setActiveQuest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
