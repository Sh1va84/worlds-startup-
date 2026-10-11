export type WorldId = "deep" | "travel";

export interface World {
  id: WorldId;
  name: string;
  tagline: string;
  videoSrc: string;
  theme: {
    accent: string;
    foreground: string;
    background: string;
  };
}
