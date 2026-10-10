import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, PlusCircle, CheckCircle2, Lock, Smile, Calendar, MapPin } from 'lucide-react';
import bgImg from '../assets/bg_img.png';

const ALL_STICKERS = [
    {
        id: 'clover',
        name: 'Lucky Four-Leaf',
        emoji: '🍀',
        category: 'Flora',
        description: 'Found nestled in a soft clover patch. Brings quiet luck to every outdoor step.',
        unlockedAt: 'Gift from Clover Pet'
    },
    {
        id: 'wildflower',
        name: 'Wildflower Sprig',
        emoji: '🌸',
        category: 'Flora',
        description: 'A vibrant blossom discovered smiling in an unexpected roadside meadow.',
        questId: 'quest_1'
    },
    {
        id: 'cloud',
        name: 'Dreamy Cloud',
        emoji: '☁️',
        category: 'Sky',
        description: 'Earned by pausing for five minutes to watch the soft drifting clouds.',
        questId: 'quest_2'
    },
    {
        id: 'tree',
        name: 'Ancient Bark',
        emoji: '🌳',
        category: 'Flora',
        description: 'Touched the textured wood of a tall tree and listened to rustling leaves.',
        questId: 'quest_3'
    },
    {
        id: 'dewdrop',
        name: 'Morning Dewdrop',
        emoji: '💧',
        category: 'Atmosphere',
        description: 'Caught a shimmering miniature prism resting on a cool morning blade of grass.',
        questId: 'quest_4'
    },
    {
        id: 'ladybug',
        name: 'Ladybug Buddy',
        emoji: '🐞',
        category: 'Fauna',
        description: 'Quietly observed a little spotted wanderer taking its afternoon stroll.',
        questId: 'quest_5'
    },
    {
        id: 'mushroom',
        name: 'Mossy Mushroom',
        emoji: '🍄',
        category: 'Forest',
        description: 'Discovered near damp wood after the morning mist settled down.',
        questId: 'quest_6'
    },
    {
        id: 'sunbeam',
        name: 'Golden Sunbeam',
        emoji: '☀️',
        category: 'Sky',
        description: 'Basked in warm midday natural sunlight to rejuvenate the wandering soul.',
        questId: 'quest_7'
    }
];

export default function Journal({ onNavigate, unlockedStickers = ['clover'], completedQuests = [] }) {
    const [activeTab, setActiveTab] = useState('stickers'); // 'stickers' | 'notes'
    const [selectedSticker, setSelectedSticker] = useState(null);

    // Field Notes State
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'First Step into the Sunlight',
            text: 'Put my phone down for 15 minutes today. Walked through the neighborhood park and noticed tiny daisies blooming between sidewalk pavers.',
            date: 'Today, 10:45 AM',
            stickerEmoji: '🍀'
        }
    ]);
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [selectedStickerForNote, setSelectedStickerForNote] = useState('🍀');

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newText.trim()) return;

        const newEntry = {
            id: Date.now(),
            title: newTitle.trim(),
            text: newText.trim(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            stickerEmoji: selectedStickerForNote
        };

        setNotes([newEntry, ...notes]);
        setNewTitle('');
        setNewText('');
    };

    const unlockedCount = ALL_STICKERS.filter(s => unlockedStickers.includes(s.id)).length;

    return (
        <div
            className="page-view-container"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="page-inner-content">
                {/* Top Navigation Row */}
                <div className="page-top-header">
                    <button
                        className="back-home-btn"
                        onClick={() => onNavigate('home')}
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </button>

                    <div className="page-title-badge">
                        <BookOpen size={16} />
                        <span>Field Scrapbook & Stickers</span>
                    </div>
                </div>

                {/* Journal Banner */}
                <div className="journal-hero-banner">
                    <div>
                        <h1 className="journal-title">My Sticker Journal</h1>
                        <p className="journal-subtitle">
                            Collect wild stickers by stepping outdoors into the sunlight
                        </p>
                    </div>

                    <div className="journal-stats">
                        <div className="stat-pill">
                            <div className="stat-num">{unlockedCount} / {ALL_STICKERS.length}</div>
                            <div className="stat-label">Stickers Found</div>
                        </div>
                        <div className="stat-pill">
                            <div className="stat-num">{completedQuests.length}</div>
                            <div className="stat-label">Quests Done</div>
                        </div>
                    </div>
                </div>

                {/* Tab Selection */}
                <div className="journal-nav-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stickers')}
                    >
                        <Sparkles size={18} />
                        <span>Sticker Album ({unlockedCount})</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notes')}
                    >
                        <BookOpen size={18} />
                        <span>Outdoor Memories ({notes.length})</span>
                    </button>
                </div>

                {/* TAB 1: Sticker Album */}
                {activeTab === 'stickers' && (
                    <div>
                        <div className="sticker-grid">
                            {ALL_STICKERS.map((sticker) => {
                                const isUnlocked = unlockedStickers.includes(sticker.id);

                                return (
                                    <div
                                        key={sticker.id}
                                        className={`sticker-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                                        onClick={() => setSelectedSticker(sticker)}
                                    >
                                        <div className="sticker-badge-icon">
                                            {isUnlocked ? sticker.emoji : <Lock size={28} color="#8a9e80" />}
                                        </div>
                                        <h3 className="sticker-name">{sticker.name}</h3>
                                        <span className="sticker-category">{sticker.category}</span>
                                        <span className="sticker-tag">
                                            {isUnlocked ? 'Collected' : 'Complete Quest to Unlock'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Sticker Detail Modal */}
                        {selectedSticker && (
                            <div className="reward-modal-overlay" onClick={() => setSelectedSticker(null)}>
                                <div className="reward-modal" onClick={e => e.stopPropagation()}>
                                    <div className="reward-icon-burst">
                                        {unlockedStickers.includes(selectedSticker.id) ? selectedSticker.emoji : '🔒'}
                                    </div>
                                    <h2 className="reward-modal-title">{selectedSticker.name}</h2>
                                    <p className="reward-modal-text">
                                        {unlockedStickers.includes(selectedSticker.id)
                                            ? selectedSticker.description
                                            : 'This sticker is locked in nature! Complete outdoor quests to discover it.'}
                                    </p>

                                    {!unlockedStickers.includes(selectedSticker.id) && (
                                        <button
                                            className="reward-modal-btn"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => onNavigate('quest')}
                                        >
                                            Find in Quests
                                        </button>
                                    )}

                                    <button
                                        className="reward-modal-btn"
                                        onClick={() => setSelectedSticker(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: Notes & Memories */}
                {activeTab === 'notes' && (
                    <div className="journal-entries-container">
                        {/* Form */}
                        <form className="entry-form-card" onSubmit={handleAddNote}>
                            <h2 className="entry-form-title">Log a Nature Moment</h2>

                            <input
                                type="text"
                                placeholder="Title (e.g., Morning Walk under the Oaks)"
                                className="entry-input"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />

                            <textarea
                                placeholder="What did you smell, see, touch or hear outside today?"
                                className="entry-textarea"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                required
                            />

                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#38522e', marginBottom: '8px' }}>
                                Stamp with a Collected Sticker:
                            </label>
                            <select
                                className="entry-select"
                                value={selectedStickerForNote}
                                onChange={(e) => setSelectedStickerForNote(e.target.value)}
                            >
                                {ALL_STICKERS
                                    .filter(s => unlockedStickers.includes(s.id))
                                    .map(s => (
                                        <option key={s.id} value={s.emoji}>
                                            {s.emoji} {s.name}
                                        </option>
                                    ))}
                            </select>

                            <button type="submit" className="submit-entry-btn">
                                Save to Journal
                            </button>
                        </form>

                        {/* List */}
                        <div className="entries-list">
                            {notes.map((note) => (
                                <div key={note.id} className="entry-card">
                                    <div className="entry-card-header">
                                        <h3 className="entry-card-title">
                                            {note.stickerEmoji} {note.title}
                                        </h3>
                                        <span className="entry-card-date">{note.date}</span>
                                    </div>
                                    <p className="entry-card-text">{note.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
