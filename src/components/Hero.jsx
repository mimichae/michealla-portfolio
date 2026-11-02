import { useEffect, useState } from "react";
import { profile, skills } from "../data";
import { scrollToId } from "../hooks";
import { FacebookIcon, MailIcon } from "./icons";

export default function Hero() {
  const [i, setI] = useState(0);
  const [activity, setActivity] = useState(92);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.headlines.length), 2600);
    const a = setInterval(() => setActivity(86 + Math.floor(Math.random() * 12)), 2000);
    return () => { clearInterval(t); clearInterval(a); };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow reveal"><i /> Based in {profile.location} · Open for work</p>
          {/* key swaps the span so the entry animation replays for each phrase */}
          <h1 className="headline" aria-live="polite"><span key={i}>{profile.headlines[i]}</span></h1>
          <p className="lead reveal" style={{ "--d": "0.1s" }}>
            I&apos;m <b>{profile.first} {profile.last}</b>, a {profile.age}-year-old {profile.course} student. By day I study computer science; by craft, I build
            websites, design interfaces and set up databases that just feel right.
          </p>
          <div className="hero-btns reveal" style={{ "--d": "0.2s" }}>
            <button className="btn primary" onClick={() => scrollToId("work")}>View Work <span className="arrow">→</span></button>
            <button className="btn ghost" onClick={() => scrollToId("contact")}>Let&apos;s Talk</button>
          </div>
          <div className="socials reveal" style={{ "--d": "0.3s" }}>
            <a href={profile.facebook} target="_blank" rel="noopener" aria-label="Facebook"><FacebookIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="panel stack reveal" style={{ "--d": "0.2s" }}>
          <div className="stack-head"><span>Skill Stack</span><span className="hint">◉ Hover to explore</span></div>
          <div className="tiles">
            {skills.map((s, n) => (
              <div key={s.name} className="tile">
                <span className="ic" aria-hidden="true">{s.icon}</span>
                <b>{s.name}</b>
                <div className="track"><i style={{ width: `${s.value}%`, animationDelay: `${0.4 + n * 0.15}s` }} /></div>
                <small>{s.value}%</small>
              </div>
            ))}
          </div>
          <div className="activity">
            <span>Activity</span>
            <div className="wave" aria-hidden="true">{Array.from({ length: 22 }, (_, k) => <i key={k} style={{ "--i": k }} />)}</div>
            <b>{activity}%</b>
          </div>
        </div>
      </div>
    </section>
  );
}
