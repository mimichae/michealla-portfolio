import { useEffect, useState } from "react";
import { projects } from "../data";
import { scrollToId } from "../hooks";
import { ArrowIcon, CloseIcon } from "./icons";

/** Fake app screenshots drawn with divs, so the mock projects need no image files. */
function Shot({ kind }) {
  const box = { position: "absolute", inset: 0, overflow: "hidden", fontSize: 10, textAlign: "left" };
  if (kind === "market")
    return (
      <div className="shot" style={{ ...box, background: "linear-gradient(135deg,#065f46,#10b981)", color: "#fff", padding: "6%" }}>
        <b style={{ fontSize: 13 }}>Candijay Market Hub</b>
        <p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginTop: 14 }}>Fresh from the market,<br />reserved from home.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 16 }}>
          {["Isda ₱180", "Gulay ₱40", "Bugas ₱52", "Prutas ₱90"].map((t) => <div key={t} style={{ background: "rgba(255,255,255,.18)", borderRadius: 8, padding: 10 }}>{t}</div>)}
        </div>
      </div>
    );
  if (kind === "portal")
    return (
      <div className="shot" style={{ ...box, background: "#1d4ed8", padding: "6%", color: "#fff" }}>
        <div style={{ transform: "rotate(-8deg) translate(4%,8%)", background: "#fff", color: "#1e3a8a", borderRadius: 12, padding: 14, width: "85%", boxShadow: "0 20px 40px rgba(0,0,0,.3)" }}>
          <b style={{ fontSize: 12 }}>Guiling Barangay Portal</b>
          <p style={{ marginTop: 8, fontWeight: 700, fontSize: 14 }}>1. Choose a document</p>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {["Clearance", "Indigency", "Residency"].map((t, i) => <div key={t} style={{ flex: 1, border: "1px solid #bfdbfe", borderRadius: 8, padding: 8, background: i === 0 ? "#dbeafe" : "#fff" }}>{t}</div>)}
          </div>
          <div style={{ marginTop: 10, background: "#2563eb", color: "#fff", borderRadius: 6, padding: "6px 10px", display: "inline-block" }}>Continue</div>
        </div>
      </div>
    );
  if (kind === "pos")
    return (
      <div className="shot" style={{ ...box, background: "#faf7f2", color: "#3f2a1d", display: "flex" }}>
        <div style={{ width: "20%", background: "#3f2a1d", color: "#f5e9dc", padding: 12, lineHeight: 2 }}><b>Kapehan</b><br />Orders<br />Menu<br />Stock<br />Reports</div>
        <div style={{ flex: 1, padding: 14 }}>
          <b style={{ fontSize: 13 }}>Today&apos;s Sales</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 10 }}>
            {[["Sales", "₱8,420"], ["Orders", "137"], ["Low stock", "4"]].map(([k, v]) => <div key={k} style={{ background: "#fff", borderRadius: 8, padding: 8, boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>{k}<b style={{ display: "block", fontSize: 15 }}>{v}</b></div>)}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 70, marginTop: 12, background: "#fff", borderRadius: 8, padding: 10 }}>
            {[40, 65, 50, 85, 70, 95, 60].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: "#b45309", borderRadius: 3 }} />)}
          </div>
        </div>
      </div>
    );
  return (
    <div className="shot" style={{ ...box, background: "linear-gradient(135deg,#4c1d95,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      {["Today", "Focus"].map((t, i) => (
        <div key={t} style={{ width: "26%", height: "78%", background: "#fff", borderRadius: 20, border: "4px solid #1f1235", padding: 10, color: "#4c1d95" }}>
          <b>{t}</b>
          {i === 0
            ? ["Data Struct quiz", "OOP project", "Thesis ch. 2"].map((x) => <p key={x} style={{ marginTop: 6, background: "#ede9fe", borderRadius: 6, padding: "3px 6px" }}>{x}</p>)
            : <p style={{ fontSize: 26, fontWeight: 700, textAlign: "center", marginTop: 26 }}>24:59</p>}
        </div>
      ))}
    </div>
  );
}

export default function Work() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="work">
      <div className="wrap">
        <p className="label reveal">03 Selected work</p>
        <h2 className="h2 reveal" style={{ "--d": "0.1s" }}>Things I&apos;ve <span className="accent">shipped.</span></h2>
        <div className="work-grid">
          {projects.map((p, i) => (
            <button key={p.title} className="work-card reveal" style={{ "--d": `${(i % 2) * 0.12}s` }} onClick={() => setOpen(p)}>
              <Shot kind={p.kind} />
              <span className="tag">{p.tag}</span>
              <span className="info">
                <span className="title">{p.title}</span>
                <small>{p.meta}</small>
              </span>
              <span className="go" aria-hidden="true"><ArrowIcon /></span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close"><CloseIcon /></button>
            <div style={{ position: "relative" }}><Shot kind={open.kind} /></div>
            <div className="modal-body">
              <p className="cat">{open.meta}</p>
              <h3>{open.title}</h3>
              <p>{open.description}</p>
              <div className="chips">{open.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="facts">
                <div><small>Year</small><b>{open.year}</b></div>
                <div><small>Duration</small><b>{open.duration}</b></div>
                <div style={{ gridColumn: "1 / -1" }}><small>Tools</small><b>{open.tools}</b></div>
              </div>
              <button className="btn primary" onClick={() => { setOpen(null); scrollToId("contact"); }}>Want one like this? <span className="arrow">→</span></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
