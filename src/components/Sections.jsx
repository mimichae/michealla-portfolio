import { marquee, profile, services, testimonials } from "../data";
import { FacebookIcon, MailIcon } from "./icons";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map(([text, style], i) => <span key={i} className={style}>{text}</span>)}
      </div>
    </div>
  );
}

export function Services() {
  // the hover glow follows the mouse inside each card
  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section id="services">
      <div className="wrap">
        <p className="label reveal">02 What I do</p>
        <h2 className="h2 reveal" style={{ "--d": "0.1s" }}>Services &amp; <span className="accent">capabilities.</span></h2>
        <div className="services">
          {services.map((s, i) => (
            <article key={s.title} className="panel service reveal" style={{ "--d": `${i * 0.1}s` }} onMouseMove={track}>
              <span className="num">0{i + 1}</span>
              <div className="ic" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="chips">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="voices">
      <div className="wrap">
        <p className="label reveal">04 Voices</p>
        <h2 className="h2 reveal" style={{ "--d": "0.1s" }}>Kind words from <span className="accent">good people.</span></h2>
        <div className="quotes">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="panel quote reveal" style={{ "--d": `${i * 0.1}s` }}>
              <span className="mark" aria-hidden="true">&rdquo;</span>
              <p>{t.text}</p>
              <footer>
                <span className="avatar">{t.initials}</span>
                <span><b>{t.name}</b><small>{t.role}</small></span>
              </footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <section id="contact">
        <div className="wrap contact-grid">
          <div>
            <p className="label reveal">05 Get in touch</p>
            <h2 className="contact-title reveal" style={{ "--d": "0.1s" }}>
              Have a project?<br /><span className="accent">Let&apos;s talk.</span>
            </h2>
          </div>
          <div className="panel connect reveal" style={{ "--d": "0.2s" }}>
            <h3>Connect With Me</h3>
            <div className="links">
              <a className="link" href={profile.facebook} target="_blank" rel="noopener">
                <span className="ic" style={{ background: "rgba(24,119,242,.15)", color: "#60a5fa" }}><FacebookIcon /></span>
                <span><b>Let&apos;s Connect</b><small>on Facebook</small></span>
                <span className="ext" aria-hidden="true">↗</span>
              </a>
              <a className="link" href={`mailto:${profile.email}`}>
                <span className="ic" style={{ background: "rgba(234,67,53,.15)", color: "#f87171" }}><MailIcon /></span>
                <span><b>Email</b><small>{profile.email}</small></span>
                <span className="ext" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="site">
        <div className="wrap">
          <span>© 2026 {profile.first} {profile.last}</span>
          <span>{profile.course} · {profile.location}</span>
        </div>
      </footer>
    </>
  );
}
