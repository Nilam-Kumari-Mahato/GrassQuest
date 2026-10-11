import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Lock, Clock, Leaf } from 'lucide-react';
import bgImg from '../assets/bg_img.png';
import journalPet from '../assets/journal_pet.png';
import { stickers } from '../data/stickers';
import { moods } from '../data/mood';
import { interests } from '../data/interests';
import { environments } from '../data/environments';

function StickerArtwork({ sticker, unlocked, className = '' }) {
    const [imageFailed, setImageFailed] = useState(false);
    if (!unlocked) return <Lock size={28} aria-hidden="true" className="text-[#8a9e80]" />;
    if (imageFailed) return <span aria-label={sticker.label} className="text-4xl">🍃</span>;
    return <img src={sticker.img} alt={sticker.label} onError={() => setImageFailed(true)} className={className} />;
}

function formatDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export default function Journal({ onNavigate, unlockedStickers = [], completedQuests = [] }) {
    const [activeTab, setActiveTab] = useState('stickers');
    const [selectedSticker, setSelectedSticker] = useState(null);
    const unlockedCount = stickers.filter((sticker) => unlockedStickers.includes(sticker.id)).length;
    const selectedIsUnlocked = selectedSticker && unlockedStickers.includes(selectedSticker.id);

    return (
        <div className="min-h-screen w-full pt-20 pb-10 relative bg-cover bg-bottom bg-no-repeat sm:pt-24 sm:pb-16" style={{ backgroundImage: `url(${bgImg})` }}>
            <main className="max-w-[1140px] w-[94%] mx-auto relative z-10 sm:w-[92%]">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <button type="button" className="inline-flex items-center gap-2 py-2 px-5 bg-white/85 border border-white rounded-full font-rounded font-semibold text-forest shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={() => onNavigate('home')}>
                        <ArrowLeft size={18} /><span>Back to Home</span>
                    </button>
                    <div className="inline-flex items-center gap-2 bg-[#EBF6E4]/90 py-2 px-4 rounded-full border border-white/80 font-rounded text-sm font-bold text-forest">
                        <BookOpen size={16} /><span>Field Scrapbook & Stickers</span>
                    </div>
                </div>

                <section className="bg-white/90 backdrop-blur-md border border-white rounded-[28px] p-4 sm:p-8 mb-5 sm:mb-7 shadow-soft-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5">
                    <div className="w-full min-w-0">
                        <h1 className="font-hero text-3xl sm:text-5xl text-forest leading-tight mb-2">My Nature Journal</h1>
                        <p className="font-quote text-lg sm:text-2xl text-forest/75">Little discoveries, collected along the way.</p>
                        <div className="mt-4 rounded-[20px] bg-[#EBF6E4]/90 border border-clover/30 py-2.5 px-5 text-center w-fit">
                            <div className="font-hero text-3xl font-bold text-clover leading-none">{unlockedCount} / {stickers.length}</div>
                            <div className="font-rounded text-xs text-forest font-semibold mt-1">Stickers Found</div>
                        </div>
                    </div>
                    <img src={journalPet} alt="Your clover companion visiting the journal" className="hidden sm:block w-28 md:w-36 h-auto object-contain" />
                </section>

                <div role="tablist" aria-label="Journal sections" className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2 sm:gap-3 mb-6">
                    <button type="button" role="tab" aria-selected={activeTab === 'stickers'} className={`min-h-12 py-2.5 px-3 sm:px-5 rounded-2xl sm:rounded-full border border-white/85 font-rounded text-sm sm:text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${activeTab === 'stickers' ? 'bg-clover text-white shadow-botanical' : 'bg-white/75 text-forest hover:bg-white'}`} onClick={() => setActiveTab('stickers')}>
                        <span className="inline-flex items-center gap-2"><Sparkles size={18} />Sticker Album ({unlockedCount})</span>
                    </button>
                    <button type="button" role="tab" aria-selected={activeTab === 'quests'} className={`min-h-12 py-2.5 px-3 sm:px-5 rounded-2xl sm:rounded-full border border-white/85 font-rounded text-sm sm:text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${activeTab === 'quests' ? 'bg-clover text-white shadow-botanical' : 'bg-white/75 text-forest hover:bg-white'}`} onClick={() => setActiveTab('quests')}>
                        <span className="inline-flex items-center gap-2"><BookOpen size={18} />Quest History ({completedQuests.length})</span>
                    </button>
                </div>

                {activeTab === 'stickers' ? (
                    <section role="tabpanel" aria-label="Sticker album">
                        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-5">
                            {stickers.map((sticker) => {
                                const isUnlocked = unlockedStickers.includes(sticker.id);
                                return (
                                    <button type="button" key={sticker.id} aria-label={`${sticker.label}, ${isUnlocked ? 'collected' : 'locked'}`} onClick={() => setSelectedSticker(sticker)} className={`min-w-0 bg-white/90 backdrop-blur-sm border border-white rounded-2xl sm:rounded-[24px] p-2.5 sm:p-4 text-center shadow-soft-card transition-all hover:-translate-y-1 hover:shadow-float flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${isUnlocked ? '' : 'opacity-75 border-dashed'}`}>
                                        <span className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#F4FAEE] flex items-center justify-center mb-2 sm:mb-3 shadow-inner">
                                            <StickerArtwork sticker={sticker} unlocked={isUnlocked} className="w-full h-full rounded-full object-contain" />
                                        </span>
                                        <span className="break-words font-hero text-base sm:text-2xl text-forest">{sticker.label}</span>
                                        <span className={`mt-2 py-1 px-2.5 rounded-full text-xs font-bold ${isUnlocked ? 'bg-sage-light text-forest' : 'bg-gray-100 text-gray-600'}`}>{isUnlocked ? 'Collected' : 'Locked'}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                ) : (
                    <section role="tabpanel" aria-label="Completed quest history" className="space-y-4">
                        {completedQuests.length === 0 ? (
                            <div className="rounded-3xl border border-white bg-white/90 p-8 sm:p-10 text-center shadow-soft-card">
                                <Leaf size={40} className="mx-auto mb-3 text-clover" />
                                <h2 className="font-hero text-3xl text-forest">Your story starts outside</h2>
                                <p className="mt-2 text-forest/75">Complete a nature quest and it will appear here with its sticker reward.</p>
                                <button type="button" onClick={() => onNavigate('quest')} className="mt-5 rounded-full bg-clover px-6 py-3 font-bold text-white shadow-botanical hover:bg-clover-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">Find a Quest</button>
                            </div>
                        ) : completedQuests.map((entry, index) => {
                            const record = typeof entry === 'object' ? entry : { id: String(entry), legacy: true };
                            const dateLabel = formatDate(record.completedAt);
                            const reward = stickers.find((sticker) => sticker.id === record.stickerId);
                            const moodLabel = moods.find((mood) => mood.id === record.mood)?.label;
                            const environmentLabel = environments.find((item) => item.id === record.environment)?.label;
                            const interestLabels = Array.isArray(record.interests) ? record.interests.map((id) => interests.find((interest) => interest.id === id)?.label).filter(Boolean) : [];
                            return (
                                <article key={record.id ?? index} className="rounded-3xl border border-white bg-white/90 p-4 sm:p-6 shadow-soft-card">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h2 className="font-hero text-2xl sm:text-3xl text-forest">{record.title || 'Previous completed quest'}</h2>
                                            {dateLabel && <p className="mt-1 inline-flex items-center gap-2 text-sm text-forest/65"><Clock size={15} />{dateLabel}</p>}
                                        </div>
                                        {reward && <span className="inline-flex items-center gap-2 rounded-full bg-sage-light px-3 py-2 text-sm font-bold text-forest"><img src={reward.img} alt="" className="h-8 w-8 rounded-full object-contain" />{reward.label}</span>}
                                    </div>
                                    {record.legacy ? (
                                        <p className="mt-3 text-sm text-forest/65">This completion was saved before quest details were recorded.</p>
                                    ) : (
                                        <>
                                            {record.description && <p className="mt-3 text-forest/80">{record.description}</p>}
                                            <div className="mt-4 flex flex-wrap gap-2 text-sm text-forest/75">
                                                {moodLabel && <span className="rounded-full bg-[#F4FAEE] px-3 py-1">Mood: {moodLabel}</span>}
                                                {interestLabels.map((label) => <span key={label} className="rounded-full bg-[#F4FAEE] px-3 py-1">{label}</span>)}
                                                {record.duration && <span className="rounded-full bg-[#F4FAEE] px-3 py-1">{record.duration} min</span>}
                                                {environmentLabel && <span className="rounded-full bg-[#F4FAEE] px-3 py-1">{environmentLabel}</span>}
                                            </div>
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </section>
                )}
            </main>

            {selectedSticker && (
                <div role="presentation" className="fixed inset-0 bg-forest/45 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedSticker(null)}>
                    <section role="dialog" aria-modal="true" aria-labelledby="sticker-detail-title" className="bg-white rounded-[32px] p-7 sm:p-9 max-w-[420px] w-full text-center border-4 border-[#BCE19D] shadow-2xl" onClick={(event) => event.stopPropagation()}>
                        <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-[#F4FAEE] flex items-center justify-center">
                            <StickerArtwork sticker={selectedSticker} unlocked={selectedIsUnlocked} className="w-full h-full rounded-full object-contain" />
                        </div>
                        <h2 id="sticker-detail-title" className="font-hero text-3xl sm:text-4xl text-forest mb-2">{selectedSticker.label}</h2>
                        <p className="font-body text-forest/75 mb-6">{selectedIsUnlocked ? 'A little nature friend collected on one of your completed quests.' : 'Complete a nature quest to discover this sticker.'}</p>
                        <div className="flex justify-center gap-3">
                            {!selectedIsUnlocked && <button type="button" className="py-2.5 px-6 rounded-full bg-clover text-white font-hero text-xl shadow-botanical hover:bg-clover-dark" onClick={() => { setSelectedSticker(null); onNavigate('quest'); }}>Find a Quest</button>}
                            <button type="button" autoFocus className="py-2.5 px-6 rounded-full bg-forest text-white font-hero text-xl hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={() => setSelectedSticker(null)}>Close</button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
