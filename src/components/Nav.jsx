import { useEffect, useState } from "react";
import { profile } from "../data";
import { scrollToId } from "../hooks";

const links = [["home", "Home"], ["about", "About"], ["services", "Services"], ["work", "Work"], ["contact", "Contact"]];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 20);
      let cur = "home";
      links.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { scrollToId(id); setOpen(false); };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-in">
        <button className="brand" onClick={() => go("home")}><i />{profile.first} {profile.last}</button>
        <nav className={`pill ${open ? "open" : ""}`}>
          {links.map(([id, label]) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <button className="btn primary hire" onClick={() => go("contact")}>Hire Me <span className="arrow">→</span></button>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Close" : "Menu"}</button>
      </div>
    </header>
  );
}
