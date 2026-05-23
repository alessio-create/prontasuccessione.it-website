import React, { useState, useEffect, useRef } from "react";
import { Icon, SiteHeaderSlim, SiteFooterSlim } from "./shell";

/* ─────────────────────────────────────────── illustrations */

const SchedaIllustration = () => (
  <svg viewBox="0 0 420 460" preserveAspectRatio="xMidYMid meet"
    style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
    <defs>
      <pattern id="lv2-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 L0 0 0 20" fill="none" stroke="#284060" strokeWidth="0.3" opacity="0.18"/>
      </pattern>
    </defs>
    <rect width="420" height="460" fill="url(#lv2-grid)"/>
    <g transform="translate(86 70) rotate(4)">
      <rect width="240" height="320" fill="#fbf6ec" stroke="#284060" strokeWidth="1" opacity="0.55"/>
    </g>
    <g transform="translate(74 58) rotate(-2)">
      <rect width="252" height="336" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
      <text x="20" y="32" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill="#1a7672">MOD. SUC · 2026</text>
      <line x1="20" y1="42" x2="232" y2="42" stroke="#122339" strokeWidth="0.6"/>
      <text x="20" y="68" fontFamily="Source Serif 4, Georgia, serif" fontSize="16" fontWeight="600" fill="#122339">Dichiarazione di</text>
      <text x="20" y="86" fontFamily="Source Serif 4, Georgia, serif" fontSize="16" fontStyle="italic" fill="#1a7672">successione</text>
      {[
        { y: 112, label: "Defunto", vw: 180 },
        { y: 142, label: "Codice fiscale", vw: 140 },
        { y: 172, label: "Data decesso", vw: 100 },
        { y: 202, label: "Eredi", vw: 160 },
        { y: 232, label: "Immobili", vw: 120 },
      ].map((f, i) => (
        <g key={i}>
          <text x="20" y={f.y} fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.5" fill="#284060" opacity="0.7">{f.label.toUpperCase()}</text>
          <line x1="20" y1={f.y + 10} x2={20 + f.vw} y2={f.y + 10} stroke="#122339" strokeWidth="0.6"/>
        </g>
      ))}
      <g transform="translate(20 268)">
        <rect width="10" height="10" fill="none" stroke="#122339" strokeWidth="1"/>
        <polyline points="2,5 4.5,8 9,2" fill="none" stroke="#1a7672" strokeWidth="1.6" strokeLinecap="round"/>
        <text x="18" y="9" fontFamily="Source Serif 4, Georgia, serif" fontSize="10" fill="#122339">testamento allegato</text>
      </g>
      <g transform="translate(20 288)">
        <rect width="10" height="10" fill="none" stroke="#122339" strokeWidth="1"/>
        <polyline points="2,5 4.5,8 9,2" fill="none" stroke="#1a7672" strokeWidth="1.6" strokeLinecap="round"/>
        <text x="18" y="9" fontFamily="Source Serif 4, Georgia, serif" fontSize="10" fill="#122339">volture catastali</text>
      </g>
      <line x1="20" y1="316" x2="120" y2="316" stroke="#122339" strokeWidth="0.6"/>
      <text x="20" y="328" fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="#284060" opacity="0.7">FIRMA</text>
    </g>
    <g transform="translate(310 286)">
      <circle r="44" fill="#1a7672"/>
      <circle r="37" fill="none" stroke="#fbf6ec" strokeWidth="0.8" opacity="0.55"/>
      <text textAnchor="middle" y="-2" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontStyle="italic" fill="#fbf6ec">in 48h</text>
      <text textAnchor="middle" y="14" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontWeight="600" fill="#fbf6ec">online</text>
      <text textAnchor="middle" y="32" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing="1.5" fill="#fbf6ec" opacity="0.7">PS · 2026</text>
    </g>
    <g>
      <path d="M348 130 Q380 110 388 90 Q392 80 384 76 Q372 72 360 90" fill="none" stroke="#8a3a24" strokeWidth="1.4" strokeLinecap="round"/>
      <polyline points="362,90 360,90 366,82" fill="none" stroke="#8a3a24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="278" y="142" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontStyle="italic" fill="#8a3a24">tariffa fissa</text>
    </g>
    <g transform="translate(72 48) rotate(-12)">
      <path d="M0 0 Q0 -8 8 -8 L24 -8 Q32 -8 32 0 L32 22 Q32 28 26 28 Q20 28 20 22 L20 4 Q20 0 16 0 Q12 0 12 4 L12 22"
        fill="none" stroke="#284060" strokeWidth="1.6" strokeLinecap="round"/>
    </g>
    <text x="74" y="430" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#284060" opacity="0.55">
      FIG. 01 · LA SCHEDA, COMPILATA
    </text>
  </svg>
);

/* Problem section — illustrative figures (vertical, with drift) */

const FigStack: React.FC<{ drift?: number }> = ({ drift = 0 }) => (
  <svg viewBox="0 0 220 260" style={{ width: "100%", height: "auto", display: "block",
    transform: `translateY(${drift}px) rotate(-3deg)` }} className="drift" aria-hidden="true">
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
    transform: `translateY(${drift}px)` }} className="drift" aria-hidden="true">
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
    transform: `translateY(${drift}px) rotate(2deg)` }} className="drift" aria-hidden="true">
    {/* desk surface */}
    <line x1="0" y1="210" x2="220" y2="210" stroke="#122339" strokeWidth="1.2"/>
    {/* coffee mug */}
    <g transform="translate(24 150)">
      <path d="M0 0 L48 0 L44 56 Q42 64 32 64 L16 64 Q6 64 4 56 Z" fill="#fbf6ec" stroke="#122339" strokeWidth="1.4"/>
      <path d="M48 14 Q64 14 64 30 Q64 46 48 46" fill="none" stroke="#122339" strokeWidth="1.4"/>
      <path d="M12 -10 Q14 -16 18 -14 M22 -10 Q24 -16 28 -14 M32 -10 Q34 -16 38 -14" stroke="#8a3a24" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </g>
    {/* phone */}
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
    {/* sticky note */}
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

/* ─────────────────────────────────────────── hooks */

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          const all = e.target.querySelectorAll<HTMLElement>(".reveal");
          all.forEach(n => n.classList.add("in"));
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
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

/* ─────────────────────────────────────────── pieces */

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

/* Quiz outcomes (what you receive) */
const QUIZ_OUTCOMES: [string, string, string][] = [
  ["I.", "Stima della tariffa, in chiaro", "Una cifra precisa per il tuo caso — non un range. Tariffa fissa, niente extra a sorpresa."],
  ["II.", "Tempistica realistica", "Quando la dichiarazione è pronta per l'invio, calcolata sui tuoi documenti effettivi."],
  ["III.", "Lista dei documenti su misura", "Cosa procuri tu, cosa recuperiamo noi dagli archivi. Niente \"servirebbe anche…\" a metà strada."],
  ["IV.", "Chiamata gratuita con l'esperto", "Trenta minuti con il commercialista che seguirà il tuo caso. Persona vera, non un call center."],
];

/* What you can do entirely online */
const ONLINE_STEPS: { n: string; t: string; b: string }[] = [
  { n: "01", t: "Carichi i documenti dal telefono", b: "Foto della carta d'identità, codice fiscale, visure. Il resto lo recuperiamo noi dagli archivi pubblici." },
  { n: "02", t: "Firmi tutto con SPID o CIE", b: "Procura, deleghe, modello SUC. Firma digitale legalmente valida, senza stampare nulla, senza appuntamenti." },
  { n: "03", t: "Paghi le imposte con un click", b: "Calcoliamo F24 e imposte ipotecarie/catastali. Paghi online — addebito unico, ricevuta nella tua area." },
  { n: "04", t: "Ricevi protocollo e volture", b: "Trasmissione all'Agenzia delle Entrate, conferma di accettazione, volture catastali. Tutto nella tua casella." },
];

/* Reviews ticker */
const REVIEWS: { stars: number; quote: string; who: string }[] = [
  { stars: 5, quote: "In 48 ore avevo già tutto pronto, senza muovermi da casa.", who: "M. Ferrari · Milano" },
  { stars: 5, quote: "Mi hanno spiegato passo per passo, con pazienza vera.", who: "L. Greco · Napoli" },
  { stars: 5, quote: "Tariffa fissa, nessuna sorpresa. Finalmente.", who: "A. Romano · Torino" },
  { stars: 5, quote: "Pensavo fosse complicato. Mi sbagliavo di grosso.", who: "C. Bianchi · Roma" },
  { stars: 5, quote: "Risposta su Whatsapp in dieci minuti, sempre.", who: "S. Esposito · Bari" },
  { stars: 5, quote: "Ho fatto tutto dal cellulare durante la pausa pranzo.", who: "G. Russo · Bologna" },
  { stars: 5, quote: "Persone competenti, gentili, e — sorpresa — italiane.", who: "P. Marini · Firenze" },
];

const Stars = ({ n }: { n: number }) => (
  <span className="stars" aria-label={`${n} stelle`}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>
);

const Ticker = () => {
  const items = [...REVIEWS, ...REVIEWS];
  return (
    <div style={{ borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)",
      background: "var(--paper-100)", padding: "22px 0" }}>
      <div style={{ padding: "0 56px 14px" }} className="row between wrap" >
        <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <Stars n={5}/> 4,9 / 5 — su oltre 1.200 pratiche concluse
        </span>
        <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Testimonianze · clienti reali
        </span>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          {items.map((r, i) => (
            <span key={i} className="ticker-item">
              <Stars n={r.stars}/>
              <span>"{r.quote}"</span>
              <span className="who">{r.who}</span>
              <span className="ticker-dot"/>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────── page */

export const Landing = ({ onStart }: { onStart: () => void }) => {
  const revealProblem = useReveal();
  const revealSolution = useReveal();
  const revealFaq = useReveal();
  const drift1 = useDrift(0.08);
  const drift2 = useDrift(-0.06);
  const drift3 = useDrift(0.05);

  return (
    <div style={{ background: "var(--bg-page)" }}>
      <SiteHeaderSlim/>

      {/* HERO */}
      <div style={{ padding: "0 56px" }}>
        <div className="divider-strong" style={{ marginTop: 32 }}/>
        <div className="row between" style={{ paddingTop: 16, paddingBottom: 10 }}>
          <span className="eyebrow">Scheda · ProntaSuccessione</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>rif. art. 28 D.Lgs. 346/1990</span>
        </div>
      </div>
      <div style={{ padding: "32px 56px 64px" }}>
        <div className="row wrap" style={{ gap: 56, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <span className="eyebrow">Scheda informativa · v.2026</span>
            <h1 className="serif" style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, marginTop: 18, fontWeight: 600, letterSpacing: "-0.025em", maxWidth: 880 }}>
              La tua dichiarazione di successione, fatta in 48 ore. Tutto online.
            </h1>
            <p className="italic-serif mt-4" style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 620 }}>
              Comincia rispondendo a cinque domande. In due minuti ti diciamo cosa serve, quanto costa, e quando è pronta.
            </p>
            <div className="row gap-3 mt-6 wrap" style={{ alignItems: "center" }}>
              <button className="btn primary lg" onClick={onStart}>
                Inizia il quiz · 2 minuti <Icon name="arrow-right" size={16}/>
              </button>
              <span className="meta">Gratis · senza impegno</span>
            </div>
          </div>
          <div style={{ flex: "1 1 320px", maxWidth: 440 }}>
            <SchedaIllustration/>
          </div>
        </div>
      </div>

      {/* TICKER · reviews */}
      <Ticker/>

      {/* SOLUTION — what the quiz gives you + what you can do online */}
      <div ref={revealSolution} className="reveal" style={{ background: "var(--paper-200)", padding: "88px 56px" }}>
        <div className="row between wrap" style={{ alignItems: "flex-end", gap: 32 }}>
          <div>
            <span className="eyebrow">La soluzione · in due tempi</span>
            <h2 className="serif mt-3" style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 720 }}>
              Prima capisci, poi fai tutto da casa.
            </h2>
          </div>
          <p className="italic-serif" style={{ fontSize: 15, maxWidth: 340, color: "var(--fg-2)", lineHeight: 1.55 }}>
            Il quiz ti dà chiarezza. La piattaforma ti permette di concludere senza mai uscire di casa.
          </p>
        </div>

        {/* part A — what you get from the quiz */}
        <div className="mt-12 reveal reveal-d1">
          <div className="row between center wrap" style={{ gap: 16 }}>
            <span className="pill" style={{ background: "var(--paper-50)", borderColor: "var(--border-3)" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--teal-700)", marginRight: 6 }}>A.</span>
              Dopo il quiz — subito a video
            </span>
            <span className="meta">2 minuti · gratis · niente registrazione</span>
          </div>
          <div className="divider-strong mt-5"/>
          {QUIZ_OUTCOMES.map(([n, t, b], i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${0.08 * i + 0.1}s` }}>
              <div style={{ paddingTop: 22, paddingBottom: 22 }}>
                <div className="row gap-6" style={{ alignItems: "baseline" }}>
                  <span className="serif" style={{ fontSize: 15, fontStyle: "italic", color: "var(--teal-700)", width: 36, flexShrink: 0 }}>{n}</span>
                  <div className="flex-1 row gap-8 wrap" style={{ alignItems: "baseline" }}>
                    <p style={{ fontWeight: 600, fontSize: 19, lineHeight: 1.3, flex: "0 0 320px", letterSpacing: "-0.005em", color: "var(--fg-1)" }}>{t}</p>
                    <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, flex: 1 }}>{b}</p>
                  </div>
                </div>
              </div>
              {i < QUIZ_OUTCOMES.length - 1 && <div className="divider"/>}
            </div>
          ))}
          <div className="divider-strong"/>
        </div>

        {/* part B — what you do entirely online */}
        <div className="mt-12 reveal reveal-d2">
          <div className="row between center wrap" style={{ gap: 16 }}>
            <span className="pill" style={{ background: "var(--teal-100)", borderColor: "var(--teal-300)", color: "var(--teal-700)" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", marginRight: 6 }}>B.</span>
              Se decidi di continuare — tutto online
            </span>
            <span className="meta">SPID / CIE · firma digitale · F24 incluso</span>
          </div>

          <div className="row gap-6 mt-6 wrap" style={{ alignItems: "stretch" }}>
            {ONLINE_STEPS.map((s, i) => (
              <div key={i} className="card reveal" style={{ flex: "1 1 240px", padding: 24, background: "var(--paper-50)",
                position: "relative", transitionDelay: `${0.12 * i + 0.15}s` }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--teal-700)" }}>STEP {s.n}</span>
                <p className="serif mt-3" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, color: "var(--fg-1)" }}>
                  {s.t}
                </p>
                <p className="mt-3" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6 }}>{s.b}</p>
                {i < ONLINE_STEPS.length - 1 && (
                  <span style={{ position: "absolute", right: -14, top: "50%", width: 28, height: 28,
                    borderRadius: 999, background: "var(--paper-200)", border: "1px solid var(--border-2)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-2)",
                    transform: "translateY(-50%)", zIndex: 1 }} aria-hidden="true">
                    <Icon name="arrow-right" size={13}/>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="row gap-3 mt-8 wrap center">
            {["SPID", "CIE", "Firma digitale", "F24 incluso", "Volture catastali", "Trasmissione AdE"].map((t, i) => (
              <span key={i} className="mono" style={{
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-2)",
                padding: "6px 12px", border: "1px solid var(--border-2)", borderRadius: 999, background: "var(--paper-50)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM — with personalised illustrations + vertical drift */}
      <div ref={revealProblem} style={{ padding: "112px 56px", position: "relative", overflow: "hidden" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div className="reveal" style={{ flex: "1 1 360px", position: "sticky", top: 24 }}>
            <span className="eyebrow">Il problema · da soli</span>
            <h2 className="serif mt-3" style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.028em", lineHeight: 1.0 }}>
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

          <div style={{ flex: "1.1 1 360px", display: "flex", flexDirection: "column", gap: 80 }}>
            {/* Figure 1 */}
            <div ref={drift1.ref} className="reveal reveal-d1 row gap-8 wrap" style={{ alignItems: "center" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}>
                <FigStack drift={drift1.y}/>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 01</span>
                <p className="serif mt-2" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, color: "var(--fg-1)" }}>
                  Pile di moduli, e ne manca sempre uno.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Modello SUC, volture catastali, autocertificazioni, deleghe degli altri eredi. Basta che manchi un allegato e l'ufficio rimanda indietro tutto.
                </p>
              </div>
            </div>

            {/* Figure 2 */}
            <div ref={drift2.ref} className="reveal reveal-d2 row gap-8 wrap" style={{ alignItems: "center", flexDirection: "row-reverse" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}>
                <FigClock drift={drift2.y}/>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 02</span>
                <p className="serif mt-2" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, color: "var(--fg-1)" }}>
                  Il termine corre, in silenzio.
                </p>
                <p className="italic-serif mt-3" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  Dodici mesi dalla data del decesso. Sembrano tanti, finché non ti accorgi che metà se ne sono andati ad aspettare appuntamenti, certificati, risposte.
                </p>
              </div>
            </div>

            {/* Figure 3 */}
            <div ref={drift3.ref} className="reveal reveal-d3 row gap-8 wrap" style={{ alignItems: "center" }}>
              <div style={{ flex: "0 0 200px", maxWidth: 220 }}>
                <FigDesk drift={drift3.y}/>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--seal-600)" }}>FIG. 03</span>
                <p className="serif mt-2" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2, color: "var(--fg-1)" }}>
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

      {/* WHY US */}
      <div style={{ background: "var(--paper-300)", padding: "72px 56px" }}>
        <div style={{ maxWidth: 720 }}>
          <span className="eyebrow">Perché noi</span>
          <h2 className="serif mt-3" style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
            Tutto online, ma con una persona vera.
          </h2>
          <p className="italic-serif mt-4" style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 580 }}>
            La comodità del digitale, la sicurezza di un commercialista in carne e ossa. Non devi scegliere fra le due cose.
          </p>
        </div>
        <div className="divider-strong mt-8"/>
        <div className="row wrap" style={{ alignItems: "stretch" }}>
          {[
            ["I.", "Una persona, dall'inizio alla fine", "Un esperto abilitato — dottore commercialista o consulente tributario iscritto all'albo. Lo conoscerai dalla prima chiamata e ti seguirà fino all'invio."],
            ["II.", "Tutto da casa, quando puoi tu", "Niente uffici da raggiungere, niente appuntamenti in orario lavorativo. Carichi i documenti dal telefono, firmi online, ricevi tutto via email."],
            ["III.", "Risposte umane, non risponditori", "Whatsapp, email, telefono — sempre con l'esperto che segue il tuo caso. Mai un call center, mai un bot, mai \"le verifico e le faccio sapere\"."],
          ].map(([n, t, b], i, arr) => (
            <div key={i} style={{
              flex: "1 1 280px", padding: "24px 24px 24px 0",
              borderRight: i < arr.length - 1 ? "1px solid var(--border-2)" : "none",
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <span className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "var(--teal-700)" }}>{n}</span>
              <p className="serif mt-2" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.005em", lineHeight: 1.25, color: "var(--fg-1)" }}>{t}</p>
              <p className="meta mt-3" style={{ lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
        </div>
        <div className="divider-strong mt-2"/>
      </div>

      {/* FAQ — premium */}
      <div ref={revealFaq} className="reveal" style={{ padding: "112px 56px", background: "var(--bg-page)" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "0.85 1 280px", position: "sticky", top: 32 }}>
            <span className="eyebrow">Sul quiz · F.A.Q.</span>
            <h2 className="serif mt-3" style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.028em", lineHeight: 1.0 }}>
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
                <FAQItem key={i} {...it} n={["I.", "II.", "III.", "IV.", "V."][i]}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ background: "var(--paper-500)", padding: "72px 56px", borderTop: "1.5px solid var(--ink-900)" }}>
        <div className="row between center wrap" style={{ gap: 24 }}>
          <div>
            <span className="eyebrow">Pronto?</span>
            <h2 className="serif mt-3" style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 540 }}>
              Inizia ora. Niente di più, niente di meno.
            </h2>
            <p className="italic-serif mt-3" style={{ fontSize: 16 }}>5 domande · 2 minuti · gratis</p>
          </div>
          <button className="btn primary lg" onClick={onStart}>
            Inizia il quiz <Icon name="arrow-right" size={16}/>
          </button>
        </div>
      </div>

      <SiteFooterSlim/>
    </div>
  );
};
