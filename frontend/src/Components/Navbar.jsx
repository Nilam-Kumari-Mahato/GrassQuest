import React from 'react';
import { Home, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 bg-[#A8B784]/60 backdrop-blur-md border-[1.5px] border-white/85 shadow-soft-card py-2 px-3.5 sm:px-6 rounded-[20px] max-w-[860px] w-full transition-all duration-300 hover:shadow-float" aria-label="Main Navigation">
                {/* Brand Logo */}
                <button
                    className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-1 rounded-2xl transition-transform hover:scale-105"
                    onClick={() => setActivePage('home')}
                    title="Return to Home"
                >
                    <span className="font-hero text-2xl font-bold text-forest tracking-tight">GrassQuest</span>
                    <svg
                        className="text-clover opacity-90"
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
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Home Tab */}
                    <button
                        className={`inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full font-rounded text-[0.92rem] sm:text-[0.96rem] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${activePage === 'home'
                                ? 'bg-forest text-white shadow-sm'
                                : 'text-forest hover:bg-[#7da152]/35'
                            }`}
                        onClick={() => setActivePage('home')}
                        aria-current={activePage === 'home' ? 'page' : undefined}
                    >
                        <Home size={18} />
                        <span>Home</span>
                    </button>

                    {/* My Sticker Journal Tab */}
                    <button
                        className={`inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full font-rounded text-[0.92rem] sm:text-[0.96rem] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${activePage === 'journal'
                                ? 'bg-forest text-white shadow-sm'
                                : 'text-forest hover:bg-[#7da152]/35'
                            }`}
                        onClick={() => setActivePage('journal')}
                        aria-current={activePage === 'journal' ? 'page' : undefined}
                    >
                        <BookOpen size={18} />
                        <span className="hidden sm:inline">My Sticker Journal</span>
                        <span className="sm:hidden">Journal</span>
                    </button>

                    {/* Start Quest Action Button */}
                    <button
                        className="bg-clover text-white font-hero text-base sm:text-lg font-bold py-1.5 px-4 sm:px-5 rounded-[18px] cursor-pointer shadow-botanical hover:bg-clover-dark hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-1.5"
                        onClick={() => setActivePage('quest')}
                        title="Start your outdoor adventure"
                    >
                        <Sparkles size={17} />
                        <span>Start Quest</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
