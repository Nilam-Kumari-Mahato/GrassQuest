import React from 'react';
import { Home, BookOpen, Sparkles, Compass } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
    return (
        <header className="navbar-wrapper">
            <nav className="navbar-pill" aria-label="Main Navigation">
                {/* Brand Logo */}
                <button
                    className="brand-logo"
                    onClick={() => setActivePage('home')}
                    title="Return to Home"
                >
                    <span className="brand-text">GrassQuest</span>
                    <svg
                        className="brand-swirl"
                        width="28"
                        height="22"
                        viewBox="0 0 32 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 18C10 20 18 20 22 14C25 9.5 20 4 15 8C11 11.2 16 16.5 21 16.5C26 16.5 29 12 29 12"
                            stroke="#55843a"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="27" cy="6" r="2.5" fill="#7ba85a" />
                    </svg>
                </button>

                {/* Center / Right Nav Items */}
                <div className="nav-links">
                    {/* Home Tab */}
                    <button
                        className={`nav-btn ${activePage === 'home' ? 'active-pill' : ''}`}
                        onClick={() => setActivePage('home')}
                        aria-current={activePage === 'home' ? 'page' : undefined}
                    >
                        <Home size={18} className="nav-icon" />
                        <span>Home</span>
                    </button>

                    {/* My Sticker Journal Tab */}
                    <button
                        className={`nav-btn ${activePage === 'journal' ? 'active-pill' : ''}`}
                        onClick={() => setActivePage('journal')}
                        aria-current={activePage === 'journal' ? 'page' : undefined}
                    >
                        <BookOpen size={18} className="nav-icon" />
                        <span>My Sticker Journal</span>
                    </button>

                    {/* Start Quest Action Button */}
                    <button
                        className="nav-cta-btn"
                        onClick={() => setActivePage('quest')}
                        title="Start your outdoor adventure"
                    >
                        <Sparkles size={18} />
                        <span>Start Quest</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
