import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Award, Clock } from 'lucide-react';
import bgImg from '../assets/bg_img.png';

import {
    Coffee,
    Leaf,
    Search,
    Compass,
    Moon,
    Sun,
} from "lucide-react";

export const moods = [
    {
        id: "bored",
        label: "Bored",
        description: "Surprise me with something fun",
        icon: Coffee,
        color: "#9B613B",
        bgColor: "#FCE8D7",
    },
    {
        id: "calm",
        label: "Calm",
        description: "Enjoy a peaceful moment",
        icon: Leaf,
        color: "#477B3B",
        bgColor: "#DDECC1",
    },
    {
        id: "curious",
        label: "Curious",
        description: "Discover something new",
        icon: Search,
        color: "#426A9A",
        bgColor: "#E1EDFA",
    },
    {
        id: "adventurous",
        label: "Adventurous",
        description: "Explore the world around me",
        icon: Compass,
        color: "#99712D",
        bgColor: "#F8E4B9",
    },
    {
        id: "tired",
        label: "Tired",
        description: "Keep it easy and gentle",
        icon: Moon,
        color: "#76609E",
        bgColor: "#E9E2F5",
    },
    {
        id: "happy",
        label: "Happy",
        description: "Make this moment even better",
        icon: Sun,
        color: "#BB626A",
        bgColor: "#F8DDE0",
    },
];



const interests = [
    'Star gazing',
    'Plants and Flowers',
    'Bird & Butterflies',
    'Nature Photography',
    'Walking Exploring',
    'Peaceful Moments'
]


export default function Quest({ onNavigate, completedQuests = [], onCompleteQuest }) {
    const [filter, setFilter] = useState('all');
    const [mood, setMood] = useState('null')
    const [duration, setDuration] = useState('');
    const [interest, setInterest] = useState('');
    const [environment, setEnvironment] = useState('');





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
                </div>


                <div>
                    <div className="mood">
                        <p>Choose your mood</p>
                        {moods.map((m) => {
                            const icon = m.icon;
                            const isSelected = m.id;

                            <button
                                key={m.id}
                                type='button'
                                onClick={setMood(m.id)}
                                aria-pressed={isSelected}

                            >
                                {m.label}
                            </button>
                        })}
                    </div>
                    <div onChange={(e) => setDuration(e.target.value)}>
                        <label>Duration: </label>
                        <input type="number" />
                    </div>
                    <div className='inerest' onChange={(e) => setInterest(e.target.value)}>
                        <p>What would you love to explore ?</p>
                        {interests.map((i) => (
                            <div className='ith_iterest' id={i}>{i}</div>
                        ))}

                        <label>Or tell us something else:</label>
                        <input type="text" name="interest" />
                    </div>

                    <div className="environment" onChange={setEnvironment}>
                        <p>Describe the environment : </p>
                        <input type="text" name="environment" id="env" />
                    </div>

                </div>
            </div>
        </div>
    );
}
