import React from 'react';
import { Home, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
    return (
        <header className="fixed top-2 left-0 right-0 z-50 flex justify-center px-2 pointer-events-none sm:top-4 sm:px-4">
            <nav className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-3 lg:gap-6 bg-[#A8B784]/85 backdrop-blur-md border-[1.5px] border-white/85 shadow-soft-card py-2 px-2 sm:px-4 lg:px-6 rounded-[20px] max-w-[860px] w-full transition-all duration-300 hover:shadow-float" aria-label="Main Navigation">
                {/* Brand Logo */}
                <button
                    className="flex min-w-0 items-center gap-1 bg-transparent border-0 cursor-pointer p-1 rounded-2xl transition-transform hover:scale-105 sm:gap-1.5"
                    onClick={() => setActivePage('home')}
                    title="Return to Home"
                >
                    <span className="font-hero text-lg sm:text-2xl font-bold text-forest tracking-tight">GrassQuest</span>
                    <svg
                        className="hidden shrink-0 text-clover opacity-90 sm:block"
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
                <div className="flex shrink-0 items-center gap-0.5 sm:gap-2 lg:gap-3">
                    {/* Home Tab */}
                    <button
                        className={`inline-flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 lg:px-4 rounded-full font-rounded text-sm sm:text-[0.96rem] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${activePage === 'home'
                                ? 'bg-forest text-white shadow-sm'
                                : 'text-forest hover:bg-[#7da152]/35'
                            }`}
                        onClick={() => setActivePage('home')}
                        aria-current={activePage === 'home' ? 'page' : undefined}
                    >
                        <Home size={17} className="shrink-0" />
                        <span className="hidden min-[390px]:inline">Home</span>
                    </button>

                    {/* My Sticker Journal Tab */}
                    <button
                        className={`inline-flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 lg:px-4 rounded-full font-rounded text-sm sm:text-[0.96rem] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${activePage === 'journal'
                                ? 'bg-forest text-white shadow-sm'
                                : 'text-forest hover:bg-[#7da152]/35'
                            }`}
                        onClick={() => setActivePage('journal')}
                        aria-current={activePage === 'journal' ? 'page' : undefined}
                    >
                        <BookOpen size={17} className="shrink-0" />
                        <span className="hidden sm:inline">My Sticker Journal</span>
                        <span className="sm:hidden">Journal</span>
                    </button>

                    {/* Start Quest Action Button */}
                    <button
                        className="bg-clover text-white font-hero text-base sm:text-lg font-bold py-2 px-2.5 sm:px-4 lg:px-5 rounded-[18px] cursor-pointer shadow-botanical hover:bg-clover-dark hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                        onClick={() => setActivePage('quest')}
                        title="Start your outdoor adventure"
                    >
                        <Sparkles size={17} />
                        <span className="hidden sm:inline">Start Quest</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
