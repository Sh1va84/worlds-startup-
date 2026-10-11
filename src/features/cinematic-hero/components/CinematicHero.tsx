"use client";

import { useEffect, useRef, useState } from "react";
import { WORLD_DURATION_MS, worlds } from "../config/worlds.config";

export function CinematicHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const activeWorld = worlds[activeIndex];

  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo || isPaused) return;
    activeVideo.play().catch(() => undefined);
  }, [activeIndex, isPaused]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = isMuted;
      if (index !== activeIndex) video.pause();
    });
  }, [activeIndex, isMuted]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % worlds.length);
    }, WORLD_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  function togglePlayback() {
    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;
    if (isPaused) activeVideo.play().catch(() => undefined);
    else activeVideo.pause();
    setIsPaused((paused) => !paused);
  }

  return (
    <main className="hero" style={{ "--world-accent": activeWorld.theme.accent, "--world-fg": activeWorld.theme.foreground, "--world-bg": activeWorld.theme.background } as React.CSSProperties}>
      <div className="hero__media" aria-hidden="true">
        {worlds.map((world, index) => (
          <video
            className={`hero__video ${index === activeIndex ? "is-active" : ""}`}
            key={world.id}
            loop
            muted={isMuted}
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            ref={(element) => { videoRefs.current[index] = element; }}
            src={world.videoSrc}
          />
        ))}
      </div>
      <div className="hero__veil" />

      <header className="hero__header"><span>WORLDS</span><span>001 / 002</span></header>
      <section className="hero__content" aria-live="polite">
        <p className="hero__eyebrow">NOW ENTERING</p>
        <h1 key={activeWorld.id}>{activeWorld.name}</h1>
        <p className="hero__tagline">{activeWorld.tagline}</p>
      </section>

      <nav className="hero__worlds" aria-label="World selection">
        {worlds.map((world, index) => (
          <button className={index === activeIndex ? "is-active" : ""} key={world.id} onClick={() => setActiveIndex(index)}>
            <span>0{index + 1}</span>{world.name}
          </button>
        ))}
      </nav>

      <div className="hero__controls">
        <button onClick={togglePlayback}>{isPaused ? "PLAY" : "PAUSE"}</button>
        <button onClick={() => setIsMuted((muted) => !muted)}>{isMuted ? "SOUND OFF" : "SOUND ON"}</button>
      </div>
      <div className="hero__progress"><span key={activeWorld.id} /></div>
    </main>
  );
}
