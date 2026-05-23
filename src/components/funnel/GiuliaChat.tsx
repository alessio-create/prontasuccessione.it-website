import React, { useState, useEffect, useRef } from "react";
import { Icon } from "./shell";

type Msg = { from: "g" | "u"; text: string };

const SCRIPT: Msg[] = [
  { from: "g", text: "Ciao, sono Giulia. Ti accompagno io in questo percorso." },
  { from: "g", text: "In 30 secondi capiamo insieme cosa serve, quanto costa e quando è pronta la tua pratica. Senza carta, senza appuntamenti." },
  { from: "g", text: "Vuoi che cominciamo dal quiz? Sono cinque domande, niente dati personali." },
];

const Avatar: React.FC<{ size?: number; ring?: boolean }> = ({ size = 36, ring }) => (
  <span style={{ position: "relative", display: "inline-block", width: size, height: size, flex: "0 0 auto" }}>
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #8a4a36, #c25a3e)",
      color: "#fbf6ec", fontFamily: "var(--font-display, Fraunces, Georgia, serif)",
      fontWeight: 700, fontSize: size * 0.38, letterSpacing: "0.04em",
      border: ring ? "2px solid #fbf6ec" : "none",
      boxShadow: ring ? "0 1px 6px rgba(18,35,57,0.18)" : "none",
    }}>GS</span>
    <span style={{
      position: "absolute", right: -2, bottom: -2,
      background: "#1a7672", color: "#fbf6ec",
      fontFamily: "var(--font-mono, JetBrains Mono, monospace)",
      fontSize: 7, letterSpacing: "0.12em", fontWeight: 700,
      padding: "1px 4px", borderRadius: 4, border: "1.5px solid #fbf6ec",
    }}>AI</span>
  </span>
);

const Dots = () => (
  <span style={{ display: "inline-flex", gap: 4, padding: "10px 14px",
    background: "#fff", border: "1px solid var(--border-1)", borderRadius: 14, alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 6, height: 6, borderRadius: "50%", background: "#1a7672",
        animation: `giulia-bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
      }}/>
    ))}
  </span>
);

export const GiuliaChat: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // play script when first opened
  useEffect(() => {
    if (!open || shown.length > 0) return;
    let cancelled = false;
    (async () => {
      for (let i = 0; i < SCRIPT.length; i++) {
        setTyping(true);
        await new Promise(r => setTimeout(r, i === 0 ? 600 : 1100));
        if (cancelled) return;
        setTyping(false);
        setShown(prev => [...prev, SCRIPT[i]]);
        await new Promise(r => setTimeout(r, 250));
        if (cancelled) return;
      }
    })();
    return () => { cancelled = true; };
  }, [open, shown.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [shown, typing]);

  useEffect(() => {
    if (open) { setPulse(false); setShowTip(false); }
  }, [open]);

  // show tooltip after first meaningful scroll
  useEffect(() => {
    if (tipDismissed || open) return;
    const onScroll = () => {
      if (window.scrollY > 320) {
        setShowTip(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tipDismissed, open]);

  return (
    <>
      <style>{`
        @keyframes giulia-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes giulia-pulse {
          0% { box-shadow: 0 0 0 0 rgba(26,118,114,0.45), 0 12px 28px rgba(18,35,57,0.25); }
          70% { box-shadow: 0 0 0 18px rgba(26,118,114,0), 0 12px 28px rgba(18,35,57,0.25); }
          100% { box-shadow: 0 0 0 0 rgba(26,118,114,0), 0 12px 28px rgba(18,35,57,0.25); }
        }
        @keyframes giulia-pop {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Tooltip after first scroll */}
      {!open && showTip && (
        <div
          className="chat-tip"
          role="button"
          tabIndex={0}
          onClick={() => { setOpen(true); setTipDismissed(true); }}
          onKeyDown={(e) => { if (e.key === "Enter") { setOpen(true); setTipDismissed(true); } }}
        >
          <button
            type="button"
            className="close"
            aria-label="Chiudi"
            onClick={(e) => { e.stopPropagation(); setShowTip(false); setTipDismissed(true); }}
          >×</button>
          Hai bisogno di aiuto? Inizia subito il quiz con Giulia →
        </div>
      )}

      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Apri chat con Giulia"
          style={{
            position: "fixed", right: 24, bottom: 24, zIndex: 60,
            width: 64, height: 64, borderRadius: "50%", border: "none",
            background: "var(--ink-900, #122339)", color: "#fbf6ec",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            animation: pulse ? "giulia-pulse 2.2s infinite" : "none",
            boxShadow: "0 12px 28px rgba(18,35,57,0.25)",
          }}
        >
          <Avatar size={48} ring/>
          {pulse && (
            <span style={{
              position: "absolute", top: -4, right: -4,
              background: "#c25a3e", color: "#fbf6ec",
              fontSize: 10, fontWeight: 700, padding: "3px 6px",
              borderRadius: 10, border: "2px solid #fbf6ec",
              fontFamily: "var(--font-mono, JetBrains Mono, monospace)",
            }}>1</span>
          )}
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat con Giulia"
          style={{
            position: "fixed", right: 20, bottom: 20, zIndex: 60,
            width: "min(380px, calc(100vw - 32px))",
            maxHeight: "min(560px, calc(100vh - 40px))",
            background: "var(--paper-100, #fbf6ec)",
            border: "1px solid var(--border-1, rgba(18,35,57,0.12))",
            borderRadius: 18, overflow: "hidden",
            boxShadow: "0 24px 60px rgba(18,35,57,0.22)",
            display: "flex", flexDirection: "column",
            animation: "giulia-pop 0.22s ease-out",
            fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 16px", background: "var(--paper-200, #f4ecdc)",
            borderBottom: "1px solid var(--border-1)",
          }}>
            <Avatar size={40} ring/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: "var(--fg-1, #122339)", fontSize: 14 }}>
                Giulia Sartori
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6,
                fontSize: 12, color: "var(--fg-3, #4a5a72)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a7672" }}/>
                Assistente AI · esperta successioni
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi chat"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "var(--fg-2, #284060)", padding: 6, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            ><span style={{ fontSize: 20, lineHeight: 1, fontWeight: 300 }}>×</span></button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: "auto", padding: "16px 14px 12px",
            display: "flex", flexDirection: "column", gap: 10,
            background: "var(--paper-100, #fbf6ec)",
          }}>
            {shown.map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "flex-end",
                justifyContent: m.from === "u" ? "flex-end" : "flex-start",
                animation: "giulia-pop 0.18s ease-out",
              }}>
                {m.from === "g" && <Avatar size={26}/>}
                <div style={{
                  maxWidth: "78%", fontSize: 14, lineHeight: 1.5,
                  padding: "10px 13px", borderRadius: 14,
                  background: m.from === "g" ? "#fff" : "var(--ink-900, #122339)",
                  color: m.from === "g" ? "var(--fg-1, #122339)" : "#fbf6ec",
                  border: m.from === "g" ? "1px solid var(--border-1)" : "none",
                  borderBottomLeftRadius: m.from === "g" ? 4 : 14,
                  borderBottomRightRadius: m.from === "u" ? 4 : 14,
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <Avatar size={26}/>
                <Dots/>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{
            padding: "12px 14px 14px", background: "var(--paper-200, #f4ecdc)",
            borderTop: "1px solid var(--border-1)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <button
              onClick={() => { setOpen(false); onStart(); }}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "var(--teal-700, #1a7672)", color: "#fbf6ec",
                border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              Inizia il quiz con Giulia <Icon name="arrow-right" size={14}/>
            </button>
            <div style={{ fontSize: 11, color: "var(--fg-3, #4a5a72)", textAlign: "center" }}>
              {"\n"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
