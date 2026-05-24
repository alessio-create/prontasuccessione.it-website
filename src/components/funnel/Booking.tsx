import React, { useState } from "react";
import { Logo, Icon, SiteFooterSlim } from "./shell";

const MONTH_NAME = "Maggio 2026";
const WEEKDAYS = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];

const buildMonth = (selectedDay: number) => {
  const cells: { d: number; muted: boolean; avail?: boolean; today?: boolean; selected?: boolean }[] = [];
  [27, 28, 29, 30].forEach(d => cells.push({ d, muted: true }));
  for (let d = 1; d <= 31; d++) {
    const dow = (d + 3) % 7;
    cells.push({
      d, muted: false,
      avail: ![0, 6].includes(dow) && d > 4 && d % 4 !== 0,
      today: d === 3,
      selected: d === selectedDay,
    });
  }
  return cells;
};

export const BookingPanel = ({ onConfirm }: { onConfirm: () => void }) => {
  const [selectedDay, setSelectedDay] = useState(13);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [duration, setDuration] = useState("30");
  const slots = ["09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:30"];

  const Calendar = (
    <div>
      <div className="row between center">
        <p className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--fg-1)" }}>{MONTH_NAME}</p>
        <div className="row gap-1">
          <button className="btn sm ghost" aria-label="Mese precedente"><Icon name="chevron-left" size={16}/></button>
          <button className="btn sm ghost" aria-label="Mese successivo"><Icon name="chevron-right" size={16}/></button>
        </div>
      </div>
      <div className="row mt-4" style={{ gap: 4 }}>
        {WEEKDAYS.map((d, i) => <span key={i} className="meta tcenter" style={{ flex: 1, fontSize: 10, letterSpacing: "0.08em" }}>{d}</span>)}
      </div>
      <div className="cal-grid mt-2">
        {buildMonth(selectedDay).map((c, i) => (
          <button key={i}
            className={"cal-cell" + (c.muted ? " muted" : c.selected ? " selected" : c.avail ? " avail" : " unavail") + (c.today ? " today" : "")}
            disabled={c.muted || !c.avail}
            onClick={() => c.avail && setSelectedDay(c.d)}>{c.d}</button>
        ))}
      </div>
    </div>
  );

  const TimePicker = (
    <div>
      <div className="row between center">
        <span className="eyebrow">Orari per il {selectedDay} maggio</span>
        <div className="row gap-1">
          {["30", "60"].map(d => (
            <button key={d} onClick={() => setDuration(d)} style={{
              height: 28, padding: "0 10px", fontSize: 11,
              background: duration === d ? "var(--ink-900)" : "transparent",
              color: duration === d ? "var(--paper-50)" : "var(--fg-2)",
              border: "1px solid " + (duration === d ? "var(--ink-900)" : "var(--border-3)"),
              borderRadius: 999, cursor: "pointer",
              fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
            }}>{d} MIN</button>
          ))}
        </div>
      </div>
      <div className="row gap-2 wrap mt-3">
        {slots.map(t => (
          <button key={t} className={"slot" + (selectedTime === t ? " selected" : "")} onClick={() => setSelectedTime(t)}
            style={{ flex: "1 0 calc(20% - 7px)", minWidth: 70, fontSize: 13 }}>{t}</button>
        ))}
      </div>
    </div>
  );

  const Summary = (
    <div className="card-warm mt-6" style={{ padding: 22, borderColor: "var(--ink-900)", borderWidth: 1.5 }}>
      <div className="row between center">
        <span className="eyebrow">Riepilogo</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>gratuita</span>
      </div>
      <p className="serif mt-2" style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--fg-1)" }}>
        {`Mer. ${selectedDay} maggio · ${selectedTime}`}
      </p>
      <p className="meta mt-1">{duration} minuti · Europa/Roma · al telefono</p>
      <button className="btn primary lg block mt-4" onClick={onConfirm}>
        Conferma l'appuntamento <Icon name="arrow-right" size={16}/>
      </button>
      <p className="meta mt-3 tcenter" style={{ lineHeight: 1.5 }}>Riceverai l'invito al calendario subito dopo.</p>
    </div>
  );

  return (
    <div style={{ background: "var(--paper-50)", border: "1.5px solid var(--ink-900)", borderRadius: 4, padding: 26 }}>
      {Calendar}
      <div className="mt-6">{TimePicker}</div>
      {Summary}
    </div>
  );
};


export const Confirmed = ({ onRestart }: { onRestart: () => void }) => {
  const Roadmap = [
    { n: "I.", t: "Oggi · pratica aperta", b: "Riceverai per email l'invito al calendario e una conferma con il riassunto delle tue risposte.", done: true, current: false },
    { n: "II.", t: "Mer. 13 maggio · 11:00", b: "Giulia ti chiamerà al numero che hai indicato. Mezz'ora di chiacchierata, niente impegno.", done: false, current: true },
    { n: "III.", t: "Stima e preventivo", b: "Subito dopo la chiamata ricevi via email la stima ufficiale: tariffa fissa, tempistica, lista documenti.", done: false, current: false },
    { n: "IV.", t: "Avvio pratica (se confermi)", b: "Apriamo l'area cliente, raccogliamo i documenti, prepariamo e inviamo la dichiarazione.", done: false, current: false },
  ];

  const Dossier = (
    <div style={{ background: "var(--paper-50)", border: "1.5px solid var(--ink-900)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
      <div style={{ padding: "20px 28px", background: "var(--paper-300)", borderBottom: "1.5px solid var(--ink-900)" }}>
        <div className="row between center">
          <div>
            <span className="eyebrow">Pratica aperta · ricevuta</span>
            <p className="serif mt-1" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.005em", color: "var(--fg-1)" }}>
              Successione · Sig.ra A. Bianchi
            </p>
          </div>
          <span className="pill mono" style={{ background: "var(--paper-50)", fontSize: 10 }}>PS-2026-0451</span>
        </div>
      </div>
      <div style={{ padding: "4px 28px" }}>
        {([
          ["Apertura pratica", "03 maggio 2026 · 14:32"],
          ["Concierge assegnato", "Giulia Sartori"],
          ["Prossimo contatto", "Mer. 13 maggio · 11:00 – 11:30"],
          ["Modalità", "Telefono · +39 ••• •••• 32"],
          ["Costo consulenza", "Gratuita"],
        ] as [string, string][]).map(([k, v], i) => (
          <div key={i} className="row between" style={{
            padding: "14px 0",
            borderBottom: i < 4 ? "1px solid var(--border-1)" : "none",
            alignItems: "baseline",
          }}>
            <span className="meta">{k}</span>
            <span style={{
              fontSize: 14, fontWeight: 500, color: "var(--fg-1)",
              fontFamily: i === 3 ? "var(--font-mono)" : "var(--font-sans)",
              textAlign: "right",
            }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="stamp" style={{ position: "absolute", right: 28, bottom: 24, transform: "rotate(-7deg)" }}>
        Pratica<br/>aperta
      </div>
      <div style={{ padding: "18px 28px", background: "var(--paper-200)", borderTop: "1px solid var(--border-1)", display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button className="btn sm"><Icon name="calendar" size={13}/> Aggiungi al calendario</button>
        <button className="btn sm">Sposta</button>
        <button className="btn sm">Annulla</button>
      </div>
    </div>
  );

  const RoadmapEl = (
    <div>
      <span className="eyebrow">Cosa succede ora</span>
      <ol style={{ listStyle: "none", padding: 0, margin: "20px 0 0", position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: 16, bottom: 24, width: 1.5, background: "var(--border-3)" }}/>
        {Roadmap.map((r, i) => (
          <li key={i} style={{ position: "relative", paddingLeft: 44, paddingBottom: i < Roadmap.length - 1 ? 22 : 0 }}>
            <span style={{
              position: "absolute", left: 0, top: 0,
              width: 30, height: 30, borderRadius: 999,
              background: r.done ? "var(--teal-700)" : r.current ? "var(--paper-50)" : "var(--bg-page)",
              border: "1.5px solid " + (r.done || r.current ? "var(--teal-700)" : "var(--border-3)"),
              color: r.done ? "var(--paper-50)" : "var(--teal-700)",
              fontFamily: "var(--font-serif)", fontWeight: 600,
              fontSize: 12, fontStyle: "italic",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: r.current ? "0 0 0 4px rgba(31,86,79,0.12)" : "none",
            }}>{r.done ? <Icon name="check" size={13} stroke={2.5}/> : r.n}</span>
            <p style={{ fontSize: 15, fontWeight: 600, color: r.done ? "var(--fg-2)" : "var(--fg-1)", lineHeight: 1.3 }}>{r.t}</p>
            <p className="mt-2" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>{r.b}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  const Aside = (
    <div className="card" style={{ padding: 22 }}>
      <span className="eyebrow">Nel frattempo, se puoi</span>
      <p className="italic-serif mt-2" style={{ fontSize: 14, lineHeight: 1.55 }}>
        Niente di urgente - ma se ti capita sotto mano, fai un cenno qui sotto.
      </p>
      <div className="col gap-2 mt-4">
        {["Codice fiscale del defunto","Visura catastale degli immobili","Estratti conto degli ultimi 6 mesi","Eventuale testamento (anche solo foto)"].map((t, i) => (
          <label key={i} className="checkbox-row">
            <input type="checkbox"/>
            <span style={{ fontSize: 13, color: "var(--fg-1)" }}>{t}</span>
          </label>
        ))}
      </div>
      <div className="divider mt-5 mb-4"/>
      <p className="meta" style={{ lineHeight: 1.5 }}>
        Hai già qualche documento pronto? Puoi caricarlo nell'area cliente, oppure portarli alla chiamata.
      </p>
      <button className="btn lg block mt-4">Apri area cliente <Icon name="arrow-right" size={14}/></button>
    </div>
  );

  return (
    <div style={{ background: "var(--bg-page)" }}>
      <div className="funnel-header">
        <Logo/>
        <span className="meta">Pratica aperta · ricevuta nº PS-2026-0451</span>
        <button className="btn ghost sm" onClick={onRestart}>Nuova simulazione</button>
      </div>
      <div style={{ padding: "48px 56px 24px" }}>
        <span className="pill" style={{ background: "var(--teal-100)", color: "var(--teal-700)", borderColor: "var(--teal-300)" }}>
          <Icon name="check" size={12} stroke={2.5}/> Pratica aperta
        </span>
        <h2 className="serif mt-4" style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 740 }}>
          Ci risentiamo mercoledì alle 11.
        </h2>
        <p className="italic-serif mt-4" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 580 }}>
          Ti abbiamo aperto una pratica e inviato l'invito al calendario. Sotto trovi il riepilogo e i prossimi quattro passi.
        </p>
      </div>
      <div style={{ padding: "24px 56px 64px" }}>
        <div className="row gap-8 wrap" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: "1.2 1 320px", minWidth: 0 }} className="col gap-8">
            {Dossier}
            {RoadmapEl}
          </div>
          <div style={{ flex: "1 1 280px", minWidth: 280 }}>{Aside}</div>
        </div>
      </div>
      <SiteFooterSlim/>
    </div>
  );
};
