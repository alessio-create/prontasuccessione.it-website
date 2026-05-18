import React, { useState } from "react";
import { Icon, SiteHeaderSlim, SiteFooterSlim } from "./shell";

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
      <text textAnchor="middle" y="-2" fontFamily="Source Serif 4, Georgia, serif" fontSize="11" fontStyle="italic" fill="#fbf6ec">spiegata</text>
      <text textAnchor="middle" y="14" fontFamily="Source Serif 4, Georgia, serif" fontSize="13" fontWeight="600" fill="#fbf6ec">bene</text>
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

const FAQItem = ({ q, a, n, defaultOpen }: { q: string; a: string; n: string; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={"faq-item" + (open ? " open" : "")} style={{ borderTop: "1px solid var(--border-1)" }}>
      <button className="q" onClick={() => setOpen(o => !o)} aria-expanded={open}
        style={{ alignItems: "baseline", gap: 16, padding: "20px 0" }}>
        <span className="serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--teal-700)", width: 32, flexShrink: 0 }}>{n}</span>
        <span style={{ flex: 1, fontWeight: 600 }}>{q}</span>
        <span className="chev"><Icon name="chevron-down" size={18}/></span>
      </button>
      <div className="a"><div><div style={{ paddingLeft: 48, paddingBottom: 16 }}>{a}</div></div></div>
    </div>
  );
};

const FAQ_QUIZ = [
  { q: "Quanto dura davvero il quiz?", a: "Due minuti, in media. Sono cinque domande chiuse: niente dati personali finché non vedi il risultato.", defaultOpen: true },
  { q: "È gratis? C'è qualche impegno?", a: "Completamente gratis, nessun pagamento, nessun obbligo, nessuna carta di credito. Ti diamo solo un orientamento iniziale." },
  { q: "Cosa succede dopo le risposte?", a: "A video ricevi subito stima della tariffa, tempistica realistica, lista dei documenti. Se vuoi, prenoti una chiamata gratuita di trenta minuti." },
  { q: "Posso interrompere e riprendere?", a: "Sì. Le risposte vengono salvate localmente sul dispositivo. Ricarichi la pagina e riparti da dove eri." },
  { q: "I miei dati sono al sicuro?", a: "Le risposte restano sul tuo dispositivo finché non chiedi il riepilogo. Da quel momento le custodiamo su server in Italia ai sensi del GDPR; eliminiamo tutto a fine pratica se ce lo chiedi." },
];

const OUTCOMES: [string, string, string][] = [
  ["I.", "La stima della tariffa", "Sapere prima quanto costa, senza chiamare nessuno. Tariffa fissa, dichiarata in chiaro."],
  ["II.", "Una tempistica realistica", "Quante settimane servono per il tuo caso, dall'inizio fino all'invio in Agenzia."],
  ["III.", "La lista dei documenti", "Cosa procurarti tu, cosa recuperiamo noi. Nessuna sorpresa a metà strada."],
  ["IV.", "Un esperto dedicato che ti chiama", "Trenta minuti gratuiti per chiarire i punti aperti. Persona vera, non un bot."],
];

export const Landing = ({ onStart }: { onStart: () => void }) => {
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
              La tua dichiarazione di successione, spiegata bene.
            </h1>
            <p className="italic-serif mt-4" style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 620 }}>
              Comincia rispondendo a cinque domande. In due minuti ti diciamo cosa serve, quanto costa, e quanto tempo ci vuole.
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

      {/* WHAT YOU GET */}
      <div style={{ background: "var(--paper-200)", padding: "72px 56px" }}>
        <div className="row between wrap" style={{ alignItems: "flex-end", gap: 32 }}>
          <div>
            <span className="eyebrow">Cosa ottieni dal quiz</span>
            <h2 className="serif mt-3" style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: 640 }}>
              Quattro cose chiare, in due minuti.
            </h2>
          </div>
          <p className="italic-serif" style={{ fontSize: 15, maxWidth: 320, color: "var(--fg-2)", lineHeight: 1.55 }}>
            Niente preventivi al buio. Esci dal quiz con un'idea precisa di cosa ti aspetta.
          </p>
        </div>
        <div className="divider-strong mt-8"/>
        {OUTCOMES.map(([n, t, b], i) => (
          <div key={i}>
            <div style={{ paddingTop: 22, paddingBottom: 22 }}>
              <div className="row gap-6" style={{ alignItems: "baseline" }}>
                <span className="serif" style={{ fontSize: 15, fontStyle: "italic", color: "var(--teal-700)", width: 36, flexShrink: 0 }}>{n}</span>
                <div className="flex-1 row gap-8 wrap" style={{ alignItems: "baseline" }}>
                  <p style={{ fontWeight: 600, fontSize: 19, lineHeight: 1.3, flex: "0 0 320px", letterSpacing: "-0.005em", color: "var(--fg-1)" }}>{t}</p>
                  <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, flex: 1 }}>{b}</p>
                </div>
              </div>
            </div>
            {i < OUTCOMES.length - 1 && <div className="divider"/>}
          </div>
        ))}
        <div className="divider-strong"/>
      </div>

      {/* PROBLEM */}
      <div style={{ padding: "88px 56px" }}>
        <div className="row gap-12 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 320px" }}>
            <span className="eyebrow">Il problema di farlo da soli</span>
            <h2 className="serif mt-3" style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.02 }}>
              Stai già attraversando abbastanza.
            </h2>
          </div>
          <div style={{ flex: "1.1 1 320px" }}>
            <p className="italic-serif" style={{ fontSize: 19, lineHeight: 1.65 }}>
              C'è il dolore di una persona che non c'è più. E poi ci sono i moduli, le scadenze, i numeri di protocollo. Le visure catastali, gli uffici da chiamare in orari che non funzionano mai.
            </p>
            <p className="italic-serif mt-4" style={{ fontSize: 19, lineHeight: 1.65 }}>
              Ti chiedono di tenere tutto a mente — codici, allegati, deleghe — proprio quando hai la testa altrove. Ti chiedono precisione mentre stai imparando a vivere senza qualcuno.
            </p>
            <p className="italic-serif mt-4" style={{ fontSize: 19, lineHeight: 1.65 }}>
              Non dovrebbe essere così. Non per chi sta vivendo un lutto.
            </p>
            <blockquote style={{ marginTop: 28, borderLeft: "3px solid var(--teal-700)", paddingLeft: 22, maxWidth: 540 }}>
              <p className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--fg-1)" }}>
                Noi prendiamo in mano la parte burocratica. Tu pensi al resto.
              </p>
            </blockquote>
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

      {/* FAQ */}
      <div style={{ padding: "88px 56px" }}>
        <div className="row gap-10 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "0.85 1 280px" }}>
            <span className="eyebrow">Sul quiz</span>
            <h2 className="serif mt-3" style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              Le domande che ci fanno tutti.
            </h2>
            <p className="italic-serif mt-4" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)" }}>
              Non è un sondaggio. Non è una telefonata mascherata. È un percorso guidato per capirci meglio prima di fare qualsiasi mossa.
            </p>
          </div>
          <div style={{ flex: "1.2 1 320px" }}>
            {FAQ_QUIZ.map((it, i) => (
              <FAQItem key={i} {...it} n={["I.", "II.", "III.", "IV.", "V."][i]}/>
            ))}
            <div style={{ borderTop: "1px solid var(--border-1)" }}/>
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
