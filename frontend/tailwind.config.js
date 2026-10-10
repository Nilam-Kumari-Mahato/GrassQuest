/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    DEFAULT: '#244B2B',
                    deep: '#1E3C23',
                    light: '#2E5D35',
                },
                clover: {
                    DEFAULT: '#78B957',
                    dark: '#5F9943',
                    light: '#93CD73',
                    soft: '#EAF5DF',
                },
                sage: {
                    DEFAULT: '#DDECC1',
                    light: '#EDF6DC',
                    dark: '#C0D59B',
                },
                cream: {
                    DEFAULT: '#FFF9E9',
                    warm: '#FDF6E2',
                    card: '#FCF9F0',
                },
                blush: {
                    DEFAULT: '#F3D9D7',
                    soft: '#FAECEB',
                },
                botanical: {
                    brown: '#4A3525',
                    gold: '#E5A93C',
                    dew: '#83BFB3',
                }
            },
            fontFamily: {
                hero: ['"Patrick Hand"', '"Gaegu"', 'cursive', 'sans-serif'],
                quote: ['Caveat', 'cursive', 'sans-serif'],
                rounded: ['Fredoka', 'Quicksand', 'sans-serif'],
                body: ['Quicksand', 'sans-serif'],
            },
            boxShadow: {
                'soft-card': '0 8px 24px rgba(36, 75, 43, 0.08), 0 2px 6px rgba(0,0,0,0.03)',
                'float': '0 12px 32px rgba(36, 75, 43, 0.12)',
                'botanical': '0 4px 14px rgba(120, 185, 87, 0.3)',
            },
            keyframes: {
                petFloat: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-8px) rotate(1deg)' },
                },
                gentlePulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.03)' },
                },
                sparkle: {
                    '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
                    '50%': { transform: 'scale(1.2) rotate(15deg)', opacity: '0.85' },
                }
            },
            animation: {
                'pet-float': 'petFloat 4.5s ease-in-out infinite',
                'gentle-pulse': 'gentlePulse 2.5s ease-in-out infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
