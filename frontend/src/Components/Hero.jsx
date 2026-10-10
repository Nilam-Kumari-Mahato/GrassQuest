import React, { useState } from 'react';
import bgImg from '../assets/bg_img.png';
import heroPet from '../assets/hero_pet.png';

export default function Hero({ onStartQuest }) {
    const quotes = [
        "Ready for an outdoor adventure? 🌱",
        "Touch some grass today! 🍀",
        "Look at this giant lucky clover I found!",
        "Tiny moments, big wonders! ✨",
        "Less screen time, more green time! 🌿"
    ];

    const [quoteIndex, setQuoteIndex] = useState(0);
    const [showBubble, setShowBubble] = useState(true);

    const handlePetClick = () => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setShowBubble(true);
    };

    return (
        <section
            className="min-h-screen w-full relative flex items-center bg-cover bg-bottom bg-no-repeat overflow-hidden pt-20"
            style={{ backgroundImage: `url(${bgImg})` }}
            aria-label="GrassQuest Home Hero"
        >
            <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 sm:px-12 py-10 pb-20 flex flex-col justify-center">
                <div className="max-w-[580px]">
                    <h1 className="font-hero text-5xl sm:text-7xl lg:text-[5.4rem] font-extrabold text-[#2b4b24] tracking-tight leading-[1.08] mb-3 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] flex flex-col">
                        <span>Less Scrolling</span>
                        <span>More Exploring</span>
                    </h1>

                    <p className="font-quote text-2xl sm:text-3xl font-semibold text-[#2b4923] mb-8 leading-tight drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]">
                        Tiny Outdoor quest little momment of wonder
                    </p>

                    <button
                        className="inline-flex items-center justify-center gap-2.5 bg-clover text-white font-hero text-2xl sm:text-3xl font-bold py-3.5 px-10 rounded-full cursor-pointer shadow-[0_8px_24px_rgba(107,154,76,0.42)] hover:bg-clover-dark hover:-translate-y-1 hover:scale-105 active:translate-y-0 transition-all duration-300 tracking-wide w-fit"
                        onClick={onStartQuest}
                        id="start-a-quest-btn"
                    >
                        Start a Quest
                    </button>
                </div>
            </div>

            {/* Pet sitting on grass hill */}
            <div
                className="absolute right-6 sm:right-14 bottom-3 sm:bottom-8 z-15 cursor-pointer select-none flex flex-col items-center"
                onClick={handlePetClick}
                title="Click me for a happy thought!"
            >
                {showBubble && (
                    <div className="bg-white/95 border-2 border-[#82b262] text-forest font-quote text-xl font-bold px-4 py-2 rounded-[18px] shadow-lg mb-2 relative max-w-[220px] text-center animate-fadeIn">
                        {quotes[quoteIndex]}
                        <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 border-t-[9px] border-x-[8px] border-x-transparent border-t-[#82b262] w-0 h-0" />
                    </div>
                )}
                <div className="relative animate-pet-float hover:scale-105 transition-transform duration-300">
                    <img
                        src={heroPet}
                        alt="GrassQuest Clover Pet"
                        className="w-[240px] sm:w-[310px] lg:w-[360px] h-auto block drop-shadow-[0_12px_18px_rgba(60,95,45,0.2)]"
                    />
                    <span className="absolute top-4 right-7 text-amber-400 text-2xl animate-sparkle">✦</span>
                </div>
            </div>
        </section>
    );
}
