import React, { useState } from 'react';
import bgImg from '../assets/bg_img.png';
import heroPet from '../assets/hero_pet.png';

export default function Hero({ onStartQuest, onOpenJournal }) {
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
            className="hero-wrapper"
            style={{ backgroundImage: `url(${bgImg})` }}
            aria-label="GrassQuest Home Hero"
        >
            <div className="hero-content">
                <div className="hero-copy">
                    <h1 className="hero-headline">
                        <span>Less Scrolling</span>
                        <span>More Exploring</span>
                    </h1>

                    <p className="hero-subtitle">
                        Tiny Outdoor quest little momment of wonder
                    </p>

                    <button
                        className="hero-cta-btn"
                        onClick={onStartQuest}
                        id="start-a-quest-btn"
                    >
                        Start a Quest
                    </button>
                </div>
            </div>

            {/* Pet sitting on bottom right grass hill */}
            <div
                className="pet-container"
                onClick={handlePetClick}
                title="Click me for a happy thought!"
            >
                {showBubble && (
                    <div className="pet-speech-bubble">
                        {quotes[quoteIndex]}
                    </div>
                )}
                <div className="pet-image-wrap">
                    <img
                        src={heroPet}
                        alt="GrassQuest Clover Pet"
                        className="pet-image"
                    />
                    <span className="pet-sparkle">✦</span>
                </div>
            </div>
        </section>
    );
}
