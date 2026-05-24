import React, { useState, useEffect } from "react";
import { Logo, Icon, SiteFooterSlim } from "./shell";
import { BookingPanel } from "./Booking";
import type { Answers } from "./Quiz";

export const Processing = ({ onDone }: { onDone: () => void }) => {
  const [stage, setStage] = useState(0);
  const steps = [
    "Sto rileggendo le tue risposte",
    "Verifico i punti che richiedono attenzione",
    "Preparo le domande per la consulenza",
    "Genero il riepilogo per Giulia",
  ];
  useEffect(() => {
    if (stage >= steps.length) { const t = setTimeout(onDone, 600); return () => clearTimeout(t); }
    const t = setTimeout(() => setStage(s => s + 1), 750);
    return () => clearTimeout(t);
  }, [stage]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-page)" }}>
      <div className="site-header"><Logo/><span className="meta">Conversazione conclusa</span></div>
      <div className="col center" style={{ flex: 1, justifyContent: "center", padding: "0 24px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <span className="eyebrow">Un momento</span>
          <h2 className="serif mt-3" style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Sto preparando la diagnostica.
          </h2>
          <p className="italic-serif mt-4" style={{ fontSize: 16 }}>Bastano pochi secondi.</p>
          <div className="mt-8">
            {steps.map((s, i) => (
              <div key={i} className={"proc-row" + (i < stage ? " done" : i === stage ? " active" : "")}>
                <span className="ic">{i < stage ? <Icon name="check" size={12} stroke={2.5}/> : null}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooterSlim/>
    </div>
  );
};

const buildFindings = (a: Answers) => {
  const out: { t: string; b: string }[] = [];
  if (a.immobili === "piu") out.push({ t: "Più immobili da coordinare", b: "Servirà coordinare con l'ufficio territoriale competente per ciascun bene. Lo facciamo regolarmente, ma cambia tempi e tariffa." });
  else if (a.immobili === "quote") out.push({ t: "Quote o nuda proprietà", b: "Le quote richiedono ricostruire la storia di ogni bene. Possiamo farlo dagli archivi, ma serve una mezz'ora di chiacchierata per capire cosa c'è." });
  else if (a.immobili === "nonso") out.push({ t: "Patrimonio immobiliare da accertare", b: "Possiamo verificare gratuitamente se esistono immobili a nome del defunto, prima di iniziare." });
  if (a.testamento === "olografo") out.push({ t: "Testamento olografo da pubblicare", b: "Un testamento scritto a mano va prima portato dal notaio per la pubblicazione, prima dell'invio della dichiarazione." });
  else if (a.testamento === "nonso") out.push({ t: "Verifica esistenza testamento", b: "Possiamo interrogare il Registro Generale dei Testamenti — pochi giorni e ti toglie ogni dubbio." });
  if (a.tempistica === "avanzato") out.push({ t: "Termine di legge ravvicinato", b: "Mancano poche settimane al limite di dodici mesi. Si può fare in tempo, ma è il momento di partire." });
  else if (a.tempistica === "oltre") out.push({ t: "Dichiarazione tardiva", b: "Sei oltre i dodici mesi. Si può ancora presentare con ravvedimento operoso, e le sanzioni si riducono." });
  if (a.regione === "estero") out.push({ t: "Defunto residente all'estero", b: "L'ufficio competente è la Direzione Provinciale II di Roma. Cambiano alcuni adempimenti AIRE." });
  if (a.parentela === "fratello" || a.parentela === "altro") out.push({ t: "Aliquote diverse dalla franchigia base", b: "Per fratelli e parenti diversi da coniuge/figli si applicano aliquote del 6% con franchigia ridotta o nulla." });
  const padding = [
    { t: "Quadro fiscale da confermare", b: "Le imposte di successione, ipotecaria e catastale dipendono dal valore catastale. Le calcoliamo insieme prima di iniziare." },
    { t: "Documentazione bancaria", b: "Ti aiuteremo a richiedere i saldi alla data del decesso a tutte le banche. È una pratica gratuita ma noiosa — la facciamo noi." },
    { t: "Volture catastali successive", b: "Una volta presentata la dichiarazione, vanno aggiornati i registri catastali. Lo includiamo nella tariffa." },
  ];
  for (const p of padding) { if (out.length >= 3) break; out.push(p); }
  return out.slice(0, 3);
};

export const Result = ({ answers, onConfirm, onBack }: { answers: Answers; onConfirm: () => void; onBack: () => void }) => {
  const findings = buildFindings(answers);
  const FindingCard = ({ t, b }: { t: string; b: string }) => (
    <div className="card" style={{ padding: 22, borderColor: "var(--warn-500)", borderWidth: 1.2, background: "var(--paper-50)" }}>
      <div className="row gap-3" style={{ alignItems: "flex-start" }}>
        <span style={{
          width: 30, height: 30, borderRadius: 4, border: "1.5px solid var(--warn-500)",
          background: "var(--warn-100)", color: "var(--warn-700)",
          fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16,
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>!</span>
        <div className="flex-1" style={{ paddingTop: 2 }}>
          <p style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3, color: "var(--fg-1)" }}>{t}</p>
          <p className="mt-2" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6 }}>{b}</p>
        </div>
      </div>
    </div>
  );


  return (
    <div style={{ background: "var(--bg-page)" }}>
      <div className="funnel-header">
        <Logo/>
        <span className="meta">Quiz completato · 5/5</span>
        <button className="btn ghost sm" onClick={onBack}>← Modifica risposte</button>
      </div>
      <div style={{ padding: "48px 56px 0" }}>
        <span className="pill warn"><Icon name="help" size={12}/> Caso da approfondire</span>
        <span className="eyebrow mt-4" style={{ display: "block" }}>Il tuo profilo · diagnostica</span>
        <h2 className="serif mt-3" style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 720 }}>
          Il tuo caso presenta {findings.length} elementi di cui vogliamo parlarti prima.
        </h2>
        <p className="italic-serif mt-4" style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 580 }}>
          Possiamo gestirlo, ma non vogliamo darti una stima sbagliata. La nostra esperta ti spiegherà esattamente cosa cambia in trenta minuti, gratis.
        </p>
      </div>

      <div style={{ padding: "32px 56px 64px" }}>
        <div className="row gap-8 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "1.3 1 320px", minWidth: 0 }} className="col gap-4">
            {findings.map((f, i) => <FindingCard key={i} {...f}/>)}
            <div className="card-warm mt-4" style={{ padding: 22 }}>
              <span className="eyebrow">Cosa NON sappiamo ancora</span>
              <p className="italic-serif mt-2" style={{ fontSize: 15, lineHeight: 1.55 }}>
                Una stima precisa di tariffa e tempi richiede capire alcuni dettagli — il valore catastale degli immobili, la composizione del nucleo ereditario, eventuali debiti tributari pendenti.
              </p>
              <p className="italic-serif mt-3" style={{ fontSize: 15, lineHeight: 1.55 }}>
                Per questo preferiamo parlarci prima di chiederti un euro.
              </p>
            </div>
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 280 }}><BookingPanel onConfirm={onConfirm}/></div>
        </div>
      </div>
      <SiteFooterSlim/>
    </div>
  );
};
