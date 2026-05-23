import React, { useState, useEffect, useRef } from "react";
import { Icon, SiteHeaderSlim, SiteFooterSlim } from "./shell";

/* ─────────────────────────────────────────── hooks */

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.querySelectorAll<HTMLElement>(".reveal").forEach(n => n.classList.add("in"));
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

const useDrift = (factor: number = 0.05) => {
  const [y, setY] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const center = window.innerHeight / 2;
        setY(Math.round((mid - center) * -factor));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [factor]);
  return { ref, y };
};

/* ─────────────────────────────────────────── helpers */

// fix hydration mismatch: round float coords to 3 decimals so SSR & client agree
const r3 = (n: number) => Number(n.toFixed(3));

/* ─────────────────────────────────────────── PROBLEM illustrations (kept) */

const FigStack: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 220 260" style={{ width: "100%", height: "auto", display: "block",
    transform: `translateY(${drift}px) rotate(-3deg)` }} aria-hidden="true">
    <rect x="22" y="60" width="160" height="180" fill="#fbf6ec" stroke="#122339" strokeWidth="1" opacity="0.5" transform="rotate(-4 102 150)"/>
    <rect x="34" y="48" width="160" height="180" fill="#fbf6ec" stroke="#122339" strokeWidth="1" opacity="0.7" transform="rotate(2 114 138)"/>
    <g transform="translate(28 36)">
      <rect width="172" height="192" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
      <text x="14" y="22" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.5" fill="#8a3a24">MOD. VOLTURA · 4 ALL.</text>
      <line x1="14" y1="30" x2="158" y2="30" stroke="#122339" strokeWidth="0.6"/>
      {[44, 58, 72, 86, 100, 114, 128, 142].map((y, i) => (
        <line key={i} x1="14" y1={y} x2={14 + (i % 2 ? 120 : 90)} y2={y} stroke="#122339" strokeWidth="0.5" opacity="0.5"/>
      ))}
      <g transform="translate(14 158)">
        <rect width="10" height="10" fill="none" stroke="#8a3a24" strokeWidth="1.2"/>
        <path d="M2 2 L8 8 M8 2 L2 8" stroke="#8a3a24" strokeWidth="1.2"/>
        <text x="16" y="9" fontFamily="Source Serif 4, Georgia, serif" fontSize="9" fill="#8a3a24" fontStyle="italic">incompleto</text>
      </g>
    </g>
    <g transform="translate(166 18) rotate(14)">
      <path d="M0 0 L34 0 L40 8 L40 28 L0 28 Z" fill="#c25a3e" opacity="0.85"/>
      <text x="6" y="18" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#fbf6ec" letterSpacing="1.2">URGENTE</text>
    </g>
  </svg>
);

const FigClock: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 220 260" style={{ width: "100%", height: "auto", display: "block",
    transform: `translateY(${drift}px)` }} aria-hidden="true">
    <circle cx="110" cy="120" r="78" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30 - 90) * Math.PI / 180;
      const x1 = r3(110 + Math.cos(a) * 72); const y1 = r3(120 + Math.sin(a) * 72);
      const x2 = r3(110 + Math.cos(a) * 66); const y2 = r3(120 + Math.sin(a) * 66);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#122339" strokeWidth={i % 3 === 0 ? 1.5 : 0.7}/>;
    })}
    <line x1="110" y1="120" x2="110" y2="68" stroke="#122339" strokeWidth="2" strokeLinecap="round"/>
    <line x1="110" y1="120" x2="156" y2="142" stroke="#8a3a24" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="110" cy="120" r="3.5" fill="#122339"/>
    <path d="M110 42 A 78 78 0 0 1 188 120" fill="none" stroke="#8a3a24" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
    <text x="110" y="232" textAnchor="middle" fontFamily="Source Serif 4, Georgia, serif" fontStyle="italic" fontSize="14" fill="#8a3a24">
      mancano 12 mesi
    </text>
    <text x="110" y="250" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="#284060" opacity="0.7">
      ART. 31 · D.LGS. 346/90
    </text>
  </svg>
);

const FigDesk: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 220 260" style={{ width: "100%", height: "auto", display: "block",
    transform: `translateY(${drift}px) rotate(2deg)` }} aria-hidden="true">
    <line x1="0" y1="210" x2="220" y2="210" stroke="#122339" strokeWidth="1.2"/>
    <g transform="translate(24 150)">
      <path d="M0 0 L48 0 L44 56 Q42 64 32 64 L16 64 Q6 64 4 56 Z" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
      <path d="M48 14 Q64 14 64 30 Q64 46 48 46" fill="none" stroke="#122339" strokeWidth="1.4"/>
      <path d="M12 -10 Q14 -16 18 -14 M22 -10 Q24 -16 28 -14 M32 -10 Q34 -16 38 -14" stroke="#8a3a24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </g>
    <g transform="translate(120 142) rotate(-6)">
      <rect width="56" height="72" rx="6" fill="#122339"/>
      <rect x="3" y="9" width="50" height="56" rx="2" fill="#fbf6ec"/>
      <circle cx="28" cy="69" r="2" fill="#fbf6ec"/>
      <g transform="translate(8 16)">
        <rect width="38" height="6" fill="#1a7672" opacity="0.6"/>
        <rect y="10" width="30" height="4" fill="#284060" opacity="0.4"/>
        <rect y="20" width="34" height="4" fill="#284060" opacity="0.4"/>
        <rect y="30" width="22" height="4" fill="#284060" opacity="0.4"/>
        <g transform="translate(0 42)">
          <circle cx="3" cy="3" r="3" fill="#c25a3e"/>
          <rect x="10" y="1" width="28" height="4" fill="#c25a3e" opacity="0.6"/>
        </g>
      </g>
    </g>
    <g transform="translate(60 30) rotate(-8)">
      <rect width="92" height="86" fill="#f2e3a8"/>
      <text x="10" y="22" fontFamily="Source Serif 4, Georgia, serif" fontStyle="italic" fontSize="11" fill="#122339">ricordare:</text>
      <text x="10" y="42" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fill="#122339">- visura</text>
      <text x="10" y="58" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fill="#122339">- IBAN banca</text>
      <text x="10" y="74" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fill="#122339">- delega cognato</text>
    </g>
    <text x="14" y="248" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="#284060" opacity="0.6">
      FIG. 03 · UN MARTEDÌ QUALSIASI
    </text>
  </svg>
);

/* ─────────────────────────────────────────── Hero monogram (clean, animated) */

const HeroMark: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 360 360" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
    {/* concentric rings, slow drift */}
    <g transform={`translate(180 180) translate(0 ${drift * 0.6})`}>
      <circle r="156" fill="none" stroke="#fbf6ec" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 9"/>
      <g className="spin-slow" style={{ transformOrigin: "center" }}>
        <circle r="138" fill="none" stroke="#fbf6ec" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 14"/>
      </g>
      <circle r="118" fill="none" stroke="#fbf6ec" strokeOpacity="0.12" strokeWidth="1"/>
    </g>
    {/* center seal */}
    <g transform={`translate(180 180) translate(0 ${drift * -0.4})`} className="tick-pulse">
      <circle r="92" fill="#1a7672"/>
      <circle r="84" fill="none" stroke="#fbf6ec" strokeOpacity="0.45" strokeWidth="0.8"/>
      <g className="spin-slow">
        <path id="hero-arc-2" d="M -68 0 A 68 68 0 1 1 68 0 A 68 68 0 1 1 -68 0" fill="none"/>
        <text fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="3.5" fill="#fbf6ec" fillOpacity="0.7">
          <textPath href="#hero-arc-2" startOffset="0">PRONTASUCCESSIONE · 48H · ONLINE · </textPath>
        </text>
      </g>
      <text textAnchor="middle" y="-6" fontFamily="Source Serif 4, Georgia, serif" fontStyle="italic" fontSize="18" fill="#fbf6ec">in</text>
      <text textAnchor="middle" y="28" fontFamily="Source Serif 4, Georgia, serif" fontWeight="600" fontSize="40" fill="#fbf6ec">48h</text>
    </g>
    {/* tiny sparkles */}
    <circle cx="64" cy="84" r="2" fill="#fbf6ec" opacity="0.55" className="float-y"/>
    <circle cx="300" cy="120" r="2.5" fill="#fbf6ec" opacity="0.45" className="float-y"/>
    <circle cx="284" cy="278" r="1.6" fill="#fbf6ec" opacity="0.5" className="float-y"/>
  </svg>
);

/* ─────────────────────────────────────────── data */

const REVIEWS = [
  { q: "Tutto online, in 48 ore. Mai stati in ufficio.", a: "Giulia M.", who: "Erede unico · Milano" },
  { q: "Ci hanno tolto un peso enorme dopo papà.", a: "Marco & sorella", who: "Due eredi · Torino" },
  { q: "Tariffa chiara dall'inizio. Zero sorprese.", a: "Famiglia R.", who: "Tre eredi · Bari" },
  { q: "Risposte vere a domande vere, in giornata.", a: "Anna B.", who: "AIRE · Berlino" },
  { q: "Hanno recuperato visure che cercavo da mesi.", a: "Paolo T.", who: "Immobili · Roma" },
];

const SOLUTION_BULLETS = [
  { t: "Cosa stai pagando senza saperlo", b: "Commercialisti a parcella, code in CAF, allegati ripetuti tre volte. Costa più del servizio stesso." },
  { t: "Un esperto sempre raggiungibile", b: "Un commercialista dedicato, chat e telefono. Risposte in giornata, anche di sabato." },
  { t: "Il modello \"tutto online\"", b: "SPID, firma digitale, F24, protocollo Agenzia delle Entrate. Niente carta, niente appuntamenti." },
  { t: "Tariffa fissa, dichiarata in anticipo", b: "Sai quanto spendi prima di iniziare. Nessun extra, mai." },
];

const TICKER_RESULTS = [
  "Famiglia 3 eredi · pratica conclusa in 41 ore",
  "Patrimonio immobiliare Roma · 4 volture in 7 giorni",
  "AIRE Germania · firma digitale, mai un appuntamento",
  "Erede unico Milano · F24 calcolato e pagato in app",
  "Coniuge + 2 figli · deleghe online, zero spostamenti",
];

const AUDIENCES = [
  { label: "Erede unico", tag: "Coniuge o figlio/a",
    body: "Stai gestendo tutto da solo. Vuoi un riferimento umano che ti guidi, senza chiamare cinque uffici diversi.",
    ill: <Portrait1/> },
  { label: "Più eredi coinvolti", tag: "Famiglia allargata",
    body: "Fratelli, coniuge, nipoti. Servono deleghe, firme, accordi. Coordiniamo noi la raccolta dei documenti.",
    ill: <Portrait2/> },
  { label: "Patrimonio con immobili", tag: "Case · terreni · quote",
    body: "Più immobili, nuda proprietà, volture catastali. Ricostruiamo la storia di ogni bene dagli archivi.",
    ill: <Portrait3/> },
];

const FAQS: { q: string; a: string; meta?: [string, string]; defaultOpen?: boolean }[] = [
  { q: "Quanto dura davvero il quiz?", a: "Due minuti, in media. Sono cinque domande chiuse: niente dati personali finché non vedi il risultato.",
    meta: ["≈ 2 min", "5 domande"], defaultOpen: true },
  { q: "È gratis? C'è qualche impegno?", a: "Completamente gratis, nessun pagamento, nessun obbligo, nessuna carta di credito. Ti diamo solo un orientamento iniziale.",
    meta: ["€ 0", "Senza carta"] },
  { q: "Cosa succede dopo le risposte?", a: "A video ricevi subito stima della tariffa, tempistica realistica, lista dei documenti. Se vuoi, prenoti una chiamata gratuita di trenta minuti.",
    meta: ["Risposta immediata", "Chiamata opzionale · 30′"] },
  { q: "Ho già un commercialista. Perché parlare con voi?", a: "Non deve cambiare nulla. Noi facciamo solo dichiarazioni di successione, tutto online, in 48 ore. La consulenza serve a capire se è il caso di affiancarci.",
    meta: ["Nessuna sovrapposizione", "Solo successioni"] },
  { q: "I miei dati sono al sicuro?", a: "Le risposte restano sul tuo dispositivo finché non chiedi il riepilogo. Da quel momento le custodiamo su server in Italia ai sensi del GDPR; eliminiamo tutto a fine pratica se ce lo chiedi.",
    meta: ["Server in Italia", "Conforme GDPR"] },
];

/* ─────────────────────────────────────────── Portraits */

function Portrait1() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 56, height: 56, color: "#1a7672" }}>
      <circle cx="32" cy="24" r="11" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 58 Q10 40 32 40 Q54 40 54 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}
function Portrait2() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 56, height: 56, color: "#1a7672" }}>
      <circle cx="22" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="42" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6 58 Q6 42 22 42 Q38 42 38 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M26 58 Q26 42 42 42 Q58 42 58 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}
function Portrait3() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 56, height: 56, color: "#1a7672" }}>
      <path d="M14 50 L14 28 L32 14 L50 28 L50 50 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="20" y="34" width="10" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="34" y="34" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="6" y1="50" x2="58" y2="50" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

/* ─────────────────────────────────────────── FAQ Item */

const FAQItem = ({ q, a, n, meta, defaultOpen }:
  { q: string; a: string; n: string; meta?: [string, string]; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="num">{n}</span>
        <span className="qtext">{q}</span>
        <span className="chev"><Icon name="plus" size={16}/></span>
      </button>
      <div className="a"><div>
        <div className="a-inner">{a}</div>
        {meta && (
          <div className="a-meta">
            <span>{meta[0]}</span>
            <span style={{ color: "var(--border-3)" }}>·</span>
            <span>{meta[1]}</span>
          </div>
        )}
      </div></div>
    </div>
  );
};

/* ─────────────────────────────────────────── Reviews ticker */

const ReviewsTicker = () => {
  const all = [...REVIEWS, ...REVIEWS];
  return (
    <div className="ticker" style={{ background: "var(--paper-200)", padding: "22px 0",
      borderTop: "1px solid var(--border-1)", borderBottom: "1px solid var(--border-1)" }}>
      <div className="ticker-track">
        {all.map((r, i) => (
          <span className="ticker-item" key={i}>
            <span className="stars">★★★★★</span>
            <span>"{r.q}"</span>
            <span className="who">{r.a} — {r.who}</span>
            <span className="ticker-dot"/>
          </span>
        ))}
      </div>
    </div>
  );
};

const ResultsTicker = () => {
  const all = [...TICKER_RESULTS, ...TICKER_RESULTS];
  return (
    <div className="ticker" style={{ background: "var(--ink-900)", padding: "20px 0" }}>
      <div className="ticker-track">
        {all.map((t, i) => (
          <span className="ticker-item" key={i} style={{ color: "var(--paper-100)", fontStyle: "normal",
            fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ color: "var(--seal-500)" }}>✦</span>
            <span>{t}</span>
            <span className="ticker-dot" style={{ background: "rgba(255,255,255,0.25)" }}/>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────── page */

export const Landing = ({ onStart }: { onStart: () => void }) => {
  const heroDrift = useDrift(0.04);
  const revealProblem = useReveal();
  const revealSolution = useReveal();
  const revealAud = useReveal();
  const revealFaq = useReveal();
  const revealCta = useReveal();
  const drift1 = useDrift(0.08);
  const drift2 = useDrift(-0.06);
  const drift3 = useDrift(0.05);

  return (
    <div style={{ background: "var(--bg-page)" }}>
      <SiteHeaderSlim/>

      {/* HERO — dark editorial, single sentence promise */}
      <section style={{ position: "relative", background: "var(--ink-900)", color: "var(--paper-100)",
        overflow: "hidden", padding: "96px 56px 104px" }}>
        {/* ambient halos */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(900px 600px at 12% 20%, rgba(26,118,114,0.22), transparent 60%)," +
            "radial-gradient(700px 500px at 92% 80%, rgba(138,58,36,0.18), transparent 60%)" }}/>
        <div className="row gap-12 wrap" style={{ alignItems: "center", maxWidth: 1240, margin: "0 auto", position: "relative" }}>
          <div style={{ flex: "1.2 1 460px", minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
              color: "var(--teal-300)", textTransform: "uppercase" }}>
              Dichiarazione di successione · online
            </span>
            <h1 className="serif" style={{ fontSize: "clamp(42px, 6.4vw, 80px)", lineHeight: 1.02,
              marginTop: 18, fontWeight: 600, letterSpacing: "-0.032em", color: "var(--paper-50)" }}>
              La tua successione,<br/>
              <em style={{ color: "var(--teal-300)", fontWeight: 600 }}>davvero in regola?</em>
            </h1>
            <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.6, maxWidth: 540,
              color: "rgba(251,246,236,0.75)", fontFamily: "var(--font-serif)" }}>
              Cinque domande, due minuti. Ti diciamo cosa serve, quanto costa e quando è pronta — prima ancora di iniziare.
            </p>

            <div className="row gap-3 wrap" style={{ alignItems: "center", marginTop: 32 }}>
              <button className="btn primary lg" onClick={onStart}>
                Inizia il quiz · 2 minuti <Icon name="arrow-right" size={16}/>
              </button>
              <span style={{ fontSize: 12, color: "rgba(251,246,236,0.6)" }}>
                Gratis · senza carta · risposta immediata
              </span>
            </div>

            {/* trust row */}
            <div className="row gap-6 wrap" style={{ marginTop: 36, alignItems: "center" }}>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <span style={{ color: "var(--seal-500)", letterSpacing: 2, fontSize: 14 }}>★★★★★</span>
                <span style={{ fontSize: 13, color: "var(--paper-100)", fontWeight: 600 }}>4,9 / 5</span>
                <span style={{ fontSize: 12, color: "rgba(251,246,236,0.6)" }}>· 1.200+ recensioni</span>
              </div>
              <span style={{ width: 1, height: 18, background: "rgba(251,246,236,0.18)" }}/>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 18, color: "var(--paper-50)" }}>
                  1.247
                </span>
                <span style={{ fontSize: 12, color: "rgba(251,246,236,0.6)" }}>successioni concluse</span>
              </div>
            </div>
          </div>

          <div ref={heroDrift.ref} style={{ flex: "1 1 340px", maxWidth: 460, position: "relative" }}>
            <HeroMark drift={heroDrift.y}/>
          </div>
        </div>
      </section>

      {/* REVIEWS TICKER */}
      <ReviewsTicker/>

      {/* SOLUTION */}
      <section ref={revealSolution} className="reveal" style={{ padding: "112px 56px",
        background: "var(--bg-page)" }}>
        <div className="row gap-12 wrap" style={{ maxWidth: 1240, margin: "0 auto", alignItems: "flex-start" }}>
          <div style={{ flex: "1.1 1 380px", minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              La soluzione
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(34px, 4.4vw, 54px)", fontWeight: 600,
              letterSpacing: "-0.028em", lineHeight: 1.02 }}>
              Ecco come gestiamo davvero<br/>
              <em style={{ color: "var(--teal-700)" }}>la tua successione, dal primo click.</em>
            </h2>

            <ul style={{ listStyle: "none", padding: 0, margin: "40px 0 0", display: "grid", gap: 26 }}>
              {SOLUTION_BULLETS.map((b, i) => (
                <li key={i} className="reveal" style={{ display: "flex", gap: 18, transitionDelay: `${0.08 * i + 0.08}s` }}>
                  <span style={{ marginTop: 4, display: "inline-flex", width: 28, height: 28, borderRadius: 999,
                    border: "2px solid var(--teal-700)", color: "var(--teal-700)", flexShrink: 0,
                    alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={14} stroke={2.4}/>
                  </span>
                  <div>
                    <p className="serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--fg-1)",
                      letterSpacing: "-0.008em", lineHeight: 1.3 }}>{b.t}</p>
                    <p style={{ marginTop: 8, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.65 }}>{b.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: "1 1 320px", maxWidth: 460, textAlign: "center" }}>
            <div style={{ position: "relative", aspectRatio: "1 / 1", maxWidth: 460, margin: "0 auto" }}>
              <div aria-hidden style={{ position: "absolute", inset: "10%", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(26,118,114,0.18), transparent 60%)", filter: "blur(28px)" }}/>
              <svg viewBox="0 0 400 400" className="spin-slow" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
                <circle cx="200" cy="200" r="186" fill="none" stroke="var(--ink-900)" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 9"/>
              </svg>
              <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
                <circle cx="200" cy="200" r="170" fill="none" stroke="var(--teal-700)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 14"/>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 240, height: 240, borderRadius: 999, background: "var(--teal-700)", color: "var(--paper-50)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 30px 80px -30px rgba(26,118,114,0.55)" }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", opacity: 0.7 }}>TARIFFA FISSA</span>
                  <span className="serif" style={{ fontSize: 56, fontWeight: 600, marginTop: 6, letterSpacing: "-0.03em" }}>€ 0</span>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, marginTop: 6, opacity: 0.9 }}>
                    per scoprire il tuo caso
                  </span>
                </div>
              </div>
            </div>
            <h3 className="serif" style={{ marginTop: 28, fontSize: 22, fontWeight: 600, color: "var(--fg-1)",
              fontStyle: "italic", letterSpacing: "-0.012em" }}>
              Sicuro che la tua pratica sia davvero a posto?
            </h3>
            <div className="row gap-3 wrap" style={{ marginTop: 22, justifyContent: "center" }}>
              <button className="btn primary" onClick={onStart}>
                No, voglio verificare <Icon name="arrow-right" size={14}/>
              </button>
              <button className="btn" onClick={onStart}>
                Sì, ma voglio essere sicuro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM — keeps the figures the user likes */}
      <section ref={revealProblem} className="reveal" style={{ padding: "120px 56px", position: "relative",
        overflow: "hidden", background: "var(--paper-200)", borderTop: "1px solid var(--ink-900)" }}>
        <div className="row gap-12 wrap" style={{ maxWidth: 1240, margin: "0 auto", alignItems: "flex-start" }}>
          <div className="reveal" style={{ flex: "1 1 360px", position: "sticky", top: 32 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
              color: "var(--seal-600)", textTransform: "uppercase" }}>
              Il problema · da soli
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              Stai già attraversando<br/><em style={{ color: "var(--seal-600)" }}>abbastanza.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 460, color: "var(--fg-2)" }}>
              Tre figure, una storia che riconosci. Scorri.
            </p>
            <div className="divider mt-8 mb-6"/>
            <blockquote style={{ borderLeft: "3px solid var(--teal-700)", paddingLeft: 22, maxWidth: 460, margin: 0 }}>
              <p className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em",
                lineHeight: 1.3, color: "var(--fg-1)" }}>
                Noi prendiamo in mano la parte burocratica. Tu pensi al resto.
              </p>
            </blockquote>
          </div>

          <div style={{ flex: "1.1 1 360px", display: "flex", flexDirection: "column", gap: 96 }}>
            <div ref={drift1.ref} className="reveal reveal-d1 row gap-8 wrap" style={{ alignItems: "center" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}><FigStack drift={drift1.y}/></div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 01</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  Pile di moduli, e ne manca sempre uno.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Modello SUC, volture catastali, autocertificazioni, deleghe degli altri eredi. Basta che manchi un allegato e l'ufficio rimanda indietro tutto.
                </p>
              </div>
            </div>

            <div ref={drift2.ref} className="reveal reveal-d2 row gap-8 wrap" style={{ alignItems: "center", flexDirection: "row-reverse" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}><FigClock drift={drift2.y}/></div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 02</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  Il termine corre, in silenzio.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Dodici mesi dalla data del decesso. Sembrano tanti, finché non ti accorgi che metà se ne sono andati ad aspettare appuntamenti, certificati, risposte.
                </p>
              </div>
            </div>

            <div ref={drift3.ref} className="reveal reveal-d3 row gap-8 wrap" style={{ alignItems: "center" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}><FigDesk drift={drift3.y}/></div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 03</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  La testa è già da un'altra parte.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Ti chiedono precisione mentre stai imparando a vivere senza qualcuno. Non dovrebbe essere così — non per chi sta vivendo un lutto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS TICKER */}
      <ResultsTicker/>

      {/* PER CHI È */}
      <section ref={revealAud} className="reveal" style={{ padding: "112px 56px",
        background: "var(--paper-300)", borderBottom: "1px solid var(--ink-900)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="row between wrap" style={{ alignItems: "flex-end", gap: 32 }}>
            <div>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
                color: "var(--teal-700)", textTransform: "uppercase" }}>
                Per chi è ProntaSuccessione
              </span>
              <h2 className="serif mt-3" style={{ fontSize: "clamp(32px, 4.2vw, 50px)", fontWeight: 600,
                letterSpacing: "-0.028em", lineHeight: 1.02, maxWidth: 720 }}>
                Questo servizio è per te se…
              </h2>
            </div>
            <p className="italic-serif" style={{ fontSize: 15, maxWidth: 340, color: "var(--fg-2)", lineHeight: 1.55 }}>
              Lavoriamo solo con un numero ristretto di pratiche al mese.<br/>Riconosciti, e capirai se è il momento.
            </p>
          </div>

          <div className="row gap-6 wrap" style={{ marginTop: 48, alignItems: "stretch" }}>
            {AUDIENCES.map((a, i) => (
              <div key={i} className="aud-card reveal" style={{ flex: "1 1 280px",
                transitionDelay: `${0.08 * i + 0.1}s` }}>
                <div className="ill">{a.ill}</div>
                <p className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.012em",
                  lineHeight: 1.2, color: "var(--fg-1)" }}>{a.label}</p>
                <p className="mono mt-2" style={{ fontSize: 10, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--teal-700)" }}>{a.tag}</p>
                <p className="italic-serif mt-4" style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn primary lg" onClick={onStart}>
              Verifica idoneità <Icon name="arrow-right" size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={revealFaq} className="reveal" style={{ padding: "112px 56px", background: "var(--bg-page)" }}>
        <div className="row gap-12 wrap" style={{ maxWidth: 1240, margin: "0 auto", alignItems: "flex-start" }}>
          <div style={{ flex: "0.85 1 280px", position: "sticky", top: 32 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              F.A.Q.
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(34px, 4.6vw, 54px)", fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 0.98 }}>
              Le domande<br/>che ci fanno<br/><em style={{ color: "var(--teal-700)" }}>tutti.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: 360 }}>
              Niente sondaggi, niente telefonate mascherate. Un percorso guidato per capirci meglio, prima di qualsiasi mossa.
            </p>
            <div className="divider mt-8 mb-6"/>
            <p className="italic-serif mt-3" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, maxWidth: 360 }}>
              Hai una domanda che non trovi qui? <a href="mailto:ciao@prontasuccessione.it" style={{ color: "var(--teal-700)" }}>Scrivici</a>, rispondiamo in giornata.
            </p>
          </div>
          <div style={{ flex: "1.2 1 320px" }}>
            <div className="faq-premium">
              {FAQS.map((it, i) => (
                <FAQItem key={i} {...it} n={["i", "ii", "iii", "iv", "v"][i] + "."}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — appointment ticket */}
      <section ref={revealCta} className="reveal" style={{ padding: "96px 56px 112px",
        background: "var(--ink-900)", color: "var(--paper-100)", borderTop: "1px solid var(--ink-900)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
            color: "var(--teal-300)", textTransform: "uppercase" }}>
            Pronto? · Prossimo passo
          </span>
          <h2 className="serif" style={{ marginTop: 16, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 600,
            letterSpacing: "-0.03em", lineHeight: 1.02, color: "var(--paper-50)" }}>
            La serenità che avresti dovuto avere<br/>
            <em style={{ color: "var(--teal-300)" }}>fin dal primo giorno.</em>
          </h2>
          <p style={{ marginTop: 22, fontFamily: "var(--font-serif)", fontStyle: "italic",
            fontSize: 18, color: "rgba(251,246,236,0.75)", maxWidth: 560, margin: "22px auto 0" }}>
            Verifica in 2 minuti se la tua pratica è gestibile online. Senza impegno, senza carta.
          </p>
          <button className="btn primary lg" onClick={onStart} style={{ marginTop: 36 }}>
            Inizia il quiz <Icon name="arrow-right" size={16}/>
          </button>
          <div className="row gap-3" style={{ marginTop: 26, justifyContent: "center", alignItems: "center",
            fontSize: 13, color: "rgba(251,246,236,0.7)" }}>
            <span style={{ color: "var(--seal-500)", letterSpacing: 2 }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: "var(--paper-50)" }}>4,9 / 5</span>
            <span>· 1.200+ recensioni</span>
          </div>
        </div>
      </section>

      <SiteFooterSlim/>
    </div>
  );
};
