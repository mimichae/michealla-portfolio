import { useEffect, useState } from "react";
import { profile } from "../data";

/** Intro screen: spinning arc around the monogram and a progress bar that fills to 100%. */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPct((p) => Math.min(100, p + Math.ceil(Math.random() * 9))), 90);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (pct < 100) return;
    const t1 = setTimeout(() => setDone(true), 500);
    const t2 = setTimeout(onDone, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pct, onDone]);

  return (
    <div className={`loader ${done ? "done" : ""}`} aria-hidden={done}>
      <div className="loader-inner">
        <div className="logo-wrap">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <linearGradient id="arc" x1="0" x2="1">
                <stop offset="0" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#5eead4" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <path d="M60 4 A56 56 0 0 1 116 60" fill="none" stroke="url(#arc)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="monogram">{profile.initials}</span>
        </div>
        <h1>{profile.first} {profile.last}.</h1>
        <small>{profile.course} · Web Dev · UI/UX</small>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        <div className="bar-meta">
          <span>{pct < 60 ? "LOADING ASSETS" : pct < 100 ? "ALMOST READY" : "WELCOME"}</span>
          <b>{pct}%</b>
        </div>
      </div>
    </div>
  );
}
