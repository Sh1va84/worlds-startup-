"use client";

import { useEffect, useRef, useState } from "react";
import { worlds } from "../config/worlds.config";

type DeepState = "entry" | "arrival" | "check-in" | "reset" | "done";

const checkInOptions = [
  { id: "noise", label: "Everything is too loud", note: "The world is asking too much at once." },
  { id: "lost", label: "I feel disconnected", note: "You are here. That is enough to start." },
  { id: "weight", label: "I am carrying too much", note: "You do not have to hold it perfectly." },
  { id: "empty", label: "I am running on empty", note: "Rest is not a reward you need to earn." },
] as const;

const deepWorld = worlds.find((world) => world.id === "deep");

export function CinematicHero() {
  const [state, setState] = useState<DeepState>("entry");
  const [selectedFeeling, setSelectedFeeling] = useState<(typeof checkInOptions)[number] | null>(null);
  const [note, setNote] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [breaths, setBreaths] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const holdTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !deepWorld) return;
    video.muted = isMuted;
    if (state !== "entry") video.play().catch(() => undefined);
  }, [isMuted, state]);

  useEffect(() => () => {
    if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
  }, []);

  if (!deepWorld) return null;

  const startReset = () => { setState("reset"); setBreaths(0); };
  const registerBreath = () => {
    setBreaths((count) => {
      if (count >= 2) setState("done");
      return Math.min(count + 1, 3);
    });
  };
  const startHolding = () => {
    if (isHolding) return;
    setIsHolding(true);
    holdTimerRef.current = window.setTimeout(() => {
      setIsHolding(false);
      registerBreath();
    }, 2600);
  };
  const stopHolding = () => {
    if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    setIsHolding(false);
  };
  const moveSignal = (event: React.PointerEvent<HTMLElement>) => {
    rootRef.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
    rootRef.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
    rootRef.current?.style.setProperty("--pointer-opacity", "1");
  };

  return (
    <main className={`deep deep--${state}`} onPointerLeave={() => rootRef.current?.style.setProperty("--pointer-opacity", "0")} onPointerMove={moveSignal} ref={rootRef}>
      <video aria-hidden="true" className="deep__film" loop muted={isMuted} playsInline preload="auto" ref={videoRef} src={deepWorld.videoSrc} onLoadedMetadata={(event) => { event.currentTarget.currentTime = deepWorld.videoStartSeconds; }} />
      <div className="deep__wash" /><div className="deep__grain" aria-hidden="true" /><div className="deep__scanline" aria-hidden="true" />
      <div className="deep__interaction-light" aria-hidden="true" /><div className="deep__pointer" aria-hidden="true" />

      <header className="deep__header">
        <button className="deep__brand" onClick={() => setState("entry")} aria-label="Return to the Deep entry">WORLDS<span>/</span>DEEP</button>
        <div className="deep__signal"><i /> PRIVATE SIGNAL <span>01</span></div>
        <button className="deep__sound" onClick={() => setIsMuted((muted) => !muted)}>{isMuted ? "SOUND: OFF" : "SOUND: ON"}</button>
      </header>

      <aside className="deep__rail" aria-hidden="true"><span>STAY WITH YOURSELF</span><div><i className={state !== "entry" ? "is-on" : ""} /><i className={state === "reset" || state === "done" ? "is-on" : ""} /><i className={state === "done" ? "is-on" : ""} /></div><span>NO FEED. NO PERFORMANCE.</span></aside>

      {state === "entry" && <section className="deep__entry">
        <p className="deep__kicker">THE SPACE UNDER THE NOISE</p>
        <div className="deep__wordmark" aria-label="Deep"><span>D</span><span>E</span><span>E</span><span>P</span></div>
        <div className="deep__entry-bottom"><p>You are not a problem<br />to solve tonight.</p><button className="deep__enter" onClick={() => setState("arrival")}><span>ENTER WITHOUT PERFORMING</span><b>↓</b></button></div>
      </section>}

      {state === "arrival" && <section className="deep__arrival">
        <p className="deep__kicker">YOU MADE IT BELOW THE SURFACE</p><h1>What are you<br /><em>carrying</em> right now?</h1><p className="deep__body">No algorithm is listening. This stays on this screen.</p><button className="deep__primary" onClick={() => setState("check-in")}>NAME THE WEATHER <b>↘</b></button>
      </section>}

      {state === "check-in" && <section className="deep__checkin">
        <div className="deep__checkin-heading"><p className="deep__kicker">CHECK-IN / 01</p><h1>Tell the truth<br />without making it <em>pretty.</em></h1></div>
        <div className="deep__choices" role="list">{checkInOptions.map((option, index) => <button className={selectedFeeling?.id === option.id ? "is-selected" : ""} key={option.id} onClick={() => setSelectedFeeling(option)} role="listitem"><span>0{index + 1}</span><strong>{option.label}</strong><i>↗</i></button>)}</div>
        <div className="deep__reflection"><label htmlFor="deep-note">OPTIONAL / LEAVE A LINE FOR YOURSELF</label><textarea id="deep-note" maxLength={180} onChange={(event) => setNote(event.target.value)} placeholder="Nobody needs to understand it but you." value={note} /><div><span>{note.length}/180</span><button className="deep__primary" disabled={!selectedFeeling} onClick={startReset}>TAKE THE NEXT 60 SECONDS <b>↘</b></button></div></div>
      </section>}

      {state === "reset" && <section className="deep__reset">
        <p className="deep__kicker">NO FIXING. JUST A PAUSE.</p><div className={isHolding ? "deep__orb is-holding" : "deep__orb"} aria-hidden="true"><span /></div><h1>Let the next breath<br />be <em>yours.</em></h1><p className="deep__body">Press and hold. Let the signal expand, then let it go.</p><button aria-label="Press and hold for one breath" className={isHolding ? "deep__breath is-holding" : "deep__breath"} onPointerCancel={stopHolding} onPointerDown={startHolding} onPointerLeave={stopHolding} onPointerUp={stopHolding}><span>{isHolding ? "STAY WITH IT" : breaths === 0 ? "HOLD TO BEGIN" : breaths === 1 ? "HOLD AGAIN" : "ONE MORE HOLD"}</span><b>{breaths + 1}/3</b></button>
      </section>}

      {state === "done" && <section className="deep__done">
        <p className="deep__kicker">THE SIGNAL GOT THROUGH</p><h1>You stayed.</h1><p>{selectedFeeling?.note}</p><div className="deep__done-actions"><button className="deep__primary" onClick={() => { setNote(""); setSelectedFeeling(null); setState("check-in"); }}>START AGAIN <b>↻</b></button><button className="deep__quiet-link" onClick={() => setState("entry")}>RETURN TO THE SURFACE</button></div>
      </section>}

      {state !== "entry" && <p className="deep__footer">THIS IS A PRIVATE PROTOTYPE — NOTHING IS SAVED</p>}
    </main>
  );
}
