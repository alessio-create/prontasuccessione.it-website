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
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

const useDrift = (factor: number = 0.06) => {
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
        setY((mid - center) * -factor);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [factor]);
  return { ref, y };
};

/* ─────────────────────────────────────────── promo bar */

const PromoBar = () => {
  const items = [
    { a: "1 247", b: "successioni concluse" },
    { a: "4,9 / 5", b: "★ su 1.200+ recensioni" },
    { a: "48 h", b: "tempo medio di consegna" },
    { a: "100% online", b: "spid · firma digitale · F24" },
    { a: "< 1 h", b: "risposta del tuo commercialista" },
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="promo-bar">
      <div className="promo-track">
        {all.map((it, i) => (
          <span key={i}>
            <span className="dot"/>
            <span className="accent">{it.a}</span>
            <span>{it.b}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────── hero illustration (editorial, animated) */

const HeroIllustration: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 460 460" preserveAspectRatio="xMidYMid meet"
    style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
    <defs>
      <pattern id="hero-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M22 0 L0 0 0 22" fill="none" stroke="#284060" strokeWidth="0.3" opacity="0.16"/>
      </pattern>
    </defs>
    <rect width="460" height="460" fill="url(#hero-grid)"/>

    {/* desk surface line */}
    <line x1="0" y1="378" x2="460" y2="378" stroke="#122339" strokeWidth="1" opacity="0.55"
      className="draw" style={{ ["--dl" as string]: "460" }}/>

    {/* laptop */}
    <g transform={`translate(108 168) translate(0 ${drift * 0.6})`}>
      <rect x="0" y="0" width="244" height="156" rx="6" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"
        className="draw" style={{ ["--dl" as string]: "880" }}/>
      <rect x="10" y="10" width="224" height="124" rx="2" fill="#fbf6ec" stroke="#122339" strokeWidth="0.6" opacity="0.7"/>
      <path d="M-22 156 L266 156 L252 178 L-8 178 Z" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"
        className="draw d1" style={{ ["--dl" as string]: "720" }}/>
      <line x1="100" y1="167" x2="144" y2="167" stroke="#122339" strokeWidth="1"/>

      {/* screen content — the form */}
      <g transform="translate(22 22)">
        <text x="0" y="10" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="2" fill="#1a7672">
          MOD. SUC · 2026
        </text>
        <line x1="0" y1="18" x2="200" y2="18" stroke="#122339" strokeWidth="0.5" opacity="0.6"/>
        <text x="0" y="36" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontWeight="600" fill="#122339">
          Dichiarazione di
        </text>
        <text x="0" y="52" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontStyle="italic" fill="#1a7672">
          successione
        </text>
        {[68, 80, 92].map((y, i) => (
          <line key={i} x1="0" y1={y} x2={i === 2 ? 120 : 200} y2={y}
            stroke="#122339" strokeWidth="0.5" opacity="0.5"
            className={`draw d${i + 2}`} style={{ ["--dl" as string]: "210" }}/>
        ))}
        <g transform="translate(0 104)" className="float-y">
          <rect width="10" height="10" fill="none" stroke="#122339" strokeWidth="1"/>
          <polyline points="2,5 4.5,8 9,2" fill="none" stroke="#1a7672" strokeWidth="1.6" strokeLinecap="round"/>
          <text x="16" y="9" fontFamily="Source Serif 4, Georgia, serif" fontSize="9" fill="#122339">pronta per l'invio</text>
        </g>
      </g>
    </g>

    {/* stamp — slow spin, top right */}
    <g transform={`translate(372 110) translate(0 ${drift * -1.1})`} className="tick-pulse">
      <circle r="48" fill="#1a7672"/>
      <circle r="40" fill="none" stroke="#fbf6ec" strokeWidth="0.6" opacity="0.5"/>
      <g className="spin-slow">
        <path id="hero-arc" d="M -34 0 A 34 34 0 1 1 34 0 A 34 34 0 1 1 -34 0" fill="none"/>
        <text fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="3" fill="#fbf6ec" opacity="0.6">
          <textPath href="#hero-arc" startOffset="0">PRONTASUCCESSIONE · 48H · ONLINE · </textPath>
        </text>
      </g>
      <text textAnchor="middle" y="-3" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontStyle="italic" fill="#fbf6ec">in</text>
      <text textAnchor="middle" y="14" fontFamily="Source Serif 4, Georgia, serif" fontSize="18" fontWeight="600" fill="#fbf6ec">48 h</text>
    </g>

    {/* coffee mug, left */}
    <g transform={`translate(28 282) translate(0 ${drift * 0.4})`}>
      <path d="M0 0 L46 0 L42 60 Q40 68 30 68 L16 68 Q6 68 4 60 Z"
        fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"
        className="draw d2" style={{ ["--dl" as string]: "260" }}/>
      <path d="M46 14 Q62 14 62 32 Q62 50 46 50" fill="none" stroke="#122339" strokeWidth="1.4"
        className="draw d3" style={{ ["--dl" as string]: "120" }}/>
      <path d="M10 -10 Q12 -16 16 -14 M20 -10 Q22 -16 26 -14 M30 -10 Q32 -16 36 -14"
        stroke="#8a3a24" strokeWidth="1.2" fill="none" strokeLinecap="round" className="float-y"/>
    </g>

    {/* arrow + handwritten label, top left */}
    <g transform={`translate(0 0) translate(0 ${drift * -0.3})`}>
      <path d="M60 96 Q104 70 156 90" fill="none" stroke="#8a3a24" strokeWidth="1.4" strokeLinecap="round"
        className="draw d2" style={{ ["--dl" as string]: "160" }}/>
      <polyline points="148,84 156,90 150,98" fill="none" stroke="#8a3a24" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round"/>
      <text x="22" y="84" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontStyle="italic" fill="#8a3a24">
        firmi qui, da casa
      </text>
    </g>

    {/* tag — bottom right "tariffa fissa" */}
    <g transform={`translate(338 322) rotate(-6) translate(0 ${drift * 0.5})`}>
      <path d="M0 0 L96 0 L116 22 L96 44 L0 44 Z" fill="#fbf6ec" stroke="#122339" strokeWidth="1.2"
        className="draw d3" style={{ ["--dl" as string]: "320" }}/>
      <circle cx="98" cy="22" r="3" fill="none" stroke="#122339" strokeWidth="1.2"/>
      <text x="14" y="20" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.5" fill="#284060" opacity="0.65">
        TARIFFA
      </text>
      <text x="14" y="36" fontFamily="Source Serif 4, Georgia, serif" fontSize="14" fontWeight="600" fill="#1a7672">
        fissa
      </text>
    </g>

    {/* FIG caption */}
    <text x="22" y="436" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#284060" opacity="0.55">
      FIG. 00 · LA TUA SCRIVANIA, GIOVEDÌ
    </text>
  </svg>
);

/* Problem section illustrations */

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
      const x1 = 110 + Math.cos(a) * 72; const y1 = 120 + Math.sin(a) * 72;
      const x2 = 110 + Math.cos(a) * 66; const y2 = 120 + Math.sin(a) * 66;
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

/* Solution illustration (editorial, animated on reveal) */

const SolutionIllustration = () => (
  <svg viewBox="0 0 360 420" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
    <defs>
      <pattern id="sol-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 L0 0 0 20" fill="none" stroke="#284060" strokeWidth="0.3" opacity="0.12"/>
      </pattern>
    </defs>
    <rect width="360" height="420" fill="url(#sol-grid)"/>
    {/* phone */}
    <g transform="translate(64 36)">
      <rect width="148" height="280" rx="20" fill="#122339"/>
      <rect x="6" y="22" width="136" height="244" rx="4" fill="#fbf6ec"/>
      <rect x="56" y="6" width="36" height="6" rx="3" fill="#fbf6ec" opacity="0.18"/>
      <circle cx="74" cy="276" r="3" fill="#fbf6ec" opacity="0.35"/>
      {/* screen content */}
      <g transform="translate(16 36)">
        <text fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#1a7672">SPID · CARICAMENTO</text>
        <line x1="0" y1="6" x2="104" y2="6" stroke="#122339" strokeWidth="0.4" opacity="0.5"/>
        <text y="24" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontWeight="600" fill="#122339">Documenti</text>
        {[44, 64, 84, 104].map((y, i) => (
          <g key={i} transform={`translate(0 ${y})`} className={i < 3 ? "" : "float-y"}>
            <rect width="104" height="14" fill="none" stroke="#122339" strokeWidth="0.6"/>
            <rect x="2" y="2" width="10" height="10" fill={i < 3 ? "#1a7672" : "none"} stroke={i < 3 ? "#1a7672" : "#122339"} strokeWidth="0.8"/>
            {i < 3 && <polyline points="4,7 6.5,10 10,4" fill="none" stroke="#fbf6ec" strokeWidth="1.4" strokeLinecap="round"/>}
            <line x1="18" y1="8" x2="76" y2="8" stroke="#122339" strokeWidth="0.5" opacity="0.7"/>
          </g>
        ))}
        <g transform="translate(0 138)">
          <rect width="104" height="22" rx="3" fill="#1a7672" className="draw d2" style={{ ["--dl" as string]: "260" }}/>
          <text x="52" y="15" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="600" fill="#fbf6ec">
            Firma con SPID
          </text>
        </g>
        <g transform="translate(0 172)">
          <text fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#284060" opacity="0.65">F24 · ANTEPRIMA</text>
          <line x1="0" y1="8" x2="104" y2="8" stroke="#122339" strokeWidth="0.4" opacity="0.5"/>
          <text x="0" y="24" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontWeight="600" fill="#122339">€ 2 480,00</text>
          <text x="0" y="38" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1" fill="#284060" opacity="0.65">imp. + ipo. + cat.</text>
        </g>
      </g>
    </g>
    {/* stamp PRONTA */}
    <g transform="translate(258 84)" className="tick-pulse">
      <circle r="46" fill="none" stroke="#8a3a24" strokeWidth="1.6"/>
      <circle r="40" fill="none" stroke="#8a3a24" strokeWidth="0.6" opacity="0.6"/>
      <g className="spin-slow">
        <path id="sol-arc" d="M -32 0 A 32 32 0 1 1 32 0 A 32 32 0 1 1 -32 0" fill="none"/>
        <text fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="3" fill="#8a3a24">
          <textPath href="#sol-arc" startOffset="0">PROTOCOLLATA · ADE · 2026 · </textPath>
        </text>
      </g>
      <text textAnchor="middle" y="0" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontStyle="italic" fontWeight="600" fill="#8a3a24">pronta</text>
      <text textAnchor="middle" y="14" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#8a3a24" opacity="0.7">N. 0451</text>
    </g>
    {/* arrows phone → stamp */}
    <g>
      <path d="M226 156 Q252 132 254 110" fill="none" stroke="#284060" strokeWidth="1.2" strokeLinecap="round"
        className="draw d3" style={{ ["--dl" as string]: "110" }}/>
      <polyline points="248,118 254,110 260,118" fill="none" stroke="#284060" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* receipt at bottom */}
    <g transform="translate(216 226)">
      <path d="M0 0 L120 0 L120 142 L108 134 L96 142 L84 134 L72 142 L60 134 L48 142 L36 134 L24 142 L12 134 L0 142 Z"
        fill="#fbf6ec" stroke="#122339" strokeWidth="1.2"
        className="draw d4" style={{ ["--dl" as string]: "560" }}/>
      <text x="10" y="18" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#1a7672">RICEVUTA ADE</text>
      <line x1="10" y1="24" x2="110" y2="24" stroke="#122339" strokeWidth="0.4" opacity="0.5"/>
      {[36, 50, 64, 78, 92].map((y, i) => (
        <line key={i} x1="10" y1={y} x2={10 + (i % 2 ? 88 : 64)} y2={y} stroke="#122339" strokeWidth="0.4" opacity="0.5"/>
      ))}
      <text x="10" y="112" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontStyle="italic" fill="#122339">protocollata.</text>
    </g>
    <text x="22" y="404" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="#284060" opacity="0.55">
      FIG. 02 · DALLA FIRMA AL PROTOCOLLO, SENZA CARTA
    </text>
  </svg>
);

/* ─────────────────────────────────────────── FAQ */

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

const FAQ_QUIZ: { q: string; a: string; meta?: [string, string]; defaultOpen?: boolean }[] = [
  { q: "Quanto dura davvero il quiz?", a: "Due minuti, in media. Sono cinque domande chiuse: niente dati personali finché non vedi il risultato.",
    meta: ["≈ 2 min", "5 domande"], defaultOpen: true },
  { q: "È gratis? C'è qualche impegno?", a: "Completamente gratis, nessun pagamento, nessun obbligo, nessuna carta di credito. Ti diamo solo un orientamento iniziale.",
    meta: ["€ 0", "Senza carta"] },
  { q: "Cosa succede dopo le risposte?", a: "A video ricevi subito stima della tariffa, tempistica realistica, lista dei documenti. Se vuoi, prenoti una chiamata gratuita di trenta minuti.",
    meta: ["Risposta immediata", "Chiamata opzionale · 30′"] },
  { q: "Posso interrompere e riprendere?", a: "Sì. Le risposte vengono salvate localmente sul dispositivo. Ricarichi la pagina e riparti da dove eri.",
    meta: ["Sessione persistente", "Nessun login"] },
  { q: "I miei dati sono al sicuro?", a: "Le risposte restano sul tuo dispositivo finché non chiedi il riepilogo. Da quel momento le custodiamo su server in Italia ai sensi del GDPR; eliminiamo tutto a fine pratica se ce lo chiedi.",
    meta: ["Server in Italia", "Conforme GDPR"] },
];

/* ─────────────────────────────────────────── solution data */

const QUIZ_OUTCOMES = [
  { t: "Stima della tariffa, in chiaro", b: "Una cifra precisa per il tuo caso — non un range. Tariffa fissa, niente extra a sorpresa." },
  { t: "Tempistica realistica", b: "Quando la dichiarazione è pronta per l'invio, calcolata sui tuoi documenti effettivi." },
  { t: "Lista dei documenti su misura", b: "Cosa procuri tu, cosa recuperiamo noi dagli archivi. Niente \"servirebbe anche…\" a metà strada." },
  { t: "Chiamata gratuita con l'esperto", b: "Trenta minuti con il commercialista che seguirà il tuo caso. Persona vera, non un call center." },
];

const ONLINE_STEPS = [
  { n: "01", t: "Carichi i documenti dal telefono", b: "Foto della carta d'identità, codice fiscale, visure. Il resto lo recuperiamo noi dagli archivi pubblici." },
  { n: "02", t: "Firmi tutto con SPID o CIE", b: "Procura, deleghe, modello SUC. Firma digitale legalmente valida, senza stampare nulla, senza appuntamenti." },
  { n: "03", t: "Paghi le imposte con un click", b: "Calcoliamo F24 e imposte ipotecarie/catastali. Paghi online — addebito unico, ricevuta nella tua area." },
  { n: "04", t: "Ricevi protocollo e volture", b: "Trasmissione all'Agenzia delle Entrate, conferma di accettazione, volture catastali. Tutto nella tua casella." },
];

/* ─────────────────────────────────────────── audience portraits */

const Portrait1 = () => (
  <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, color: "var(--teal-700)" }}>
    <circle cx="32" cy="24" r="11" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 58 Q10 40 32 40 Q54 40 54 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M22 22 Q26 18 32 18 Q38 18 42 22" fill="none" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
const Portrait2 = () => (
  <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, color: "var(--teal-700)" }}>
    <circle cx="22" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="42" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 58 Q6 42 22 42 Q38 42 38 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M26 58 Q26 42 42 42 Q58 42 58 58" fill="none" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);
const Portrait3 = () => (
  <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, color: "var(--teal-700)" }}>
    <path d="M14 50 L14 28 L32 14 L50 28 L50 50 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <rect x="20" y="34" width="10" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="34" y="34" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="6" y1="50" x2="58" y2="50" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
const Portrait4 = () => (
  <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, color: "var(--teal-700)" }}>
    <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <ellipse cx="32" cy="32" rx="9" ry="22" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M14 22 Q32 16 50 22" fill="none" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M14 42 Q32 48 50 42" fill="none" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const AUDIENCES = [
  { ill: <Portrait1/>, label: "Erede unico", tag: "Coniuge o figlio/a",
    body: "Stai gestendo tutto da solo. Vuoi un riferimento umano che ti guidi, senza chiamare cinque uffici diversi." },
  { ill: <Portrait2/>, label: "Più eredi coinvolti", tag: "Famiglia allargata",
    body: "Fratelli, coniuge, nipoti. Servono deleghe, firme, accordi. Coordiniamo noi la raccolta dei documenti." },
  { ill: <Portrait3/>, label: "Patrimonio con immobili", tag: "Case · terreni · quote",
    body: "Più immobili, nuda proprietà, volture catastali. Ricostruiamo la storia di ogni bene dagli archivi." },
  { ill: <Portrait4/>, label: "Residenza all'estero", tag: "AIRE · Italia da lontano",
    body: "Vivi fuori, il defunto era residente all'estero. Lavoriamo a distanza, con fuso e firme digitali." },
];

/* ─────────────────────────────────────────── page */

export const Landing = ({ onStart }: { onStart: () => void }) => {
  const heroReveal = useReveal();
  const heroDrift = useDrift(0.05);
  const revealProblem = useReveal();
  const revealSolution = useReveal();
  const revealAud = useReveal();
  const revealFaq = useReveal();
  const revealCta = useReveal();
  const solDrift = useDrift(0.04);
  const drift1 = useDrift(0.08);
  const drift2 = useDrift(-0.06);
  const drift3 = useDrift(0.05);

  return (
    <div style={{ background: "var(--bg-page)" }}>
      <PromoBar/>
      <SiteHeaderSlim/>

      {/* HERO — editorial, animated */}
      <div ref={heroReveal} className="reveal" style={{ padding: "48px 56px 80px" }}>
        <div className="row wrap" style={{ gap: 64, alignItems: "center" }}>
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              Dichiarazione di successione
            </span>
            <h1 className="serif" style={{ fontSize: "clamp(40px, 6.2vw, 76px)", lineHeight: 0.98,
              marginTop: 16, fontWeight: 600, letterSpacing: "-0.032em", color: "var(--fg-1)" }}>
              La tua successione,<br/>
              <em style={{ color: "var(--seal-600)" }}>fatta in 48 ore.</em>
            </h1>
            <p className="italic-serif mt-5" style={{ fontSize: 19, lineHeight: 1.6, maxWidth: 540, color: "var(--fg-2)" }}>
              Cinque domande, due minuti. Ti diciamo cosa serve, quanto costa, quando è pronta — prima ancora di iniziare.
            </p>
            <div className="row gap-3 mt-7 wrap" style={{ alignItems: "center" }}>
              <button className="btn primary lg" onClick={onStart}>
                Inizia il quiz · 2 minuti <Icon name="arrow-right" size={16}/>
              </button>
              <span className="meta">Gratis · senza carta · risposta immediata</span>
            </div>
            <div className="row gap-2 mt-7 wrap">
              <span className="spec"><span className="dot"/>Commercialista dedicato</span>
              <span className="spec warm"><span className="dot"/>Tariffa fissa</span>
              <span className="spec ink"><span className="dot"/>SPID · firma digitale</span>
            </div>
          </div>
          <div ref={heroDrift.ref} style={{ flex: "1 1 380px", maxWidth: 520, position: "relative" }}>
            <HeroIllustration drift={heroDrift.y}/>
          </div>
        </div>
      </div>

      {/* SOLUTION — illustration + steps, animated */}
      <div ref={revealSolution} className="reveal" style={{ background: "var(--paper-200)", padding: "104px 56px",
        borderTop: "1px solid var(--ink-900)" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 360px", minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              La soluzione · in due tempi
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 600,
              letterSpacing: "-0.028em", lineHeight: 1.0 }}>
              Prima capisci,<br/>poi <em style={{ color: "var(--teal-700)" }}>fai tutto da casa.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 460, color: "var(--fg-2)" }}>
              Il quiz ti dà chiarezza. La piattaforma ti permette di concludere senza mai uscire di casa — dalla firma al protocollo.
            </p>
          </div>
          <div ref={solDrift.ref} style={{ flex: "1 1 320px", maxWidth: 420,
            transform: `translateY(${solDrift.y}px)`, transition: "transform .25s linear" }}>
            <SolutionIllustration/>
          </div>
        </div>

        {/* part A — quiz outcomes */}
        <div className="mt-12 reveal reveal-d1">
          <div className="row between center wrap" style={{ gap: 16 }}>
            <span className="spec ink"><span className="dot"/>
              <span><em>A.</em>&nbsp;&nbsp;Dopo il quiz, subito a video</span>
            </span>
            <span className="meta">Gratis · niente registrazione</span>
          </div>
          <div className="row gap-6 mt-6 wrap" style={{ alignItems: "stretch" }}>
            {QUIZ_OUTCOMES.map((s, i) => (
              <div key={i} className="card reveal" style={{ flex: "1 1 220px", padding: "24px 22px",
                background: "var(--paper-50)", transitionDelay: `${0.08 * i + 0.1}s` }}>
                <span style={{ display: "inline-flex", width: 28, height: 28, borderRadius: 999,
                  background: "var(--teal-100)", color: "var(--teal-700)", alignItems: "center",
                  justifyContent: "center", fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontWeight: 600, fontSize: 13 }}>{["a","b","c","d"][i]}</span>
                <p className="serif mt-3" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.005em",
                  lineHeight: 1.3, color: "var(--fg-1)" }}>{s.t}</p>
                <p className="mt-2" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* part B — online steps */}
        <div className="mt-12 reveal reveal-d2">
          <div className="row between center wrap" style={{ gap: 16 }}>
            <span className="spec"><span className="dot"/>
              <span><em>B.</em>&nbsp;&nbsp;Se decidi di continuare, tutto online</span>
            </span>
            <span className="meta">SPID · CIE · F24 incluso</span>
          </div>
          <div className="row gap-6 mt-6 wrap" style={{ alignItems: "stretch" }}>
            {ONLINE_STEPS.map((s, i) => (
              <div key={i} className="step-card reveal" style={{ flex: "1 1 220px",
                transitionDelay: `${0.12 * i + 0.15}s` }}>
                <span className="n">{s.n}</span>
                <p className="serif mt-2" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em",
                  lineHeight: 1.25, color: "var(--fg-1)" }}>{s.t}</p>
                <p className="mt-3" style={{ fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.6 }}>{s.b}</p>
                {i < ONLINE_STEPS.length - 1 && (
                  <span className="arrow"><Icon name="arrow-right" size={13}/></span>
                )}
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="row gap-2 mt-10 wrap center" style={{ justifyContent: "center" }}>
            <span className="spec"><span className="dot"/>SPID livello 2</span>
            <span className="spec"><span className="dot"/>CIE 3.0</span>
            <span className="spec"><span className="dot"/>Firma digitale qualificata</span>
            <span className="spec warm"><span className="dot"/>Server in Italia</span>
            <span className="spec warm"><span className="dot"/>Conforme GDPR</span>
            <span className="spec ink"><span className="dot"/>Trasmissione AdE</span>
          </div>
        </div>
      </div>

      {/* PROBLEM — three figures, drift on scroll */}
      <div ref={revealProblem} className="reveal" style={{ padding: "120px 56px", position: "relative", overflow: "hidden" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div className="reveal" style={{ flex: "1 1 360px", position: "sticky", top: 32 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--seal-600)", textTransform: "uppercase" }}>
              Il problema · da soli
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 0.98 }}>
              Stai già attraversando<br/><em style={{ color: "var(--seal-600)" }}>abbastanza.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 460, color: "var(--fg-2)" }}>
              Tre figure, una storia che riconosci. Scorri.
            </p>
            <div className="divider mt-8 mb-6"/>
            <blockquote style={{ borderLeft: "3px solid var(--teal-700)", paddingLeft: 22, maxWidth: 460 }}>
              <p className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3, color: "var(--fg-1)" }}>
                Noi prendiamo in mano la parte burocratica. Tu pensi al resto.
              </p>
            </blockquote>
          </div>

          <div style={{ flex: "1.1 1 360px", display: "flex", flexDirection: "column", gap: 96 }}>
            <div ref={drift1.ref} className="reveal reveal-d1 row gap-8 wrap" style={{ alignItems: "center" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}><FigStack drift={drift1.y}/></div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 01</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.15, color: "var(--fg-1)" }}>
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
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 02</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.15, color: "var(--fg-1)" }}>
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
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 03</span>
                <p className="serif mt-2" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.15, color: "var(--fg-1)" }}>
                  La testa è già da un'altra parte.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Ti chiedono precisione mentre stai imparando a vivere senza qualcuno. Non dovrebbe essere così — non per chi sta vivendo un lutto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PER CHI È — targeting */}
      <div ref={revealAud} className="reveal" style={{ background: "var(--paper-300)", padding: "104px 56px",
        borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)" }}>
        <div className="row between wrap" style={{ alignItems: "flex-end", gap: 32 }}>
          <div>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              Per chi è ProntaSuccessione
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(34px, 4.2vw, 52px)", fontWeight: 600,
              letterSpacing: "-0.028em", lineHeight: 1.0, maxWidth: 720 }}>
              Quattro situazioni che gestiamo<br/>tutti i giorni.
            </h2>
          </div>
          <p className="italic-serif" style={{ fontSize: 15, maxWidth: 340, color: "var(--fg-2)", lineHeight: 1.55 }}>
            Riconosciti, e capirai subito se è il momento di parlarci.
          </p>
        </div>
        <div className="row gap-6 mt-10 wrap" style={{ alignItems: "stretch" }}>
          {AUDIENCES.map((a, i) => (
            <div key={i} className="aud-card reveal" style={{ flex: "1 1 240px",
              transitionDelay: `${0.08 * i + 0.1}s` }}>
              <div className="ill">{a.ill}</div>
              <p className="serif" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em",
                lineHeight: 1.2, color: "var(--fg-1)" }}>{a.label}</p>
              <p className="mono mt-2" style={{ fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--teal-700)" }}>{a.tag}</p>
              <p className="italic-serif mt-4" style={{ fontSize: 14, lineHeight: 1.65, color: "var(--fg-2)" }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
        <p className="italic-serif tcenter mt-10" style={{ fontSize: 15, color: "var(--fg-2)" }}>
          Non ti riconosci? <button onClick={onStart} style={{ background: "none", border: "none",
            color: "var(--teal-700)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer",
            font: "inherit", fontStyle: "italic" }}>Fai il quiz</button> — capiamo insieme se possiamo aiutarti.
        </p>
      </div>

      {/* FAQ */}
      <div ref={revealFaq} className="reveal" style={{ padding: "112px 56px", background: "var(--bg-page)" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "0.85 1 280px", position: "sticky", top: 32 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              Sul quiz · F.A.Q.
            </span>
            <h2 className="serif mt-3" style={{ fontSize: "clamp(36px, 4.6vw, 56px)", fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 0.98 }}>
              Le domande<br/>che ci fanno<br/><em style={{ color: "var(--teal-700)" }}>tutti.</em>
            </h2>
            <p className="italic-serif mt-5" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: 360 }}>
              Non un sondaggio. Non una telefonata mascherata. Un percorso guidato per capirci meglio, prima di fare qualsiasi mossa.
            </p>
            <div className="divider mt-8 mb-6"/>
            <p className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--fg-3)", textTransform: "uppercase" }}>
              Aggiornate · maggio 2026
            </p>
            <p className="italic-serif mt-3" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, maxWidth: 360 }}>
              Hai una domanda che non trovi qui? <a href="mailto:ciao@prontasuccessione.it" style={{ color: "var(--teal-700)" }}>Scrivici</a>, rispondiamo in giornata.
            </p>
          </div>
          <div style={{ flex: "1.2 1 320px" }}>
            <div className="faq-premium">
              {FAQ_QUIZ.map((it, i) => (
                <FAQItem key={i} {...it} n={["i", "ii", "iii", "iv", "v"][i] + "."}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA — appointment ticket */}
      <div ref={revealCta} className="reveal" style={{ padding: "96px 56px 112px", background: "var(--paper-200)",
        borderTop: "1px solid var(--ink-900)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div className="row between wrap" style={{ gap: 24, marginBottom: 28 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em",
              color: "var(--teal-700)", textTransform: "uppercase" }}>
              Pronto? · Prossimo passo
            </span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em",
              color: "var(--fg-3)", textTransform: "uppercase" }}>
              Cert. N° 0451 / 2026
            </span>
          </div>

          <div className="cta-card">
            <span className="perf top"/>
            <div className="row wrap" style={{ alignItems: "stretch" }}>
              <div style={{ flex: "1.4 1 380px", padding: "48px 44px" }}>
                <h2 className="serif" style={{ fontSize: "clamp(36px, 4.4vw, 52px)", fontWeight: 600,
                  letterSpacing: "-0.028em", lineHeight: 1.0, color: "var(--fg-1)" }}>
                  Cominciamo dal<br/><em style={{ color: "var(--seal-600)" }}>quiz di due minuti.</em>
                </h2>
                <p className="italic-serif mt-4" style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)", maxWidth: 440 }}>
                  Niente da pagare, niente da registrare. Cinque risposte e a video ricevi tariffa, tempi e cosa serve. Decidi tu se andare avanti.
                </p>
                <button className="btn primary lg mt-7" onClick={onStart}>
                  Inizia il quiz · 2 minuti <Icon name="arrow-right" size={16}/>
                </button>
                <div className="row gap-4 mt-5 wrap">
                  <span className="meta">⏱ ≈ 2 minuti</span>
                  <span className="meta">· Gratis</span>
                  <span className="meta">· Senza carta</span>
                  <span className="meta">· Salvi e riprendi</span>
                </div>
              </div>

              <div style={{ flex: "1 1 280px", padding: "48px 44px", background: "var(--paper-100)",
                borderLeft: "1.5px dashed var(--border-3)", position: "relative" }}>
                <div className="row between center" style={{ marginBottom: 22 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.16em",
                    color: "var(--fg-3)", textTransform: "uppercase" }}>Promemoria</span>
                  <span className="stamp" style={{ width: 64, height: 64, fontSize: 9, transform: "rotate(-10deg)" }}>
                    in 48h<br/>online
                  </span>
                </div>
                {[
                  ["Quiz", "≈ 2 min · gratis"],
                  ["Risultato a video", "Subito dopo le risposte"],
                  ["Chiamata con esperto", "Facoltativa · 30 min · gratis"],
                  ["Pratica completa", "48 ore lavorative"],
                ].map(([k, v], i) => (
                  <div key={i} className="row between" style={{ padding: "12px 0",
                    borderBottom: i < 3 ? "1px solid var(--border-1)" : "none", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-1)" }}>{k}</span>
                    <span className="italic-serif" style={{ fontSize: 13, color: "var(--fg-2)" }}>{v}</span>
                  </div>
                ))}
                <p className="italic-serif mt-5" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--fg-2)" }}>
                  "Mezz'ora basta per chiarire i punti aperti. Senza vincoli." — <span style={{ color: "var(--fg-1)" }}>Giulia, esperta successioni</span>
                </p>
              </div>
            </div>
            <span className="perf bot"/>
          </div>
        </div>
      </div>

      <SiteFooterSlim/>
    </div>
  );
};
