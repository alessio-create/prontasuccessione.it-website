import React, { useState, useEffect, useRef } from "react";
import { Icon, SiteHeaderSlim, SiteFooterSlim } from "./shell";
import { ChatRail, type Contact } from "./ChatRail";
import type { Answers } from "./Quiz";
import giuliaPortrait from "@/assets/giulia-portrait.jpg";




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

/* ─────────────────────────────────────────── SOLUTION illustration (custom, drifts) */

const FigSolution: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 360 380" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
    {/* back paper */}
    <g style={{ transform: `translateY(${r3(drift * 0.4)}px) rotate(-4deg)`, transformOrigin: "180px 200px" }}>
      <rect x="58" y="56" width="200" height="260" fill="#f4ecdc" stroke="#122339" strokeWidth="1" opacity="0.85"/>
    </g>
    {/* main folder */}
    <g style={{ transform: `translateY(${r3(drift * -0.5)}px)`, transformOrigin: "180px 200px" }}>
      <rect x="72" y="44" width="216" height="276" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
      <rect x="72" y="44" width="216" height="34" fill="#1a7672"/>
      <text x="86" y="66" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2.2" fill="#fbf6ec">
        DICHIARAZIONE · SUC · 2026
      </text>
      <g transform="translate(244 122) rotate(-12)">
        <circle r="34" fill="none" stroke="#8a3a24" strokeWidth="1.6" opacity="0.9"/>
        <circle r="28" fill="none" stroke="#8a3a24" strokeWidth="0.6" opacity="0.7"/>
        <text textAnchor="middle" y="-4" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.6" fill="#8a3a24">APPROVATA</text>
        <text textAnchor="middle" y="10" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="14" fill="#8a3a24" fontWeight="700">24-48h</text>
      </g>
      {[110, 138, 166, 194, 222].map((y, i) => (
        <g key={i}>
          <rect x="92" y={y} width="14" height="14" fill="none" stroke="#1a7672" strokeWidth="1.4"/>
          <path className={`draw d${(i % 4) + 1}`} style={{ ["--dl" as any]: 24 }}
            d={`M 94 ${y + 7} L 99 ${y + 12} L 104 ${y + 3}`}
            fill="none" stroke="#1a7672" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="116" y1={y + 7} x2={116 + (i % 2 ? 110 : 90)} y2={y + 7} stroke="#122339" strokeWidth="0.6" opacity="0.45"/>
          <line x1="116" y1={y + 12} x2={116 + (i % 2 ? 70 : 100)} y2={y + 12} stroke="#122339" strokeWidth="0.6" opacity="0.3"/>
        </g>
      ))}
      <g transform="translate(92 258)">
        <text fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.4" fill="#284060" opacity="0.7">FIRMA DIGITALE</text>
        <path className="draw d3" style={{ ["--dl" as any]: 180 }}
          d="M0 20 C 14 6, 28 30, 44 14 S 78 26, 96 12 S 130 22, 160 10"
          fill="none" stroke="#122339" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="0" y1="38" x2="184" y2="38" stroke="#122339" strokeWidth="0.6" opacity="0.5"/>
      </g>
    </g>
    {/* floating 48h chip */}
    <g style={{ transform: `translateY(${r3(drift * 0.7)}px)`, transformOrigin: "76px 277px" }}>
      <g className="float-y">
        <rect x="14" y="256" width="132" height="42" rx="10" fill="#1a7672" stroke="#122339" strokeWidth="1.2"/>
        <text x="28" y="273" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2" fill="#fbf6ec">PRONTA IN</text>
        <text x="28" y="291" fontFamily="Fraunces, Georgia, serif" fontSize="16" fontStyle="italic" fontWeight="700" fill="#fbf6ec">24 ore</text>
        <circle cx="132" cy="277" r="4" fill="#c25a3e"/>
      </g>
    </g>

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
  { t: "Tariffa fissa, dichiarata prima", b: "Sai quanto spendi prima di iniziare. Zero sorprese." },
  { t: "Un commercialista dedicato", b: "Chat e telefono. Risposte in giornata, anche sabato." },
  { t: "Tutto online, davvero", b: "SPID, firma digitale, F24. Niente carta, niente uffici." },
  { t: "Pratica conclusa in 48 ore", b: "Protocollo Agenzia delle Entrate. Senza muoverti da casa." },
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
    body: "Gestisci tutto da solo. Vuoi un riferimento umano, non cinque uffici.",
    ill: <Portrait1/> },
  { label: "Più eredi coinvolti", tag: "Famiglia allargata",
    body: "Deleghe, firme, accordi. La raccolta dei documenti la coordiniamo noi.",
    ill: <Portrait2/> },
  { label: "Patrimonio con immobili", tag: "Case · terreni · quote",
    body: "Volture catastali e nuda proprietà. Ricostruiamo ogni bene dagli archivi.",
    ill: <Portrait3/> },
];


const FAQS: { q: string; a: string; meta?: [string, string]; defaultOpen?: boolean }[] = [
  { q: "Quanto dura davvero il quiz?", a: "Pochissimi istanti. In 30 secondi ti diciamo cosa serve, quanto costa e quando è pronta la tua pratica.",
    meta: ["≈ 30 sec", "5 domande"], defaultOpen: true },
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
            <span className="who">{r.a} - {r.who}</span>
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

export const Landing = ({ onStart, onChatComplete }: {
  onStart: () => void;
  onChatComplete: (a: Answers, c: Contact) => void;
}) => {
  const heroDrift = useDrift(0.04);
  const revealProblem = useReveal();
  const revealSolution = useReveal();
  const revealAud = useReveal();
  const revealFaq = useReveal();
  const revealCta = useReveal();
  const drift1 = useDrift(0.08);
  const drift2 = useDrift(-0.06);
  const drift3 = useDrift(0.05);
  const driftSol = useDrift(0.06);
  const row1 = useReveal();
  const row2 = useReveal();
  const row3 = useReveal();

  const focusChat = () => {
    const el = document.getElementById("chat-section");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.animate(
      [{ boxShadow: "0 0 0 0 rgba(26,118,114,0)" },
       { boxShadow: "0 0 0 10px rgba(26,118,114,0.28)" },
       { boxShadow: "0 0 0 0 rgba(26,118,114,0)" }],
      { duration: 900, easing: "ease-out" }
    );
  };

  return (
    <div style={{ background: "var(--bg-page)" }}>
      <style>{`
        @keyframes giulia-fab-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(26,118,114,0.45), 0 12px 28px rgba(18,35,57,0.25); }
          70%  { box-shadow: 0 0 0 18px rgba(26,118,114,0), 0 12px 28px rgba(18,35,57,0.25); }
          100% { box-shadow: 0 0 0 0 rgba(26,118,114,0), 0 12px 28px rgba(18,35,57,0.25); }
        }
        .giulia-fab {
          position: fixed; right: 22px; bottom: 22px; z-index: 60;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 10px 18px 10px 10px; border-radius: 999px; border: none; cursor: pointer;
          background: var(--ink-900, #122339); color: #fbf6ec;
          font-family: var(--font-sans, Inter, system-ui, sans-serif); font-size: 14px; font-weight: 600;
          animation: giulia-fab-pulse 2.4s infinite;
        }
        .giulia-fab .avatar {
          width: 40px; height: 40px; border-radius: 50%;
          object-fit: cover; display: block;
          border: 2px solid #fbf6ec;
        }

        @media (max-width: 760px) {
          .problem-section .problem-intro { position: static !important; top: auto !important; }
          .problem-section .row.gap-12 { gap: 32px !important; }
          .problem-section .row.gap-8 { gap: 18px !important; }

          /* FAQ section: kill sticky, tighten paddings, smaller type */
          .faq-section { padding: 64px 20px !important; }
          .faq-section .faq-intro { position: static !important; top: auto !important; }
          .faq-section .row.gap-12 { gap: 28px !important; }
          .faq-section h2 { font-size: clamp(30px, 8vw, 40px) !important; }
          .faq-premium .faq-item .q {
            padding: 20px 14px 20px 16px !important;
            gap: 12px !important;
            font-size: 16px !important;
            line-height: 1.3 !important;
            align-items: flex-start !important;
          }
          .faq-premium .faq-item .q .num {
            font-size: 12px !important; width: 18px !important;
          }
          .faq-premium .faq-item .q .chev {
            width: 28px !important; height: 28px !important;
          }
          .faq-premium .faq-item .a-inner {
            padding: 0 16px 20px 46px !important; font-size: 15px !important;
          }
          .faq-premium .faq-item .a-meta {
            padding: 0 16px 18px 46px !important; flex-wrap: wrap;
          }

          /* Final CTA: shrink to readable mobile card */
          .cta-section { padding: 64px 16px 88px !important; }
          .cta-card { padding: 40px 22px 36px !important; border-radius: 6px !important; }
          .cta-card h2 {
            font-size: clamp(28px, 8.4vw, 38px) !important;
            line-height: 1.05 !important;
            letter-spacing: -0.02em !important;
          }
          .cta-card h2 br { display: none; }
          .cta-card .cta-sub { font-size: 16px !important; margin-top: 16px !important; }
          .cta-card .btn.lg { width: 100%; justify-content: center; }

          /* Floating Giulia FAB: bigger portrait, clearer label */
          .giulia-fab { right: 14px !important; bottom: 14px !important;
            padding: 8px 16px 8px 8px !important; font-size: 13px !important; }
          .giulia-fab .avatar { width: 44px !important; height: 44px !important; }

          /* Hero stats: stack neatly */
          .hero-stats { gap: 14px !important; }
          .hero-stats > span:nth-child(even) { display: none; }
        }
      `}</style>
      <SiteHeaderSlim/>
      <main style={{ minWidth: 0 }}>




      {/* HERO - light, editorial, text-forward (fits in viewport) */}
      <section style={{ position: "relative", background: "var(--paper-100)", color: "var(--fg-1)",
        overflow: "hidden", padding: "clamp(24px, 5vh, 64px) clamp(20px, 4vw, 56px) clamp(24px, 4vh, 56px)",
        borderBottom: "1px solid var(--border-1)",
        minHeight: "calc(100svh - 56px)", display: "flex", alignItems: "center" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(900px 600px at 50% -10%, rgba(26,118,114,0.10), transparent 60%)," +
            "radial-gradient(700px 500px at 90% 110%, rgba(138,58,36,0.07), transparent 60%)" }}/>
        <div ref={heroDrift.ref} style={{ position: "relative", maxWidth: 1100, margin: "0 auto", textAlign: "center", width: "100%" }}>
          <span className="mono" style={{ fontSize: "clamp(10px, 1.1vw, 11px)", letterSpacing: "0.22em",
            color: "var(--teal-700)", textTransform: "uppercase" }}>
            100% ONLINE IN 24H
          </span>
          <h1 className="display" style={{ fontSize: "clamp(36px, 6.4vw, 88px)", lineHeight: 1.0,
            marginTop: "clamp(12px, 1.6vh, 18px)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--fg-1)" }}>
            Vuoi Inviare La Tua<br/>
            <em style={{ color: "var(--teal-700)", fontWeight: 700, fontStyle: "italic" }}>
              Dischiarazione di Successione?
            </em>
          </h1>

          <p style={{ marginTop: "clamp(14px, 2vh, 22px)", fontSize: "clamp(15px, 1.7vw, 19px)", lineHeight: 1.5,
            maxWidth: 680, marginLeft: "auto", marginRight: "auto",
            color: "var(--fg-2)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            In 30 secondi ti diciamo cosa serve, quanto costa e quando è pronta. 
            Se arrivi fino alla fine ottieni una consulenza gratuita. Fai La Dichiarazione di Successione.
          </p>

          <div className="row gap-3 wrap" style={{ alignItems: "center", justifyContent: "center", marginTop: "clamp(18px, 2.6vh, 30px)" }}>
            <button className="btn primary lg" onClick={focusChat}>
              Fai Il Quiz <Icon name="arrow-right" size={16}/>
            </button>
          </div>

          <div className="row gap-6 wrap" style={{ marginTop: "clamp(22px, 3vh, 38px)", alignItems: "center", justifyContent: "center" }}>
            <div className="row gap-2" style={{ alignItems: "center" }}>
              <span style={{ color: "var(--seal-500)", letterSpacing: 2, fontSize: 14 }}>★★★★★</span>
              <span style={{ fontSize: 13, color: "var(--fg-1)", fontWeight: 600 }}>4,9 / 5</span>
              <span style={{ fontSize: 12, color: "var(--fg-3)" }}>· 1.200+ recensioni</span>
            </div>
            <span style={{ width: 1, height: 18, background: "var(--border-2)" }}/>
            <div className="row gap-2" style={{ alignItems: "center" }}>
              <span className="display" style={{ fontWeight: 700, fontSize: 20, color: "var(--fg-1)" }}>
                1.247
              </span>
              <span style={{ fontSize: 12, color: "var(--fg-3)" }}>successioni concluse</span>
            </div>
            <span style={{ width: 1, height: 18, background: "var(--border-2)" }}/>
            <div className="row gap-2" style={{ alignItems: "center" }}>
              <span className="display" style={{ fontWeight: 700, fontSize: 20, color: "var(--fg-1)" }}>48h</span>
              <span style={{ fontSize: 12, color: "var(--fg-3)" }}>tempo medio · 100% online</span>
            </div>
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

          <div ref={driftSol.ref} style={{ flex: "1 1 320px", maxWidth: 480, textAlign: "center" }}>
            <FigSolution drift={driftSol.y}/>
            <h3 className="display" style={{ marginTop: 24, fontSize: 22, fontWeight: 600, color: "var(--fg-1)",
              fontStyle: "italic", letterSpacing: "-0.012em" }}>
              Sicuro che la tua pratica sia davvero a posto?
            </h3>
            <div className="row gap-3 wrap" style={{ marginTop: 22, justifyContent: "center" }}>
              <button className="btn primary" onClick={focusChat}>
                Mettici alla prova <Icon name="arrow-right" size={14}/>
              </button>
              <button className="btn" onClick={focusChat}>
                Sì, ma voglio essere sicuro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM - keeps the figures the user likes */}
      <section ref={revealProblem} className="problem-section" style={{ padding: "clamp(56px, 10vw, 120px) clamp(20px, 4vw, 56px)", position: "relative",
        overflow: "hidden", background: "var(--paper-200)", borderTop: "1px solid var(--ink-900)" }}>
        <div className="row gap-12 wrap" style={{ maxWidth: 1240, margin: "0 auto", alignItems: "flex-start" }}>
          <div className="reveal problem-intro" style={{ flex: "1 1 360px", position: "sticky", top: 32 }}>

            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em",
              color: "var(--teal-700)", textTransform: "uppercase", fontWeight: 500 }}>
              Analisi del Percorso
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              Stai già attraversando<br/><em style={{ color: "var(--seal-600)" }}>abbastanza.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 460, color: "var(--fg-2)" }}>
              Tre figure, una storia che riconosci.
            </p>

            <div style={{ marginTop: 36, borderTop: "1px solid var(--border-1)" }}>
              {[
                { idx: "01. uffici", num: "7", suffix: null, body: "uffici diversi, in media, prima di arrivare al ", hl: "protocollo" },
                { idx: "02. tempo", num: "12", suffix: "mesi", body: "il termine di legge — e ogni rinvio costa ", hl: "interessi" },
                { idx: "03. criticità", num: "1", suffix: null, body: "errore basta per far ripartire ", hl: "tutto da capo" },
              ].map((s, i) => (
                <div key={i} className="ledger-row" style={{ display: "grid",
                  gridTemplateColumns: "minmax(120px, 160px) 1fr", gap: 24, padding: "32px 0",
                  borderBottom: "1px solid var(--border-1)", alignItems: "start" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="mono" style={{ color: "color-mix(in oklab, var(--fg-1) 40%, transparent)",
                      fontSize: 11, marginBottom: 8 }}>{s.idx}</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span className="serif" style={{ fontSize: "clamp(56px, 7vw, 88px)", fontWeight: 700,
                        lineHeight: 1, color: "var(--seal-500)", marginLeft: -2 }}>{s.num}</span>
                      {s.suffix && (
                        <span className="serif" style={{ fontSize: 22, fontStyle: "italic", fontWeight: 600,
                          color: "var(--seal-500)" }}>{s.suffix}</span>
                      )}
                    </div>
                  </div>
                  <p className="serif" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.55,
                    color: "var(--fg-1)", paddingTop: 8, margin: 0 }}>
                    {s.body}
                    <span style={{ fontStyle: "italic", fontWeight: 500,
                      textDecoration: "underline", textDecorationColor: "color-mix(in oklab, var(--seal-500) 35%, transparent)",
                      textUnderlineOffset: 6 }}>{s.hl}</span>
                  </p>
                </div>
              ))}
            </div>

            <div style={{ position: "relative", marginTop: 40, padding: "clamp(28px, 4vw, 48px)",
              background: "var(--ink-900)", overflow: "hidden", borderRadius: 2 }}>
              <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160,
                background: "color-mix(in oklab, var(--teal-700) 30%, transparent)",
                filter: "blur(60px)", borderRadius: "50%" }}/>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ width: 48, height: 1, background: "var(--seal-500)" }}/>
                <p className="serif" style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.15,
                  color: "var(--paper-100)", fontWeight: 300, margin: 0 }}>
                  Noi prendiamo in mano la parte burocratica.{" "}
                  <em style={{ fontStyle: "italic", color: "var(--seal-500)", fontWeight: 500 }}>
                    Tu pensi al resto.
                  </em>
                </p>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "color-mix(in oklab, var(--paper-100) 40%, transparent)" }}>
                  Impegno Garantito · Gestione Pratiche
                </div>
              </div>
            </div>

          </div>


          <div style={{ flex: "1.1 1 360px", display: "flex", flexDirection: "column", gap: 96 }}>
            <div ref={(el) => { (drift1.ref as any).current = el; (row1 as any).current = el; }}
                 className="row gap-8 wrap" style={{ alignItems: "center" }}>
              <div className="reveal slide-l" style={{ flex: "0 0 200px", maxWidth: 220 }}><FigStack drift={drift1.y}/></div>
              <div className="reveal slide-r reveal-d1" style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 01</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  Pile di moduli, e ne manca sempre uno.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Manca un allegato, l'ufficio ti rimanda indietro tutto.
                </p>

              </div>
            </div>

            <div ref={(el) => { (drift2.ref as any).current = el; (row2 as any).current = el; }}
                 className="row gap-8 wrap" style={{ alignItems: "center", flexDirection: "row-reverse" }}>
              <div className="reveal slide-r" style={{ flex: "0 0 200px", maxWidth: 220 }}><FigClock drift={drift2.y}/></div>
              <div className="reveal slide-l reveal-d1" style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 02</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  Il termine corre, in silenzio.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Dodici mesi dal decesso. Metà se ne vanno in attese e appuntamenti.
                </p>
              </div>
            </div>

            <div ref={(el) => { (drift3.ref as any).current = el; (row3 as any).current = el; }}
                 className="row gap-8 wrap" style={{ alignItems: "center" }}>
              <div className="reveal slide-l" style={{ flex: "0 0 200px", maxWidth: 220 }}><FigDesk drift={drift3.y}/></div>
              <div className="reveal slide-r reveal-d1" style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--seal-600)" }}>FIG. 03</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em",
                  lineHeight: 1.15, color: "var(--fg-1)" }}>
                  La testa è già da un'altra parte.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Ti chiedono precisione mentre stai imparando a vivere senza qualcuno.
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
            <button className="btn primary lg" onClick={focusChat}>
              Mettici alla prova <Icon name="arrow-right" size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={revealFaq} className="reveal faq-section" style={{ padding: "112px 56px", background: "var(--bg-page)" }}>
        <div className="row gap-12 wrap" style={{ maxWidth: 1240, margin: "0 auto", alignItems: "flex-start" }}>
          <div className="faq-intro" style={{ flex: "0.85 1 280px", position: "sticky", top: 32 }}>
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

      {/* FINAL CTA - appointment card */}
      <section ref={revealCta} className="reveal" style={{ padding: "120px 56px 140px",
        background: "var(--paper-200)", color: "var(--fg-1)", borderTop: "1px solid var(--border-2)",
        position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(800px 500px at 15% 0%, rgba(26,118,114,0.10), transparent 60%)," +
            "radial-gradient(700px 500px at 100% 100%, rgba(138,58,36,0.08), transparent 60%)" }}/>
        <div className="cta-card" style={{ maxWidth: 880, margin: "0 auto", padding: "72px 56px 64px",
          position: "relative", textAlign: "center" }}>
          <div className="perf top"/>
          <div className="perf bot"/>

          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              ✦ Prossimo passo · senza impegno
            </span>
            <h2 className="display" style={{ marginTop: 18, fontSize: "clamp(40px, 5.6vw, 68px)", fontWeight: 700,
              letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--fg-1)" }}>
              La serenità che avresti dovuto avere<br/>
              <em style={{ color: "var(--teal-700)", fontStyle: "italic", fontWeight: 700 }}>
                fin dal primo giorno.
              </em>
            </h2>
            <p style={{ marginTop: 22, fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: 19, color: "var(--fg-2)", maxWidth: 560, margin: "22px auto 0", lineHeight: 1.55 }}>
              Tariffa, tempi e documenti - prima ancora di iniziare.

            </p>
          </div>

          <div className="col" style={{ alignItems: "center", gap: 12, marginTop: 36 }}>
            <button className="btn primary lg" onClick={focusChat}>
              Mettici alla prova <Icon name="arrow-right" size={16}/>
            </button>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em",
              color: "var(--fg-3)", textTransform: "uppercase" }}>
              € 0 · senza carta · 30 sec
            </span>
          </div>

          <div className="divider" style={{ margin: "40px auto 28px", height: 1,
            background: "var(--border-2)", maxWidth: 320 }}/>

          <div className="row gap-5 wrap" style={{ alignItems: "center", justifyContent: "center" }}>
            <div className="col" style={{ gap: 2, alignItems: "center" }}>
              <span style={{ color: "var(--seal-500)", letterSpacing: 2, fontSize: 13 }}>★★★★★</span>
              <span style={{ fontSize: 11, color: "var(--fg-3)" }}>4,9 / 5 · 1.200+ recensioni</span>
            </div>
            <span style={{ width: 1, height: 28, background: "var(--border-2)" }}/>
            <div className="col" style={{ gap: 2, alignItems: "center" }}>
              <span className="display" style={{ fontWeight: 700, fontSize: 18, color: "var(--fg-1)" }}>1.247</span>
              <span style={{ fontSize: 11, color: "var(--fg-3)" }}>successioni concluse</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT SECTION - Giulia at the bottom */}
      <section id="chat-section" style={{ padding: "80px 24px 120px", background: "var(--paper-100)",
        borderTop: "1px solid var(--border-1)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", marginBottom: 28 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em",
            color: "var(--teal-700)", textTransform: "uppercase" }}>
            ✦ Parla con Giulia
          </span>
          <h2 className="serif mt-3" style={{ fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 600,
            letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Cinque domande, <em style={{ color: "var(--teal-700)" }}>il tuo piano personalizzato.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", height: "min(680px, 80vh)",
          boxShadow: "0 24px 60px rgba(18,35,57,0.12)", borderRadius: 18, overflow: "hidden",
          border: "1px solid var(--border-1)" }}>
          <ChatRail onComplete={onChatComplete}/>
        </div>
      </section>
      </main>

      <button className="giulia-fab" onClick={focusChat} aria-label="Apri chat con Giulia">
        <img src={giuliaPortrait} alt="Giulia" className="avatar" width={40} height={40} loading="lazy"/>
        <span>Chatta con Giulia →</span>
      </button>


      <SiteFooterSlim/>

    </div>
  );
};

