import React from "react";

const LOGO_INK = "#122339";
const LOGO_CREAM = "#fbf6ec";

export const Logo = ({ small = false, onDark = false }: { small?: boolean; onDark?: boolean }) => {
  const fg = onDark ? LOGO_CREAM : LOGO_INK;
  const accent = "#1a7672";
  return (
    <span
      aria-label="ProntaSuccessione"
      style={{
        display: "inline-flex", alignItems: "baseline", gap: 8,
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: small ? 18 : 22, fontWeight: 600,
        letterSpacing: "-0.022em", color: fg, lineHeight: 1,
      }}
    >
      <span
        aria-hidden
        style={{
          width: small ? 8 : 10, height: small ? 8 : 10, borderRadius: 999,
          background: accent, display: "inline-block", transform: "translateY(-1px)",
        }}
      />
      <span>pronta<span style={{ fontStyle: "italic", color: accent }}>successione</span></span>
    </span>
  );
};

type IconName =
  | "check" | "check-circle" | "arrow-right" | "arrow-left"
  | "chevron-down" | "chevron-right" | "chevron-left"
  | "shield" | "lock" | "calendar" | "help" | "plus";

export const Icon = ({ name, size = 18, stroke = 1.5 }: { name: IconName; size?: number; stroke?: number }) => {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "check": return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>;
    case "check-circle": return <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 17 9"/></svg>;
    case "arrow-right": return <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case "arrow-left": return <svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
    case "chevron-down": return <svg {...p}><polyline points="6 9 12 15 18 9"/></svg>;
    case "chevron-right": return <svg {...p}><polyline points="9 6 15 12 9 18"/></svg>;
    case "chevron-left": return <svg {...p}><polyline points="15 6 9 12 15 18"/></svg>;
    case "shield": return <svg {...p}><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></svg>;
    case "lock": return <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "help": return <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case "plus": return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  }
};

export const SiteHeaderSlim = () => (
  <div className="site-header" style={{ justifyContent: "center" }}>
    <Logo/>
  </div>
);

export const SiteFooterSlim = () => (
  <footer style={{
    padding: "24px 56px", background: "var(--paper-200)",
    borderTop: "1px solid var(--border-1)", color: "var(--fg-2)",
  }}>
    <div className="row between center wrap" style={{ gap: 16 }}>
      <small style={{ fontSize: 12, color: "var(--fg-3)" }}>
        © 2026 ProntaSuccessione S.r.l. · P. IVA 12345670010
      </small>
      <div className="row gap-4">
        <a href="#" style={{ fontSize: 12, color: "var(--fg-2)" }}>Privacy</a>
        <a href="#" style={{ fontSize: 12, color: "var(--fg-2)" }}>Cookie</a>
        <a href="#" style={{ fontSize: 12, color: "var(--fg-2)" }}>Termini</a>
      </div>
    </div>
  </footer>
);

export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="grid">
      <div>
        <Logo onDark/>
        <p style={{ fontSize: 13, color: "var(--ink-200)", maxWidth: 320, marginTop: 16, lineHeight: 1.55 }}>
          Dichiarazione di successione in 48 ore, completamente online. Ti accompagniamo dall'inizio fino all'invio all'Agenzia delle Entrate.
        </p>
      </div>
      <div>
        <h6>Servizio</h6>
        <ul>
          <li><a href="#">Come funziona</a></li>
          <li><a href="#">Tariffe</a></li>
          <li><a href="#">Tempistiche</a></li>
          <li><a href="#">Casi complessi</a></li>
        </ul>
      </div>
      <div>
        <h6>Risorse</h6>
        <ul>
          <li><a href="#">Domande frequenti</a></li>
          <li><a href="#">Glossario</a></li>
          <li><a href="#">Guide gratuite</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div>
        <h6>Contatti</h6>
        <ul>
          <li><a href="#">+39 02 1234 5678</a></li>
          <li><a href="#">aiuto@prontasuccessione.it</a></li>
          <li style={{ color: "var(--ink-300)", fontSize: 12, marginTop: 8 }}>Lun – Ven · 9 – 18</li>
        </ul>
      </div>
    </div>
    <div className="legal">
      <small>© 2026 ProntaSuccessione S.r.l. · P. IVA 12345670010 · Via del Corso 12, Milano</small>
      <div className="row gap-4">
        <a href="#">Privacy</a><a href="#">Cookie</a><a href="#">Termini</a>
      </div>
    </div>
  </footer>
);

export const Avatar = ({ size = 32, initials = "GS" }: { size?: number; initials?: string }) => (
  <span style={{
    width: size, height: size, borderRadius: 999,
    background: "linear-gradient(155deg, var(--paper-500) 0%, var(--seal-600) 60%, var(--seal-700) 100%)",
    flexShrink: 0, fontSize: size * 0.34,
    color: "#fbf6ec", fontFamily: "var(--font-serif)", fontWeight: 600,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    letterSpacing: "0.02em",
  }}>{initials}</span>
);
