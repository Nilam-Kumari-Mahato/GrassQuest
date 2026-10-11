import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Compass, Clock, Check, Clover, Award, CheckCircle2 } from 'lucide-react';
import bgImg from '../assets/bg_img.png';
import { moods } from '../data/mood'
import { interests } from '../data/interests';
import { environments } from '../data/environments';
import { stickers } from '../data/stickers';



function ErrorPopup({ message, onDismiss }) {
    if (!message) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/45 p-4 backdrop-blur-sm" role="presentation">
            <section role="alertdialog" aria-modal="true" aria-labelledby="quest-error-title" aria-describedby="quest-error-message" className="w-full max-w-md rounded-3xl border-2 border-white bg-[#FFFDF7] p-6 shadow-2xl sm:p-8">
                <h2 id="quest-error-title" className="font-hero text-3xl font-bold text-[#2b4b24]">A little pause</h2>
                <p id="quest-error-message" className="mt-3 text-base leading-6 text-green-900">{message}</p>
                <button type="button" autoFocus onClick={onDismiss} className="mt-6 min-w-24 rounded-full bg-[#315C3A] px-6 py-3 font-semibold text-white shadow-botanical hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">OK</button>
            </section>
        </div>
    );
}

export default function Quest({ onNavigate, completedQuests = [], onCompleteQuest, currentQuest = null, onQuestChange }) {
    const [mood, setMood] = useState('')
    const [duration, setDuration] = useState('');
    const [selectedInterests, setSelectedInterest] = useState([]);
    const [environment, setEnvironment] = useState('');
    const [quest, setQuest] = useState(currentQuest || '');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [completionResult, setCompletionResult] = useState(null)

    const handleGenerateQUest = async () => {
        const minutes = Number(duration);
        if (!mood || selectedInterests.length === 0 || !duration || !environment) {
            setError('Choose a mood, at least one interest, a duration, and an environment first.');
            return;
        }
        if (!Number.isInteger(minutes) || minutes < 1 || minutes > 180) {
            setError('Choose a whole number of minutes between 1 and 180.');
            return;
        }
        if (loading) return;
        setLoading(true);
        setError('');
        setCompletionResult(null);
        try {
            const res = await fetch("/api/quests/generate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mood,
                    duration,
                    interests: selectedInterests,
                    environment
                })
            });
            const result = await res.json();
            if (!res.ok || !result.success) {
                throw new Error(result.error || 'Could not generate a quest.')
            }

            const generatedQuest = {
                ...result.quest,
                id: globalThis.crypto?.randomUUID?.() || `quest-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                preferences: { mood, interests: selectedInterests, duration: minutes, environment },
            };
            setQuest(generatedQuest);
            onQuestChange?.(generatedQuest);
        } catch (err) {
            setError(err?.message || 'Could not connect to the GrassQuest backend.');
        }
        finally {
            setLoading(false);
        }
    }

    const toggleInterest = (id) => {
        setSelectedInterest((prev) => {
            if (prev.includes(id)) {
                return prev.filter((interestId) => interestId !== id);
            }

            if (prev.length >= 3) {
                return prev;
            }

            return [...prev, id];
        });
    }

    if (quest) {
        const alreadyCompleted = completedQuests.some((entry) => String(typeof entry === 'object' ? entry.id : entry) === String(quest.id));
        const awardedSticker = completionResult?.sticker || (completionResult?.record?.stickerId
            ? stickers.find((sticker) => sticker.id === completionResult.record.stickerId)
            : null);
        return (
            <>
            <section className="min-h-screen w-full px-3 pt-24 pb-10 sm:px-5 sm:pt-28 sm:pb-16 bg-cover bg-bottom">
                <div className="mx-auto max-w-3xl rounded-3xl border border-white/80 bg-[#FFFDF7]/95 p-4 shadow-xl sm:p-8 lg:p-10">
                    <div className="mb-6 flex items-center gap-3 text-green-800">
                        <Sparkles size={26} className="shrink-0" />
                        <h1 className="font-hero text-2xl font-extrabold text-[#2b4b24] sm:text-3xl">Your Nature Quest</h1>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold text-green-950">{quest.title}</h2>
                    <p className="mb-6 text-lg leading-7 text-green-900">{quest.description}</p>
                    <div className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-green-800">
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2"><Clock size={16} />{quest.duration} minutes</span>
                        <span className="rounded-full bg-green-100 px-4 py-2">{environments.find((item) => item.id === quest.environment)?.label || quest.environment}</span>
                    </div>
                    <ol className="mb-6 list-decimal space-y-3 pl-6 text-green-950">
                        {quest.instructions.map((instruction, index) => <li key={index} className="pl-1 leading-6">{instruction}</li>)}
                    </ol>
                    <p className="mb-7 rounded-2xl bg-lime-100 p-4 font-medium text-green-900">{quest.completionMessage}</p>
                    {completionResult && (
                        <div role="status" className="mb-6 flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-900">
                            {awardedSticker ? <img src={awardedSticker.img} alt="" className="h-16 w-16 rounded-xl object-contain" /> : <Award size={32} />}
                            <div>
                                <p className="font-bold">{completionResult.alreadyCompleted ? 'This quest is already in your journal.' : awardedSticker ? `You earned ${awardedSticker.label}!` : 'Quest saved to your journal!'} </p>
                                <p className="text-sm">{awardedSticker ? 'Your new sticker is waiting in the Journal.' : 'You have collected all 10 stickers. Keep exploring!'}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button type="button" disabled={alreadyCompleted || loading} onClick={() => setCompletionResult(onCompleteQuest?.(quest) || { alreadyCompleted: false, sticker: null })} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#315C3A] px-4 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-default disabled:opacity-70 sm:px-5">
                            {alreadyCompleted || completionResult ? <CheckCircle2 size={18} /> : <Award size={18} />}
                            {alreadyCompleted || completionResult ? 'Quest completed' : 'I completed this quest'}
                        </button>
                        <button type="button" onClick={() => { setQuest(''); onQuestChange?.(null); setCompletionResult(null); }} className="rounded-2xl border border-green-700 px-4 py-3 font-semibold text-green-800 sm:px-5">Create another quest</button>
                        <button type="button" onClick={handleGenerateQUest} disabled={loading} className="rounded-2xl border border-green-700 px-4 py-3 font-semibold text-green-800 disabled:opacity-60 sm:px-5">{loading ? 'Generating…' : 'Try another quest with these choices'}</button>
                        <button type="button" onClick={() => onNavigate('home')} className="rounded-2xl border border-green-200 px-4 py-3 font-semibold text-green-800 sm:px-5">Back to home</button>
                    </div>
                </div>
            </section>
            <ErrorPopup message={error} onDismiss={() => setError('')} />
            </>
        );
    }
    return (
        <div
            className="min-h-screen w-full pt-20 pb-10 relative bg-cover bg-bottom bg-no-repeat flex flex-col sm:pt-24 sm:pb-14"
            style={{
                backgroundImage: `url(${bgImg})`,

            }}
        >
            <div className="max-w-[1140px] w-[94%] mx-auto relative z-10 sm:w-[92%]">
                {/* Top Header */}
                <div className="page-top-header flex flex-col items-stretch justify-between gap-2 pt-2 px-1 sm:flex-row sm:items-center sm:gap-4 sm:px-4">
                    <button
                        className="min-h-10 w-full sm:w-40 flex flex-row justify-center items-center gap-1 rounded-full px-3 py-2 text-sm hover:shadow ease-in-out sm:text-base"
                        style={{
                            backgroundColor: "#ffffffa4",
                            color: "#214326ff"
                        }}
                        onClick={() => onNavigate('home')}
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </button>

                    <div
                        className="min-h-10 w-full sm:w-60 flex flex-row justify-center items-center gap-1 rounded-full px-3 py-2 text-sm hover:shadow ease-in-out sm:text-base"
                        style={{
                            backgroundColor: "#ffffffa4",
                            color: "#214326ff"
                        }}
                    >
                        <Compass size={16} />
                        <span>Tiny Outdoor Quests</span>
                    </div>
                </div>

                {/* Quest Banner */}
                <div className="mb-5 mt-5 flex flex-col items-center justify-center rounded-3xl border border-white/90 bg-white/85 p-4 text-center shadow-soft-card backdrop-blur-md sm:mb-7 sm:mt-8 sm:p-8">
                    <div className="max-w-2xl">
                        <h1 className="quest-headline flex justify-center text-3xl font-extrabold text-[#2b4b24] sm:text-4xl"
                        >Start a Quest</h1>
                        <p className="quest-subheadline text-lg sm:text-xl">
                            Tiny Outdoor quest little momment of wonder
                        </p>
                    </div>
                </div>


                <div>

                    {/* Mood Selection Section */}

                    <div className="mood flex flex-col justify-center items-center ">
                        <p className="mt-4 mb-4  text-2xl text-[#2b4b24] font-semibold  font-hero">
                            Choose your mood
                        </p>

                        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-3 sm:gap-4">
                            {moods.map((m) => {
                                const Icon = m.icon;
                                const isSelected = mood === m.id;

                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMood(m.id)}
                                        aria-pressed={isSelected}
                                        className={`min-h-14 w-full flex items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-200 sm:gap-4 ${isSelected
                                            ? "border-green-700 bg-lime-100 shadow-md"
                                            : "border-green-100 bg-white hover:border-green-400 hover:bg-green-50"
                                            }`}
                                    >
                                        <span
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                            style={{ backgroundColor: m.bgColor }}
                                        >
                                            <Icon
                                                size={20}
                                                color={m.color}
                                                strokeWidth={1.8}
                                            />
                                        </span>

                                        <span className="min-w-0 break-words text-sm font-medium text-green-950 sm:text-base">
                                            {m.label}
                                        </span>
                                    </button>
                                );

                            })}
                        </div>
                    </div>


                    {/* Duration */}
                    <div
                        className='mt-4 px-2 text-lg sm:text-2xl font-hero flex flex-col gap-2 justify-center items-stretch sm:flex-row sm:items-center sm:gap-4 sm:px-4'
                    >
                        <label htmlFor="duration" className="text-center sm:text-left">Duration (minutes):</label>
                        <input
                            id="duration"
                            type="number"
                            min="1"
                            max="180"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 15"
                            className='w-full rounded-xl border border-green-200 bg-white p-3 text-base sm:w-40'
                        />
                    </div>
                    {/**  Interest Section  */}
                    <section className='mt-6 flex flex-col justify-center items-center px-2 sm:px-4' >
                        <div className="mb-4 w-full max-w-3xl">
                            <div className=" flex items-center gap-2">
                                <Clover className="text-green-700" size={22} />

                                <h2 className="text-lg font-bold text-[#214326ff] font-hero sm:text-xl">
                                    What would you love to explore?
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500">
                                Pick up to 3 things that spark your curiosity.
                            </p>
                        </div>

                        <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {interests.map((interest) => {
                                const Icon = interest.icon;
                                const isSelected = selectedInterests.includes(interest.id);

                                return (
                                    <button
                                        key={interest.id}
                                        id={interest.id}
                                        type="button"
                                        onClick={() => toggleInterest(interest.id)}
                                        aria-pressed={isSelected}
                                        className={`min-h-[72px] w-full flex items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${isSelected
                                            ? "border-green-700 bg-lime-100 shadow-sm"
                                            : "border-green-100 bg-[#FFFDF7] hover:border-green-400"
                                            }`}
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
                                            <Icon size={20} className="text-green-800" />
                                        </span>

                                        <span className="flex-1 font-medium text-green-950">
                                            {interest.label}
                                        </span>

                                        {isSelected && (
                                            <Check
                                                size={19}
                                                className="text-green-700"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/**Environment */}
                    <section className="mt-6 rounded-3xl flex flex-col justify-center items-center px-2 sm:px-4">
                        <div className="mb-3 w-full max-w-3xl">
                            <div className="mb-2 flex items-center gap-2">
                                <Clover size={22} className="text-green-700" />

                                <h2 className="text-lg font-bold text-green-950 sm:text-xl">
                                    Where will your adventure take place?
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500">
                                Choose the setting for your little adventure.
                            </p>
                        </div>

                        <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {environments.map((item) => {
                                const Icon = item.icon;
                                const isSelected = environment === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        id={`environment-${item.id}`}
                                        type="button"
                                        onClick={() => setEnvironment(item.id)}
                                        aria-pressed={isSelected}
                                        className={`relative flex items-start gap-3 rounded-2xl border p-2 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${isSelected
                                            ? "border-green-700 bg-lime-100 shadow-sm"
                                            : "border-green-100 bg-[#FFFDF7] hover:border-green-400"
                                            }`}
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
                                            <Icon size={22} className="text-green-800" />
                                        </span>

                                        <span className="flex-1">
                                            <span className="block font-semibold text-green-950">
                                                {item.label}
                                            </span>

                                            <span className="mt-1 block text-sm leading-5 text-gray-500">
                                                {item.description}
                                            </span>
                                        </span>

                                        {isSelected && (
                                            <Check
                                                size={18}
                                                className="absolute right-3 top-3 text-green-700"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>


                    <div className="flex flex-col items-center justify-center px-2">
                        <button type="button" onClick={handleGenerateQUest} disabled={loading} className="mt-5 mb-4 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#315C3A] px-5 py-3 text-lg text-[#FFFDF7] font-hero transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_6px_0_0_#1D4026,0_10px_18px_-6px_rgba(36,75,43,0.4)] disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-6 sm:text-xl">
                            {loading ? 'Growing your quest…' : <><Sparkles size={20} />Generate Quest</>}
                        </button>
                    </div>

                </div>
            </div>
            <ErrorPopup message={error} onDismiss={() => setError('')} />
        </div>
    );
}
