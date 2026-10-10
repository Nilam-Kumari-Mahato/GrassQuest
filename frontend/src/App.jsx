import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Journal from './Components/Journal';
import Quest from './Components/Quest';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'journal' | 'quest'

  // Persistent sticker album state
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
    <div className="app-container">
      {/* Persistent floating glass navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main>
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
            onCompleteQuest={handleCompleteQuest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
