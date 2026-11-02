import { useEffect, useState } from "react";

/** Adds .in to every .reveal element the first time it scrolls into view. Re-scans when `ready` flips. */
export function useReveal(ready) {
  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ready]);
}

/** Counts from 0 to `to` once `start` is true. */
export function useCountUp(to, start, ms = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, ms]);
  return n;
}

export const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
