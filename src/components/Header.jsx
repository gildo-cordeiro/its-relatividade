export default function Header({ onReset }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-icon">γ</div>
        <div>
          <h1 className="header-title">Relatividade Restrita</h1>
          <p className="header-sub">
            Sistema de Tutoria Inteligente · IMD0511 IAED 2026.1
          </p>
        </div>
      </div>
      <div
        className="header-right"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <button
          onClick={onReset}
          className="btn-reset"
          title="Reiniciar todo o progresso"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ marginRight: "4px" }}
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Resetar
        </button>
        <span className="header-badge">ITS</span>
      </div>
    </header>
  );
}
