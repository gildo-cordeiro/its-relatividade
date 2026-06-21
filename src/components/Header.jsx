export default function Header({ onReset, darkMode, onToggleDarkMode }) {
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
          onClick={onToggleDarkMode}
          className="btn-dark-mode"
          title={darkMode ? "Modo claro" : "Modo escuro"}
        >
          {darkMode ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
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
