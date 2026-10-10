import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Journal from './Components/Journal';
import Quest from './Components/Quest';

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'journal' | 'quest'

  // Persistent sticker album state (starts with lucky clover)
  const [unlockedStickers, setUnlockedStickers] = useState(() => {
    try {
      const saved = localStorage.getItem('grassquest_stickers');
      return saved ? JSON.parse(saved) : ['clover'];
    } catch {
      return ['clover'];
    }
  });

  // Persistent completed quests state
  const [completedQuests, setCompletedQuests] = useState(() => {
    try {
      const saved = localStorage.getItem('grassquest_completed_quests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('grassquest_stickers', JSON.stringify(unlockedStickers));
    } catch (e) {
      console.error(e);
    }
  }, [unlockedStickers]);

  useEffect(() => {
    try {
      localStorage.setItem('grassquest_completed_quests', JSON.stringify(completedQuests));
    } catch (e) {
      console.error(e);
    }
  }, [completedQuests]);

  const handleCompleteQuest = (questId, stickerId) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests((prev) => [...prev, questId]);
    }
    if (stickerId && !unlockedStickers.includes(stickerId)) {
      setUnlockedStickers((prev) => [...prev, stickerId]);
    }
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
            unlockedStickers={unlockedStickers}
            completedQuests={completedQuests}
          />
        )}

        {activePage === 'quest' && (
          <Quest
            onNavigate={setActivePage}
            completedQuests={completedQuests}
            unlockedStickers={unlockedStickers}
            onCompleteQuest={handleCompleteQuest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
