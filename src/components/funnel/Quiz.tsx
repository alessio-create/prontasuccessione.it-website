import React, { useState, useEffect, useRef } from "react";
import { Icon, Logo, Avatar, SiteFooterSlim } from "./shell";

export type Answers = Record<string, string>;

export const QUIZ = [
  {
    id: "parentela", label: "Parentela",
    expert: "Per cominciare, qual è il tuo grado di parentela con il defunto?",
    options: [
      { v: "coniuge", t: "Coniuge" },
      { v: "figlio", t: "Figlio o figlia" },
      { v: "genitore", t: "Genitore" },
      { v: "fratello", t: "Fratello o sorella" },
      { v: "altro", t: "Altro parente" },
    ],
    ack: (v: string) => {
      if (v === "coniuge") return "Capisco. Mi dispiace molto per la tua perdita.";
      if (v === "figlio") return "Capisco, mi dispiace molto.";
      if (v === "genitore") return "Mi dispiace. È un caso che gestisco spesso, ti accompagno io.";
      return "Va bene, possiamo procedere insieme.";
    },
  },
  {
    id: "tempistica", label: "Tempistica",
    expert: "Quando è avvenuto il decesso? Anche solo il mese va bene.",
    options: [
      { v: "recente", t: "Meno di 30 giorni fa" },
      { v: "medio", t: "Tra 1 e 6 mesi fa" },
      { v: "avanzato", t: "Tra 6 e 11 mesi fa" },
      { v: "oltre", t: "Oltre 12 mesi fa" },
    ],
    ack: (v: string) => {
      if (v === "recente") return "Hai tutto il tempo per organizzarti con calma.";
      if (v === "medio") return "È un buon momento per iniziare. Niente fretta.";
      if (v === "avanzato") return "Va bene - abbiamo ancora margine, ma conviene partire ora.";
      return "Possiamo gestire anche dichiarazioni tardive. Te lo spiego al telefono.";
    },
  },
  {
    id: "immobili", label: "Patrimonio",
    expert: "Il defunto possedeva immobili - case, terreni, anche solo quote?",
    options: [
      { v: "uno", t: "Sì, un solo immobile" },
      { v: "piu", t: "Sì, più immobili" },
      { v: "quote", t: "Solo quote o nuda proprietà" },
      { v: "nessuno", t: "No, nessun immobile" },
      { v: "nonso", t: "Non lo so" },
    ],
    ack: (v: string) => {
      if (v === "piu") return "Va bene. Lo gestiamo regolarmente.";
      if (v === "quote") return "Capisco, le quote sono comuni. Le tracciamo insieme.";
      if (v === "nessuno") return "Bene. Senza immobili la pratica è più snella.";
      if (v === "nonso") return "Nessun problema, possiamo verificarlo dagli archivi.";
      return "Perfetto.";
    },
  },
  {
    id: "testamento", label: "Documenti",
    expert: "Esiste un testamento? Anche scritto a mano va considerato.",
    options: [
      { v: "pubblico", t: "Sì, testamento pubblico (notarile)" },
      { v: "olografo", t: "Sì, testamento olografo (a mano)" },
      { v: "no", t: "No, non c'è testamento" },
      { v: "nonso", t: "Non lo so" },
    ],
    ack: (v: string) => {
      if (v === "olografo") return "Va bene. Andrà pubblicato dal notaio prima della successione.";
      if (v === "pubblico") return "Comodo - il notaio ne ha già copia.";
      if (v === "no") return "Procediamo per successione legittima, allora.";
      return "Va bene, lo verificheremo insieme.";
    },
  },
  {
    id: "regione", label: "Regione",
    expert: "Ultima domanda: in che regione viveva il defunto?",
    options: [
      { v: "lombardia", t: "Lombardia" },
      { v: "lazio", t: "Lazio" },
      { v: "campania", t: "Campania" },
      { v: "altro-it", t: "Altra regione italiana" },
      { v: "estero", t: "Risiedeva all'estero" },
    ],
    ack: () => "Perfetto. Ti preparo il piano.",
  },
];

const Bubble = ({ from, children, style, showAvatar = false }: { from: "us" | "them"; children: React.ReactNode; style?: React.CSSProperties; showAvatar?: boolean }) => {
  if (from === "us") {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", alignSelf: "flex-start", maxWidth: "82%", ...style }}>
        <div style={{ width: 28, flexShrink: 0 }}>
          {showAvatar && (
            <span style={{
              width: 28, height: 28, borderRadius: 999,
              background: "linear-gradient(155deg, var(--paper-500) 0%, var(--seal-600) 60%, var(--seal-700) 100%)",
              fontSize: 10, color: "#fbf6ec", fontFamily: "var(--font-serif)", fontWeight: 600,
              display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              GS
              <span style={{
                position: "absolute", bottom: -2, right: -3, width: 14, height: 14, borderRadius: 999,
                background: "var(--teal-700)", color: "#fbf6ec",
                fontFamily: "var(--font-mono)", fontSize: 7, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid var(--bg-page)", letterSpacing: "0.04em",
              }}>AI</span>
            </span>
          )}
        </div>
        <div style={{
          background: "var(--paper-50)", color: "var(--fg-1)",
          border: "1px solid var(--border-1)", borderRadius: 12, borderTopLeftRadius: 4,
          padding: "10px 14px", fontSize: 14, lineHeight: 1.5,
        }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{
      maxWidth: "78%", background: "var(--teal-700)", color: "var(--paper-50)",
      borderRadius: 12, borderTopRightRadius: 4, padding: "10px 14px",
      fontSize: 14, lineHeight: 1.5, alignSelf: "flex-end", ...style,
    }}>{children}</div>
  );
};

const TypingBubble = () => (
  <div style={{
    background: "var(--paper-50)", border: "1px solid var(--border-1)",
    borderRadius: 12, borderTopLeftRadius: 4, padding: "12px 16px",
    alignSelf: "flex-start", display: "flex", gap: 4, alignItems: "center",
  }}>
    <span className="loader-dot"/><span className="loader-dot"/><span className="loader-dot"/>
  </div>
);

export const Quiz = ({ answers, setAnswers, step, setStep, onComplete, onBack }: {
  answers: Answers; setAnswers: (a: Answers) => void;
  step: number; setStep: (n: number) => void;
  onComplete: () => void; onBack: () => void;
}) => {
  const total = QUIZ.length;
  const q = QUIZ[step];
  const selected = answers[q.id];
  const [typing, setTyping] = useState(false);
  const [showAck, setShowAck] = useState(!!selected);
  const [revealPhase, setRevealPhase] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowAck(!!answers[QUIZ[step].id]);
    setTyping(false);
    setRevealPhase(0);
    const isFirst = step === 0;
    const sequence: [number, number][] = isFirst
      ? [[400, 1], [1200, 2], [1600, 3], [2400, 4], [2800, 5], [3600, 6]]
      : [[300, 5], [900, 6]];
    const timers = sequence.map(([t, p]) => window.setTimeout(() => setRevealPhase(p), t));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [step, selected, typing, showAck, revealPhase]);

  const choose = (v: string) => {
    if (selected) return;
    setAnswers({ ...answers, [q.id]: v });
    setShowAck(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setShowAck(true);
      setTimeout(() => {
        if (step === total - 1) onComplete();
        else setStep(step + 1);
      }, 1400);
    }, 900);
  };

  const next = () => {
    if (!selected) return;
    if (step === total - 1) onComplete();
    else setStep(step + 1);
  };

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div className="row between center" style={{
        padding: "14px 32px", borderBottom: "1px solid var(--border-1)", background: "var(--bg-page)",
      }}>
        <Logo/>
        <button className="btn ghost sm" onClick={onBack}>Salva e esci</button>
      </div>

      <div className="col" style={{ flex: 1, minHeight: 0 }}>
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", background: "var(--paper-200)" }}>
            <div style={{
              position: "sticky", top: 0, zIndex: 2,
              background: "var(--paper-200)", borderBottom: "1px solid var(--border-1)",
              padding: "14px 32px",
            }}>
              <div className="row gap-3 center" style={{ maxWidth: 640, margin: "0 auto" }}>
                <span style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar size={40} initials="GS"/>
                  <span style={{
                    position: "absolute", bottom: -2, right: -3, padding: "1px 5px", borderRadius: 999,
                    background: "var(--teal-700)", color: "#fbf6ec",
                    fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 700,
                    border: "1.5px solid var(--paper-200)", letterSpacing: "0.06em",
                  }}>AI</span>
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>Giulia Sartori</p>
                  <div className="row gap-2 center">
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success-500)", boxShadow: "0 0 0 3px rgba(74,153,99,0.18)" }}/>
                    <span className="meta">Assistente AI · esperta successioni</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col gap-3" style={{ maxWidth: 640, margin: "0 auto", padding: "24px 32px 12px" }}>
              {step === 0 && (
                <>
                  {revealPhase === 1 && <TypingBubble/>}
                  {revealPhase >= 2 && <Bubble from="us" showAvatar style={{ animation: "fade-up var(--dur-2) var(--ease-standard) both" }}>Ciao, sono Giulia. Ti accompagno io in questo percorso.</Bubble>}
                  {revealPhase === 3 && <TypingBubble/>}
                  {revealPhase >= 4 && <Bubble from="us" style={{ animation: "fade-up var(--dur-2) var(--ease-standard) both" }}>Ti farò qualche domanda - niente di tecnico, solo per capire come aiutarti meglio.</Bubble>}
                </>
              )}

              {QUIZ.slice(0, step).map(past => {
                const ans = answers[past.id];
                const opt = past.options.find(o => o.v === ans);
                return (
                  <React.Fragment key={past.id}>
                    <Bubble from="us">{past.expert}</Bubble>
                    {opt && <Bubble from="them">{opt.t}</Bubble>}
                    {opt && <Bubble from="us" style={{ opacity: 0.85 }}>{past.ack(ans)}</Bubble>}
                  </React.Fragment>
                );
              })}

              {revealPhase === 5 && <TypingBubble/>}
              {revealPhase >= 6 && <Bubble from="us" showAvatar style={{ animation: "fade-up var(--dur-2) var(--ease-standard) both" }}>{q.expert}</Bubble>}

              {!selected && revealPhase >= 6 && (
                <p className="italic-serif" style={{
                  fontSize: 12.5, color: "var(--fg-3)", alignSelf: "flex-end",
                  marginTop: -2, marginRight: 4,
                  animation: "fade-up var(--dur-2) var(--ease-standard) 120ms both",
                }}>→ scegli una risposta</p>
              )}

              {!selected && revealPhase >= 6 && (
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end",
                  animation: "fade-up var(--dur-2) var(--ease-standard) 200ms both",
                }}>
                  {q.options.map(o => (
                    <button key={o.v} onClick={() => choose(o.v)} className="quiz-answer-chip">
                      {o.t}
                    </button>
                  ))}
                </div>
              )}

              {selected && revealPhase >= 6 && (() => {
                const opt = q.options.find(o => o.v === selected);
                return opt ? <Bubble from="them" style={{ animation: "fade-up var(--dur-2) var(--ease-standard) both" }}>{opt.t}</Bubble> : null;
              })()}

              {typing && <TypingBubble/>}

              {showAck && selected && (
                <Bubble from="us" style={{ opacity: 0.85, animation: "fade-up var(--dur-2) var(--ease-standard) both" }}>
                  {q.ack(selected)}
                </Bubble>
              )}
              <div style={{ height: 8 }}/>
            </div>
          </div>

          {/* Composer */}
          <div style={{
            background: "var(--bg-page)", borderTop: "1px solid var(--border-1)",
            padding: "16px 32px",
          }}>
            <div className="col gap-3" style={{ maxWidth: 640, margin: "0 auto" }}>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <button
                  className="btn ghost"
                  disabled={step === 0}
                  onClick={() => step > 0 && setStep(step - 1)}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 999, opacity: step === 0 ? 0.4 : 1 }}
                  aria-label="Domanda precedente"
                  title="Domanda precedente"
                >
                  <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
                    <Icon name="arrow-right" size={16}/>
                  </span>

                </button>
                <div style={{
                  flex: 1, height: 44, padding: "0 16px",
                  border: "1.2px solid var(--border-3)", borderRadius: 999,
                  background: "var(--bg-elevated)",
                  display: "flex", alignItems: "center",
                  color: "var(--fg-3)", fontSize: 14,
                }}>
                  Aggiungi un dettaglio…
                </div>
                <button className="btn primary" disabled={!selected} onClick={next}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 999 }}
                  aria-label={step === total - 1 ? "Completa" : "Continua"}>
                  <Icon name="arrow-right" size={16}/>
                </button>
              </div>
            </div>

          </div>
      </div>

      <style>{`
        @media (max-width: 720px) { .sidebar-progress { display: none; } }
      `}</style>
      <SiteFooterSlim/>
    </div>
  );
};
