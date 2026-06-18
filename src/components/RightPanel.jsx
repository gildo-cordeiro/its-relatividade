import { nodeStatus } from "../App";

const FORMULAS = [
  { sym: "γ", label: "Fator de Lorentz", eq: "γ = 1 / √(1 − v²/c²)" },
  { sym: "Δt", label: "Dilatação temporal", eq: "Δt = γ · τ" },
  { sym: "L", label: "Contração espacial", eq: "L = L₀ / γ" },
  { sym: "E", label: "Energia de repouso", eq: "E₀ = mc²" },
];

export default function RightPanel({ concepts, prof, activeNode, onSelectNode }) {
  const totalPct = Math.round((Object.values(prof).reduce((a, b) => a + b, 0) / concepts.length) * 100);

  return (
    <aside className="right-panel">
      <div className="section-label">Progresso geral</div>
      <div className="overall-card">
        <div className="overall-ring">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="none" stroke="#E5E3FC" strokeWidth="7" />
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke={totalPct >= 70 ? "#1D9E75" : "#7F77DD"}
              strokeWidth="7"
              strokeDasharray={`${(totalPct / 100) * 188.5} 188.5`}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
            <text x="36" y="40" textAnchor="middle" fontSize="15" fontWeight="500" fill={totalPct >= 70 ? "#0F6E56" : "#534AB7"}>
              {totalPct}%
            </text>
          </svg>
        </div>
        <div className="overall-info">
          <div className="overall-title">Domínio total</div>
          <div className="overall-sub">
            {Object.values(prof).filter((v) => v >= 0.7).length} de 4 nós dominados
          </div>
        </div>
      </div>

      <div className="section-label">Grafo de dependências</div>
      <div className="dag-list">
        {concepts.map((c, i) => {
          const st = nodeStatus(c.id, prof);
          const active = activeNode === c.id;
          const p = Math.round(prof[c.id] * 100);
          return (
            <div key={c.id}>
              <div
                className={`dag-node dag-${st}${active ? " dag-active" : ""}`}
                onClick={() => onSelectNode(c.id)}
                role="button"
                tabIndex={st === "locked" ? -1 : 0}
                onKeyDown={(e) => e.key === "Enter" && onSelectNode(c.id)}
                aria-disabled={st === "locked"}
              >
                <div className={`dag-icon dag-icon-${st}`}>
                  {st === "done" ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : st === "locked" ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  ) : (
                    <span className="dag-sym">{c.sym}</span>
                  )}
                </div>
                <div className="dag-info">
                  <div className="dag-title">{c.title}</div>
                  <div className="dag-sub">
                    {c.prereqs.length ? `Requer nó ${c.prereqs.join(", ")}` : "Ponto de partida"}
                  </div>
                  <div className="dag-bar-wrap">
                    <div
                      className={`dag-bar-fill ${st === "done" ? "dag-bar-done" : "dag-bar-prog"}`}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
                <div className={`dag-pct ${st === "done" ? "dag-pct-done" : st === "active" ? "dag-pct-active" : "dag-pct-locked"}`}>
                  {p}%
                </div>
              </div>
              {i < concepts.length - 1 && (
                <div className="dag-connector">
                  <div className="dag-connector-line" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="section-label">Fórmulas essenciais</div>
      <div className="formulas-list">
        {FORMULAS.map((f) => (
          <div key={f.sym} className="formula-row">
            <div className="formula-sym">{f.sym}</div>
            <div className="formula-info">
              <div className="formula-label">{f.label}</div>
              <code className="formula-eq">{f.eq}</code>
            </div>
          </div>
        ))}
      </div>

      <div className="rules-card">
        <div className="rules-title">Regras de proficiência</div>
        {[
          { icon: "↑", label: "Acerto (1ª tentativa)", val: "+20%", cls: "rule-pos" },
          { icon: "↓", label: "Erro na questão", val: "−10%", cls: "rule-neg" },
          { icon: "↓", label: "Consulta ao tutor IA", val: "−10%", cls: "rule-neg" },
          { icon: "→", label: "Critério de avanço", val: "≥ 70%", cls: "rule-info" },
        ].map((r) => (
          <div key={r.label} className="rule-row">
            <span className="rule-label">{r.label}</span>
            <span className={`rule-val ${r.cls}`}>{r.val}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
