import {
    Trees,
    Flower2,
    Footprints,
    House,
    Building2,
    Compass,
} from "lucide-react";

export const environments = [
    {
        id: "park",
        label: "Park",
        description: "Explore a nearby green space",
        icon: Trees,
    },
    {
        id: "garden",
        label: "Garden",
        description: "Discover plants and flowers",
        icon: Flower2,
    },
    {
        id: "neighborhood",
        label: "Neighborhood",
        description: "Explore your surroundings",
        icon: Footprints,
    },
    {
        id: "balcony",
        label: "Balcony",
        description: "Enjoy a little outdoor break",
        icon: House,
    },
    {
        id: "indoors",
        label: "Indoors",
        description: "Find nature from inside",
        icon: Building2,
    },
    {
        id: "any",
        label: "Anywhere",
        description: "Let your clover buddy decide",
        icon: Compass,
    },
];