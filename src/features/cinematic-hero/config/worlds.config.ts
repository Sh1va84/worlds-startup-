import type { World } from "../types/world.types";

export const worlds: readonly World[] = [
  {
    id: "deep",
    name: "DEEP",
    tagline: "Where silence becomes infinite.",
    videoSrc:
      "/assets/videos/deep/Nature%20Is%20Speaking%20%E2%80%93%20Julia%20Roberts%20is%20Mother%20Nature%20Conservation%20International%20(CI)_1440p.mp4",
    theme: { accent: "#8bc6ff", foreground: "#f2f7ff", background: "#020713" },
  },
  {
    id: "travel",
    name: "TRAVEL",
    tagline: "Go farther. Feel everything.",
    videoSrc: "/assets/videos/travel/GoPro%20HERO5%20%2B%20Karma%20The%20Launch%20in%204K_1440p.mp4",
    theme: { accent: "#ffc46b", foreground: "#fff8eb", background: "#160d05" },
  },
];

export const WORLD_DURATION_MS = 9_000;
