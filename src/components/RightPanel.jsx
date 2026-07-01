import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { nodeStatus } from "../App";

const FORMULAS = [
  { sym: "γ", label: "Fator de Lorentz", eq: "$γ = 1 / \\sqrt{1 − v²/c²}$" },
  { sym: "Δt", label: "Dilatação temporal", eq: "$Δt = γ · τ$" },
  { sym: "L", label: "Contração espacial", eq: "$L = L₀ / γ$" },
  { sym: "⊕", label: "Soma de Velocidades", eq: "$u = \\frac{v + u'}{1 + vu'/c^2}$" },
  { sym: "f_D", label: "Doppler Relativístico", eq: "$f_{obs} = f_0 \\sqrt{\\frac{1 \\mp v/c}{1 \\pm v/c}}$" },
  { sym: "s²", label: "Intervalo Espaço-Tempo", eq: "$\\Delta s^2 = (c\\Delta t)^2 - \\Delta x^2$" },
  { sym: "p", label: "Momento Relativístico", eq: "$p = \\gamma m v$" },
  { sym: "E", label: "Energia Relativística", eq: "$E = \\gamma m c^2$ ou $E^2 = (pc)^2 + (mc^2)^2$" },
];

export default function RightPanel({
  concepts,
  prof,
  activeNode,
  onSelectNode,
}) {
  const [activeTab, setActiveTab] = useState("topics");
  
  const totalPct = Math.round(
    (Object.values(prof).reduce((a, b) => a + b, 0) / concepts.length) * 100,
  );

  return (
    <aside className="right-panel">
      <div className="right-panel-tabs">
        <button
          className={`panel-tab-btn ${activeTab === "topics" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("topics")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Tópicos e Progresso
        </button>
        <button
          className={`panel-tab-btn ${activeTab === "reference" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("reference")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Fórmulas e Regras
        </button>
      </div>

      {activeTab === "topics" ? (
        <>
          <div className="section-label">Progresso geral</div>
          <div className="overall-card">
            <div className="overall-ring">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="#E5E3FC"
                  strokeWidth="7"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke={totalPct >= 70 ? "#1D9E75" : "#7F77DD"}
                  strokeWidth="7"
                  strokeDasharray={`${(totalPct / 100) * 188.5} 188.5`}
                  strokeLinecap="round"
                  transform="rotate(-90 36 36)"
                />
                <text
                  x="36"
                  y="40"
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="500"
                  fill={totalPct >= 70 ? "#0F6E56" : "#534AB7"}
                >
                  {totalPct}%
                </text>
              </svg>
            </div>
            <div className="overall-info">
              <div className="overall-title">Domínio total</div>
              <div className="overall-sub">
                {Object.values(prof).filter((v) => v >= 0.7).length} de {concepts.length} nós dominados
              </div>
            </div>
          </div>

          <div className="section-label">Grafo de dependências</div>
          <div className="dag-list">
            {concepts.map((c) => {
              const st = nodeStatus(c.id, prof);
              const active = activeNode === c.id;
              const p = Math.round(prof[c.id] * 100);
              return (
                <div
                  key={c.id}
                  className={`dag-node dag-${st}${active ? " dag-active" : ""}`}
                  onClick={() => onSelectNode(c.id)}
                  role="button"
                  tabIndex={st === "locked" ? -1 : 0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectNode(c.id)}
                  aria-disabled={st === "locked"}
                >
                  <div className={`dag-icon dag-icon-${st}`}>
                    {st === "done" ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : st === "locked" ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
                      <span className="dag-sym">{c.sym}</span>
                    )}
                  </div>
                  <div className="dag-info">
                    <div className="dag-title">{c.title}</div>
                    <div className="dag-sub">
                      {c.prereqs.length
                        ? `Requer: ${c.prereqs.map(prereqId => concepts.find(con => con.id === prereqId)?.title).join(", ")}`
                        : "Ponto de partida"}
                    </div>
                    <div className="dag-bar-wrap">
                      <div
                        className={`dag-bar-fill ${st === "done" ? "dag-bar-done" : "dag-bar-prog"}`}
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                  <div
                    className={`dag-pct ${st === "done" ? "dag-pct-done" : st === "active" ? "dag-pct-active" : "dag-pct-locked"}`}
                  >
                    {p}%
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="section-label">Fórmulas essenciais</div>
          <div className="formulas-list">
            {FORMULAS.map((f) => (
              <div key={f.sym} className="formula-row">
                <div className="formula-header">
                  <span className="formula-sym">{f.sym}</span>
                  <span className="formula-label">{f.label}</span>
                </div>
                <div className="formula-body">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {f.eq}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div className="rules-card">
            <div className="rules-title">Regras de proficiência</div>
            {[
              {
                icon: "↑",
                label: "Acerto (1ª tentativa)",
                val: "Aprox. +20%",
                cls: "rule-pos",
              },
              { icon: "↓", label: "Erro na questão", val: "Aprox. −10%", cls: "rule-neg" },
              {
                icon: "↓",
                label: "Consulta ao tutor IA",
                val: "−10% (Fixo)",
                cls: "rule-neg",
              },
              {
                icon: "→",
                label: "Critério de avanço",
                val: "≥ 70%",
                cls: "rule-info",
              },
            ].map((r) => (
              <div key={r.label} className="rule-row">
                <span className="rule-label">{r.label}</span>
                <span className={`rule-val ${r.cls}`}>{r.val}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
