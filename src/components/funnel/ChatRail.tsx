import React, { useState, useEffect, useRef } from "react";
import { Icon } from "./shell";
import { QUIZ, type Answers } from "./Quiz";
import giuliaPortrait from "@/assets/giulia-portrait.jpg";

export type Contact = { name: string; email: string; phone: string };

const Avatar: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <span style={{ position: "relative", display: "inline-flex", width: size, height: size, flex: "0 0 auto" }}>
    <img
      src={giuliaPortrait}
      alt="Giulia Sartori"
      width={size}
      height={size}
      loading="lazy"
      style={{
        width: size, height: size, borderRadius: "50%", objectFit: "cover",
        display: "block", border: "1.5px solid var(--paper-100)",
        boxShadow: "0 1px 4px rgba(18,35,57,0.12)",
      }}
    />
    <span style={{
      position: "absolute", right: -3, bottom: -3,
      background: "#1a7672", color: "#fbf6ec",
      fontFamily: "var(--font-mono)", fontSize: 7, fontWeight: 700,
      padding: "1px 4px", borderRadius: 4, border: "1.5px solid var(--paper-100)",
      letterSpacing: "0.08em",
    }}>AI</span>
  </span>
);


const Dots = () => (
  <span style={{ display: "inline-flex", gap: 4, padding: "10px 14px",
    background: "var(--paper-50)", border: "1px solid var(--border-1)", borderRadius: 14, alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal-600)",
        animation: `cr-bounce 1.2s ${i * 0.15}s infinite ease-in-out` }}/>
    ))}
  </span>
);

const Bubble: React.FC<{ from: "g" | "u"; children: React.ReactNode; avatar?: boolean }> = ({ from, children, avatar }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "flex-end",
    justifyContent: from === "u" ? "flex-end" : "flex-start",
    animation: "cr-pop 0.22s var(--ease-standard) both" }}>
    {from === "g" && <span style={{ width: 26, flex: "0 0 auto" }}>{avatar && <Avatar size={26}/>}</span>}
    <div style={{
      maxWidth: "82%", fontSize: 14, lineHeight: 1.5, padding: "10px 13px", borderRadius: 14,
      background: from === "g" ? "var(--paper-50)" : "var(--teal-700)",
      color: from === "g" ? "var(--fg-1)" : "var(--paper-50)",
      border: from === "g" ? "1px solid var(--border-1)" : "none",
      borderBottomLeftRadius: from === "g" ? 4 : 14,
      borderBottomRightRadius: from === "u" ? 4 : 14,
    }}>{children}</div>
  </div>
);

type LogEntry =
  | { kind: "g"; text: string; avatar?: boolean }
  | { kind: "u"; text: string }
  | { kind: "typing" };

const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const validPhone = (s: string) => s.replace(/\D/g, "").length >= 8;
const validName  = (s: string) => s.trim().length >= 2;

export const ChatRail: React.FC<{ onComplete: (a: Answers, c: Contact) => void; compact?: boolean }> = ({ onComplete, compact }) => {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [step, setStep] = useState(0);              // current quiz index
  const [answers, setAnswers] = useState<Answers>({});
  const [phase, setPhase] = useState<"intro" | "quiz" | "contact-intro" | "name" | "email" | "phone" | "gdpr" | "done">("intro");
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "" });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const push = (e: LogEntry) => setLog(prev => [...prev, e]);
  const sayG = async (text: string, avatar = false, delay = 700) => {
    setBusy(true);
    push({ kind: "typing" });
    await new Promise(r => setTimeout(r, delay));
    setLog(prev => prev.filter(x => x.kind !== "typing").concat([{ kind: "g", text, avatar }]));
    await new Promise(r => setTimeout(r, 220));
    setBusy(false);
  };

  // Auto-scroll to the bottom (chips included) whenever content changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [log, phase, step, busy]);


  // Intro
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    (async () => {
      await sayG("Ciao, sono Giulia. Ti accompagno io in questo percorso.", true, 500);
      await sayG("Cinque domande rapide, niente di tecnico. Mentre rispondi, sulla sinistra trovi tutte le risposte alle tue domande.");
      setPhase("quiz");
      await sayG(QUIZ[0].expert, true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askNextQuiz = async (nextIdx: number) => {
    if (nextIdx >= QUIZ.length) {
      setPhase("contact-intro");
      await sayG("Perfetto. Ho tutto quello che mi serve per prepararti un riepilogo personalizzato.", true);
      await sayG("Per inviartelo e fissare la consulenza gratuita di 30 min, ho bisogno solo di tre cose. Iniziamo dal nome.");
      setPhase("name");
      return;
    }
    setStep(nextIdx);
    await sayG(QUIZ[nextIdx].expert, true);
  };

  const chooseQuiz = async (v: string) => {
    if (busy) return;
    const q = QUIZ[step];
    const opt = q.options.find(o => o.v === v);
    if (!opt) return;
    setAnswers(prev => ({ ...prev, [q.id]: v }));
    push({ kind: "u", text: opt.t });
    await sayG(q.ack(v), false, 600);
    await askNextQuiz(step + 1);
  };

  const submitContact = async () => {
    if (busy) return;
    const val = input.trim();
    if (phase === "name") {
      if (!validName(val)) return;
      setContact(c => ({ ...c, name: val }));
      setInput("");
      push({ kind: "u", text: val });
      await sayG(`Piacere, ${val.split(" ")[0]}. Ora la tua email - è dove ti mando il riepilogo.`, false, 600);
      setPhase("email");
    } else if (phase === "email") {
      if (!validEmail(val)) return;
      setContact(c => ({ ...c, email: val }));
      setInput("");
      push({ kind: "u", text: val });
      await sayG("E un numero di telefono per la chiamata (se vorrai prenotarla). Niente spam, promesso.", false, 600);
      setPhase("phone");
    } else if (phase === "phone") {
      if (!validPhone(val)) return;
      const c2 = { ...contact, phone: val };
      setContact(c2);
      setInput("");
      push({ kind: "u", text: val });
      await sayG("Ultimo passaggio: confermi il consenso al trattamento dei dati (GDPR)?", false, 600);
      setPhase("gdpr");
    }
  };

  const confirmGdpr = async () => {
    if (busy) return;
    push({ kind: "u", text: "Confermo" });
    setPhase("done");
    await sayG("Perfetto, ti preparo il riepilogo…", true, 500);
    setTimeout(() => onComplete(answers, contact), 600);
  };

  const currentQ = QUIZ[step];
  const showQuizChips = phase === "quiz" && !busy && currentQ && !answers[currentQ.id];

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", minHeight: 0,
      background: "var(--paper-100)",
      border: compact ? "none" : "1px solid var(--border-1)",
      borderRadius: compact ? 0 : 18,
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
    }}>
      <style>{`
        @keyframes cr-bounce { 0%,80%,100%{transform:translateY(0);opacity:.45} 40%{transform:translateY(-4px);opacity:1} }
        @keyframes cr-pop { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .cr-chip { padding: 9px 14px; border-radius: 999px; border: 1.2px solid var(--border-2);
          background: var(--paper-50); color: var(--fg-1); font-size: 13.5px; cursor: pointer;
          transition: all .18s var(--ease-standard); }
        .cr-chip:hover:not(:disabled) { border-color: var(--teal-600); color: var(--teal-700); background: var(--teal-50); }
        .cr-chip:disabled { opacity: .5; cursor: not-allowed; }
        .cr-input { width:100%; padding: 11px 14px; border-radius: 999px; border: 1.2px solid var(--border-2);
          background: var(--paper-0); font: inherit; color: var(--fg-1); outline: none; }
        .cr-input:focus { border-color: var(--teal-600); box-shadow: var(--focus-ring); }
        .cr-send { width: 40px; height: 40px; border-radius: 999px; background: var(--teal-700);
          color: var(--paper-50); display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .cr-send:disabled { opacity: .4; cursor: not-allowed; }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 16px", background: "var(--paper-200)",
        borderBottom: "1px solid var(--border-1)", flex: "0 0 auto",
      }}>
        <Avatar size={40}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: "var(--fg-1)", fontSize: 14 }}>Giulia Sartori</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--fg-3)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success-500)",
              boxShadow: "0 0 0 3px rgba(74,153,99,0.18)" }}/>
            Assistente AI · esperta successioni
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)",
          fontSize: 10, letterSpacing: "0.16em", color: "var(--fg-3)", textTransform: "uppercase" }}>
          <Icon name="lock" size={11}/> SICURO
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 3, background: "var(--paper-300)", flex: "0 0 auto" }}>
        <div style={{
          height: "100%",
          width: `${phase === "intro" ? 4
            : phase === "quiz" ? 4 + (step / QUIZ.length) * 70
            : phase === "contact-intro" ? 78
            : phase === "name" ? 82
            : phase === "email" ? 88
            : phase === "phone" ? 94
            : 100}%`,
          background: "linear-gradient(90deg, var(--teal-600), var(--teal-500))",
          transition: "width .5s var(--ease-standard)",
        }}/>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, minHeight: 0, overflowY: "auto",
        padding: "18px 16px 12px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {log.map((m, i) =>
          m.kind === "typing" ? (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <Avatar size={26}/><Dots/>
            </div>
          ) : m.kind === "g" ? (
            <Bubble key={i} from="g" avatar={m.avatar}>{m.text}</Bubble>
          ) : (
            <Bubble key={i} from="u">{m.text}</Bubble>
          )
        )}

        {/* Quiz options inline */}
        {showQuizChips && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end",
            marginTop: 4, animation: "cr-pop .3s var(--ease-standard) both" }}>
            {currentQ.options.map(o => (
              <button key={o.v} className="cr-chip" onClick={() => chooseQuiz(o.v)}>{o.t}</button>
            ))}
          </div>
        )}
      </div>

      {/* Composer / Contact form / GDPR */}
      <div style={{
        flex: "0 0 auto",
        padding: "12px 14px 14px",
        background: "var(--paper-200)", borderTop: "1px solid var(--border-1)",
      }}>
        {(phase === "name" || phase === "email" || phase === "phone") && (
          <form onSubmit={e => { e.preventDefault(); submitContact(); }}
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              autoFocus
              className="cr-input"
              type={phase === "email" ? "email" : phase === "phone" ? "tel" : "text"}
              placeholder={phase === "name" ? "Il tuo nome…" : phase === "email" ? "tu@email.it" : "+39 ..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={busy}
              maxLength={120}
            />
            <button type="submit" className="cr-send" disabled={busy || !input.trim()}
              aria-label="Invia"><Icon name="arrow-right" size={16}/></button>
          </form>
        )}

        {phase === "gdpr" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5,
              lineHeight: 1.5, color: "var(--fg-2)" }}>
              <input type="checkbox" defaultChecked disabled style={{ marginTop: 3 }}/>
              <span>Acconsento al trattamento dei dati ai sensi del GDPR. Dati custoditi su server in Italia, eliminabili a richiesta.</span>
            </label>
            <button onClick={confirmGdpr} disabled={busy}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "var(--teal-700)", color: "var(--paper-50)", fontWeight: 600, fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Confermo e ricevo il riepilogo <Icon name="arrow-right" size={14}/>
            </button>
          </div>
        )}

        {(phase === "intro" || phase === "quiz" || phase === "contact-intro" || phase === "done") && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
            color: "var(--fg-3)", textTransform: "uppercase", padding: "4px 6px" }}>
            <span>
              {phase === "quiz"
                ? `Domanda ${step + 1} di ${QUIZ.length} · ${QUIZ[step].label}`
                : phase === "done" ? "Completato"
                : phase === "contact-intro" ? "Quasi fatto"
                : "In corso"}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
