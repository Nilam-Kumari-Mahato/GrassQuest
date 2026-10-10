import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Compass, CheckCircle2, Award, Clock } from 'lucide-react';
import bgImg from '../assets/bg_img.png';

const QUEST_LIST = [
    {
        id: 'quest_1',
        stickerId: 'wildflower',
        title: 'The Wildflower Hunt',
        category: 'nature',
        categoryLabel: 'Tiny Nature',
        difficulty: '3 Mins • Easy',
        description: 'Step outside and locate 1 wild flower blooming in grass, soil, or even through a crack in the pavement.',
        rewardSticker: '🌸 Wildflower Sprig',
        rewardEmoji: '🌸'
    },
    {
        id: 'quest_2',
        stickerId: 'cloud',
        title: 'Cloud Dreamer',
        category: 'mindful',
        categoryLabel: 'Mindful Moment',
        difficulty: '5 Mins • Gentle',
        description: 'Look up at the open sky for 5 minutes without checking any screen. Find two interesting shapes in the clouds or sky.',
        rewardSticker: '☁️ Dreamy Cloud',
        rewardEmoji: '☁️'
    },
    {
        id: 'quest_3',
        stickerId: 'tree',
        title: 'Breeze & Bark',
        category: 'nature',
        categoryLabel: 'Tiny Nature',
        difficulty: '3 Mins • Sensory',
        description: 'Gently place your hand against the rough bark of a living tree. Close your eyes and notice 3 distinct outdoor sounds.',
        rewardSticker: '🌳 Ancient Bark',
        rewardEmoji: '🌳'
    },
    {
        id: 'quest_4',
        stickerId: 'dewdrop',
        title: 'Dewdrop Seeker',
        category: 'explorer',
        categoryLabel: 'Explorer',
        difficulty: '4 Mins • Discovery',
        description: 'Find a cool blade of grass or plant leaf holding water droplets or morning dew. Observe the tiny reflections.',
        rewardSticker: '💧 Morning Dewdrop',
        rewardEmoji: '💧'
    },
    {
        id: 'quest_5',
        stickerId: 'ladybug',
        title: 'Little Neighbor',
        category: 'nature',
        categoryLabel: 'Tiny Nature',
        difficulty: '5 Mins • Curious',
        description: 'Spot a tiny bug, bird, butterfly or neighborhood critter minding its own day. Watch how peaceful it is.',
        rewardSticker: '🐞 Ladybug Buddy',
        rewardEmoji: '🐞'
    },
    {
        id: 'quest_6',
        stickerId: 'mushroom',
        title: 'Moss Detective',
        category: 'explorer',
        categoryLabel: 'Explorer',
        difficulty: '5 Mins • Discovery',
        description: 'Seek out soft velvety moss on a stone, sidewalk edge, or tree root in the shade. Notice its vibrant green.',
        rewardSticker: '🍄 Mossy Mushroom',
        rewardEmoji: '🍄'
    },
    {
        id: 'quest_7',
        stickerId: 'sunbeam',
        title: 'Sun Salutation',
        category: 'mindful',
        categoryLabel: 'Mindful Moment',
        difficulty: '4 Mins • Warmth',
        description: 'Stand or sit in a warm patch of sunlight for 4 minutes. Take 5 deep breaths of fresh outdoor air.',
        rewardSticker: '☀️ Golden Sunbeam',
        rewardEmoji: '☀️'
    }
];

export default function Quest({ onNavigate, completedQuests = [], onCompleteQuest }) {
    const [filter, setFilter] = useState('all');
    const [rewardModal, setRewardModal] = useState(null);

    const filteredQuests = filter === 'all'
        ? QUEST_LIST
        : QUEST_LIST.filter(q => q.category === filter);

    const handleFinishQuest = (quest) => {
        if (completedQuests.includes(quest.id)) return;
        onCompleteQuest(quest.id, quest.stickerId);
        setRewardModal(quest);
    };

    return (
        <div
            className="page-view-container"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="page-inner-content">
                {/* Top Header */}
                <div className="page-top-header">
                    <button
                        className="back-home-btn"
                        onClick={() => onNavigate('home')}
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </button>

                    <div className="page-title-badge">
                        <Compass size={16} />
                        <span>Tiny Outdoor Quests</span>
                    </div>
                </div>

                {/* Quest Banner */}
                <div className="quest-hero-banner">
                    <div>
                        <h1 className="quest-headline">Start a Quest</h1>
                        <p className="quest-subheadline">
                            Tiny Outdoor quest little momment of wonder
                        </p>
                    </div>

                    <div className="stat-pill" style={{ background: 'rgba(235, 246, 228, 0.95)' }}>
                        <div className="stat-num">{completedQuests.length} / {QUEST_LIST.length}</div>
                        <div className="stat-label">Quests Completed</div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="quest-filter-bar">
                    <button
                        className={`quest-filter-chip ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Quests ({QUEST_LIST.length})
                    </button>
                    <button
                        className={`quest-filter-chip ${filter === 'nature' ? 'active' : ''}`}
                        onClick={() => setFilter('nature')}
                    >
                        🌱 Tiny Nature
                    </button>
                    <button
                        className={`quest-filter-chip ${filter === 'mindful' ? 'active' : ''}`}
                        onClick={() => setFilter('mindful')}
                    >
                        ☀️ Mindful Moments
                    </button>
                    <button
                        className={`quest-filter-chip ${filter === 'explorer' ? 'active' : ''}`}
                        onClick={() => setFilter('explorer')}
                    >
                        🧭 Explorer
                    </button>
                </div>

                {/* Quests Grid */}
                <div className="quests-grid">
                    {filteredQuests.map((quest) => {
                        const isCompleted = completedQuests.includes(quest.id);

                        return (
                            <div
                                key={quest.id}
                                className={`quest-card ${isCompleted ? 'completed' : ''}`}
                            >
                                <div className="quest-card-top">
                                    <div className="quest-icon-badge">
                                        {quest.rewardEmoji}
                                    </div>
                                    <div className="quest-title-wrap">
                                        <span className="quest-difficulty">{quest.difficulty}</span>
                                        <h3 className="quest-title">{quest.title}</h3>
                                    </div>
                                </div>

                                <p className="quest-description">{quest.description}</p>

                                <div className="quest-reward-row">
                                    <span className="quest-reward-label">
                                        <Award size={16} />
                                        <span>Reward:</span>
                                    </span>
                                    <span className="quest-reward-sticker">{quest.rewardSticker}</span>
                                </div>

                                {isCompleted ? (
                                    <button className="quest-action-btn completed" disabled>
                                        <CheckCircle2 size={18} />
                                        <span>Completed • Sticker in Journal!</span>
                                    </button>
                                ) : (
                                    <button
                                        className="quest-action-btn start"
                                        onClick={() => handleFinishQuest(quest)}
                                    >
                                        <Sparkles size={18} />
                                        <span>Complete Quest & Collect</span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Modal Celebration */}
                {rewardModal && (
                    <div className="reward-modal-overlay" onClick={() => setRewardModal(null)}>
                        <div className="reward-modal" onClick={e => e.stopPropagation()}>
                            <div className="reward-icon-burst">
                                {rewardModal.rewardEmoji}
                            </div>
                            <h2 className="reward-modal-title">Quest Accomplished!</h2>
                            <p className="reward-modal-text">
                                You took a tiny moment outside and earned the <strong>{rewardModal.rewardSticker}</strong> sticker for your journal!
                            </p>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    className="reward-modal-btn"
                                    onClick={() => onNavigate('journal')}
                                >
                                    View in Sticker Journal
                                </button>
                                <button
                                    className="reward-modal-btn"
                                    style={{ background: '#7ba85a' }}
                                    onClick={() => setRewardModal(null)}
                                >
                                    More Quests
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
