import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Compass, CheckCircle2, Award, Clock, Check, Clover } from 'lucide-react';
import bgImg from '../assets/bg_img.png';
import { moods } from '../data/mood'
import { interests } from '../data/interests';
import { environments } from '../data/environments';



export default function Quest({ onNavigate, completedQuests = [], onCompleteQuest }) {
    const [mood, setMood] = useState('')
    const [duration, setDuration] = useState('');
    const [selectedInterests, setSelectedInterest] = useState([]);
    const [environment, setEnvironment] = useState('');
    const [quest, setQuest] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleGenerateQUest = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch("", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mood,
                    duration,
                    selectedInterests,
                    environment
                })
            });
            const result = res.json();
            if (!res.ok || !result.success) {
                throw new Error(result.error || result.errors?.join(', ') || 'Could not generate a Quest.')
            }

            setQuest(result.data);
        } catch (err) {
            setError(err ? err.messag : 'Could not able to connect to the GrassQuest of backend');
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
        return (
            <section>
                <div>
                    Your Quest !!
                </div>
            </section>
        );
    }
    return (
        <div
            className="page-view-container"
            style={{
                backgroundImage: `url(${bgImg})`,

            }}
        >
            <div className="page-inner-content">
                {/* Top Header */}
                <div className="page-top-header flex flex-row justify-around pt-20 px-4 ">
                    <button
                        className="w-40 h-10 flex flex-row justify-center items-center rounded-full hover:shadow ease-in-out"
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
                        className="w-60 h-10 flex flex-row justify-center items-center rounded-full hover:shadow ease-in-out"
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
                <div className="quest-hero-banner flex flex-col justify-center items-center ">
                    <div>
                        <h1 className="quest-headline flex justify-center text-4xl font-extrabold text-[#2b4b24]"
                        >Start a Quest</h1>
                        <p className="quest-subheadline">
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

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {moods.map((m) => {
                                const Icon = m.icon;
                                const isSelected = mood === m.id;

                                return (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMood(m.id)}
                                        aria-pressed={isSelected}
                                        className={`w-40 h-15 flex items-center gap-4 rounded-2xl border p-2 text-left transition-all duration-200 ${isSelected
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

                                        <span className="font-medium text-green-950">
                                            {m.label}
                                        </span>
                                    </button>
                                );

                            })}
                        </div>
                    </div>


                    {/* Duration */}
                    <div
                        className='mt-2 px-4 text-2xl font-hero flex flex-row gap-4 justify-center items-center'
                    >
                        <label htmlFor="duration ">Duration (minutes): </label>
                        <input
                            id="duration"
                            type="number"
                            min="1"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 15"
                            className='p-2 rounded  w-40'
                        />
                    </div>
                    {/**  Interest Section  */}
                    <section className='flex flex-col justify-center items-center px-4 mt-2' >
                        <div className="mb-4">
                            <div className=" flex items-center gap-2">
                                <Clover className="text-green-700" size={22} />

                                <h2 className="text-xl font-bold text-[#214326ff] font-hero">
                                    What would you love to explore?
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500">
                                Pick up to 3 things that spark your curiosity.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
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
                                        className={`h-18 w-50 flex items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-200 ${isSelected
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
                    <section className="rounded-3xl flex flex-col justify-center items-center">
                        <div >
                            <div className="mb-2 flex items-center gap-2">
                                <Clover size={22} className="text-green-700" />

                                <h2 className="text-xl font-bold text-green-950">
                                    Where will your adventure take place?
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500">
                                Choose the setting for your little adventure.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                                        className={`relative flex items-start gap-3 rounded-2xl border p-2 text-left transition-all duration-200 hover:-translate-y-0.5 ${isSelected
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


                    <div className='flex justify-center items-center'
                        onClick={handleGenerateQUest}
                    >
                        <button className='h-15 w-30 px-4 py-2 mt-4 mb-4  flex justify-center items-center text-2xl text-[#FFFDF7] font-hero font-[#FFFDF7] rounded-2xl bg-[#315C3A]  transition-all duration-300 ease-in-out hover:scale-105 active:translate-y-0 hover:shadow-[0_6px_0_0_#1D4026,0_10px_18px_-6px_rgba(36,75,43,0.4)]'>Generate Quest</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
