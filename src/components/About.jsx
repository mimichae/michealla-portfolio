import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile, stats } from "../data";
import { scrollToId, useCountUp } from "../hooks";

// three.js + physics are heavy; load them only when this section is reached
const Lanyard = lazy(() => import("./Lanyard"));

function Stat({ s, start }) {
  const n = useCountUp(s.value, start);
  return (
    <div>
      <b>{n}</b><sup>{s.suffix}</sup>
      <small>{s.label}</small>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className="wrap about-grid">
        <div>
          <p className="label reveal">01 About me</p>
          <h2 className="about-title reveal" style={{ "--d": "0.1s" }}>
            <span className="grad-text">Hello, I&apos;m</span>
            <br />
            {profile.first} {profile.last}
          </h2>
          <p className="about-text reveal" style={{ "--d": "0.2s" }}>
            I&apos;m a <b>tech and creative hybrid</b> from {profile.location}. In class I learn <b>algorithms, databases and systems</b>; outside of it I craft
            digital experiences through <b>user-centered UI/UX design</b> and <b>clean, responsive websites</b>.
          </p>
          <div className="hero-btns reveal" style={{ "--d": "0.3s" }}>
            <button className="btn primary" onClick={() => scrollToId("contact")}>Get in touch</button>
            <button className="btn ghost" onClick={() => scrollToId("work")}>&lt;/&gt; View Projects</button>
          </div>
          <div className="stats reveal" style={{ "--d": "0.4s" }}>
            {stats.map((s) => <Stat key={s.label} s={s} start={near} />)}
          </div>
        </div>

        <div className="lanyard-box">
          {near && (
            <Suspense fallback={null}>
              <Lanyard />
            </Suspense>
          )}
          <span className="lanyard-hint">← DRAG THE CARD →</span>
        </div>
      </div>
    </section>
  );
}
