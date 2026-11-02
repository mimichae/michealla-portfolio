import { useCallback, useEffect, useState } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import { UpIcon } from "./components/icons";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import { Contact, Marquee, Services, Testimonials } from "./components/Sections";
import Work from "./components/Work";
import { scrollToId, useReveal } from "./hooks";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const done = useCallback(() => setLoading(false), []);
  useReveal(!loading);

  useEffect(() => {
    const onScroll = () => setShowTop(scrollY > 600);
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {loading && <Loader onDone={done} />}
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <button className={`to-top ${showTop ? "" : "hidden"}`} onClick={() => scrollToId("home")} aria-label="Back to top"><UpIcon /></button>
    </>
  );
}
