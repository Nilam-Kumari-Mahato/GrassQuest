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