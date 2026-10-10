import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Lock } from 'lucide-react';
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
    },
    {
        id: 'butterfly',
        name: 'Flutter Butterfly',
        emoji: '🦋',
        category: 'Fauna',
        description: 'Danced along with gentle wings fluttering across dandelion blossoms.',
        questId: 'quest_8'
    },
    {
        id: 'rainbow',
        name: 'Sky Meadow',
        emoji: '🌈',
        category: 'Sky',
        description: 'Caught the magic of colors arching above a quiet rainy horizon.',
        questId: 'quest_9'
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
            className="min-h-screen w-full pt-24 pb-16 relative bg-cover bg-bottom bg-no-repeat flex flex-col"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="max-w-[1140px] w-[92%] mx-auto relative z-10">
                {/* Top Navigation Row */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <button
                        className="inline-flex items-center gap-2 py-2 px-5 bg-white/85 backdrop-blur-sm border-[1.5px] border-white/90 rounded-full font-rounded text-[0.95rem] font-semibold text-forest shadow-sm hover:bg-white hover:-translate-x-1 transition-all duration-200 cursor-pointer"
                        onClick={() => onNavigate('home')}
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </button>

                    <div className="inline-flex items-center gap-2 bg-[#EBF6E4]/85 backdrop-blur-md py-1.5 px-4.5 rounded-full border border-white/80 font-rounded text-sm font-bold text-forest">
                        <BookOpen size={16} />
                        <span>Field Scrapbook & Stickers</span>
                    </div>
                </div>

                {/* Journal Banner */}
                <div className="bg-white/85 backdrop-blur-md border-[1.5px] border-white/90 rounded-[28px] p-7 sm:p-8 mb-7 shadow-soft-card flex justify-between items-center flex-wrap gap-5">
                    <div>
                        <h1 className="font-hero text-4xl sm:text-5xl text-forest leading-tight mb-1.5">My Sticker Journal</h1>
                        <p className="font-quote text-xl sm:text-2xl text-forest/75">
                            Collect wild stickers by stepping outdoors into the sunlight
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-[#EBF6E4]/90 border border-clover/30 py-2.5 px-5 rounded-[20px] text-center">
                            <div className="font-hero text-3xl font-bold text-clover leading-none">{unlockedCount} / {ALL_STICKERS.length}</div>
                            <div className="font-rounded text-xs text-forest font-semibold mt-1">Stickers Found</div>
                        </div>
                        <div className="bg-[#EBF6E4]/90 border border-clover/30 py-2.5 px-5 rounded-[20px] text-center">
                            <div className="font-hero text-3xl font-bold text-clover leading-none">{completedQuests.length}</div>
                            <div className="font-rounded text-xs text-forest font-semibold mt-1">Quests Done</div>
                        </div>
                    </div>
                </div>

                {/* Tab Selection */}
                <div className="flex gap-3 mb-6">
                    <button
                        className={`py-2.5 px-6 rounded-full border-[1.5px] border-white/85 bg-white/75 font-rounded text-base font-bold text-forest cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-white ${activeTab === 'stickers' ? '!bg-clover !text-white !border-clover shadow-botanical' : ''
                            }`}
                        onClick={() => setActiveTab('stickers')}
                    >
                        <Sparkles size={18} />
                        <span>Sticker Album ({unlockedCount})</span>
                    </button>
                    <button
                        className={`py-2.5 px-6 rounded-full border-[1.5px] border-white/85 bg-white/75 font-rounded text-base font-bold text-forest cursor-pointer transition-all duration-200 flex items-center gap-2 hover:bg-white ${activeTab === 'notes' ? '!bg-clover !text-white !border-clover shadow-botanical' : ''
                            }`}
                        onClick={() => setActiveTab('notes')}
                    >
                        <BookOpen size={18} />
                        <span>Outdoor Memories ({notes.length})</span>
                    </button>
                </div>

                {/* TAB 1: Sticker Album */}
                {activeTab === 'stickers' && (
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-10">
                            {ALL_STICKERS.map((sticker) => {
                                const isUnlocked = unlockedStickers.includes(sticker.id);

                                return (
                                    <div
                                        key={sticker.id}
                                        className={`bg-white/85 backdrop-blur-sm border-[1.5px] border-white/95 rounded-[24px] p-5 text-center shadow-soft-card cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-float flex flex-col items-center relative group ${isUnlocked ? '' : 'opacity-65 bg-[#F0F4EE]/70 border-dashed'
                                            }`}
                                        onClick={() => setSelectedSticker(sticker)}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-[#F4FAEE] flex items-center justify-center text-4xl mb-3 shadow-inner group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300">
                                            {isUnlocked ? sticker.emoji : <Lock size={28} className="text-[#8a9e80]" />}
                                        </div>
                                        <h3 className="font-hero text-2xl text-forest mb-0.5">{sticker.name}</h3>
                                        <span className="font-rounded text-[0.78rem] text-forest/65 font-semibold uppercase tracking-wider">{sticker.category}</span>
                                        <span className={`mt-2 py-1 px-2.5 rounded-full text-xs font-bold ${isUnlocked ? 'bg-sage-light text-forest' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {isUnlocked ? 'Collected' : 'Locked'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Sticker Detail Modal */}
                        {selectedSticker && (
                            <div className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedSticker(null)}>
                                <div className="bg-white rounded-[32px] p-8 sm:p-9 max-w-[420px] w-full text-center border-4 border-[#BCE19D] shadow-2xl animate-fadeIn" onClick={e => e.stopPropagation()}>
                                    <div className="text-6xl mb-3 animate-bounce">
                                        {unlockedStickers.includes(selectedSticker.id) ? selectedSticker.emoji : '🔒'}
                                    </div>
                                    <h2 className="font-hero text-3xl sm:text-4xl text-forest mb-2">{selectedSticker.name}</h2>
                                    <p className="font-body text-base text-forest/75 mb-6">
                                        {unlockedStickers.includes(selectedSticker.id)
                                            ? selectedSticker.description
                                            : 'This sticker is locked in nature! Complete outdoor quests to discover it.'}
                                    </p>

                                    <div className="flex justify-center gap-3">
                                        {!unlockedStickers.includes(selectedSticker.id) && (
                                            <button
                                                className="py-2.5 px-6 rounded-full bg-clover text-white font-hero text-xl cursor-pointer shadow-botanical hover:bg-clover-dark transition-all"
                                                onClick={() => onNavigate('quest')}
                                            >
                                                Find in Quests
                                            </button>
                                        )}

                                        <button
                                            className="py-2.5 px-6 rounded-full bg-forest text-white font-hero text-xl cursor-pointer hover:bg-forest-deep transition-all"
                                            onClick={() => setSelectedSticker(null)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: Notes & Memories */}
                {activeTab === 'notes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        {/* Form */}
                        <form className="bg-white/90 backdrop-blur-md rounded-[28px] p-7 border-[1.5px] border-white/95 shadow-soft-card" onSubmit={handleAddNote}>
                            <h2 className="font-hero text-3xl text-forest mb-4">Log a Nature Moment</h2>

                            <input
                                type="text"
                                placeholder="Title (e.g., Morning Walk under the Oaks)"
                                className="w-full p-3 px-4 rounded-2xl border-[1.5px] border-[#D4E5C7] bg-[#FBFDF9] font-body text-[0.95rem] text-forest mb-3.5 outline-none focus:border-clover focus:bg-white transition-colors"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />

                            <textarea
                                placeholder="What did you smell, see, touch or hear outside today?"
                                className="w-full p-3 px-4 rounded-2xl border-[1.5px] border-[#D4E5C7] bg-[#FBFDF9] font-body text-[0.95rem] text-forest mb-3.5 outline-none focus:border-clover focus:bg-white transition-colors min-h-[110px] resize-y"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                required
                            />

                            <label className="block text-sm font-semibold text-forest mb-2">
                                Stamp with a Collected Sticker:
                            </label>
                            <select
                                className="w-full p-3 px-4 rounded-2xl border-[1.5px] border-[#D4E5C7] bg-[#FBFDF9] font-body text-[0.95rem] text-forest mb-4 outline-none focus:border-clover focus:bg-white transition-colors"
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

                            <button type="submit" className="w-full py-3 rounded-full bg-clover text-white font-hero text-2xl border-0 cursor-pointer shadow-botanical hover:bg-clover-dark hover:-translate-y-0.5 transition-all">
                                Save to Journal
                            </button>
                        </form>

                        {/* List */}
                        <div className="flex flex-col gap-4">
                            {notes.map((note) => (
                                <div key={note.id} className="bg-white/90 backdrop-blur-sm rounded-[22px] p-5 px-6 border-[1.5px] border-white/90 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-hero text-2xl text-forest">
                                            {note.stickerEmoji} {note.title}
                                        </h3>
                                        <span className="text-xs text-forest/60 font-semibold">{note.date}</span>
                                    </div>
                                    <p className="font-quote text-2xl leading-snug text-forest/90">{note.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
