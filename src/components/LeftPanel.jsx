import GeminiChat from "./GeminiChat";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function LeftPanel({
  concept,
  problem,
  problemIdx,
  prof,
  selected,
  answered,
  feedback,
  onAnswer,
  onNext,
  onHintPenalty,
}) {
  const pct = Math.round(prof[concept.id] * 100);

  return (
    <div className="left-panel">
      <div className="concept-header">
        <div className={`concept-badge badge-${pct >= 70 ? "done" : "active"}`}>
          {concept.sym}
        </div>
        <div className="concept-meta">
          <div className="meta-label">Nó {concept.id} de 4</div>
          <div className="meta-title">{concept.full}</div>
        </div>
        <div className="prof-display">
          <div
            className={`prof-pct ${pct >= 70 ? "prof-done" : "prof-active"}`}
          >
            {pct}%
          </div>
          <div className="prof-label">proficiência</div>
          <div className="prof-bar-wrap">
            <div
              className={`prof-bar ${pct >= 70 ? "prof-bar-done" : "prof-bar-active"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="desc-strip">{concept.desc}</div>

      <div className="problem-card">
        <div className="problem-eyebrow">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          Problema {problemIdx + 1} de {concept.problems.length}
        </div>
        <p className="problem-text">{problem.q}</p>
      </div>

      <div className="options-list">
        {problem.options.map((opt, i) => {
          let cls = "option-btn";
          if (answered) {
            if (i === problem.correct) cls += " option-correct";
            else if (i === selected && i !== problem.correct)
              cls += " option-wrong";
            else cls += " option-dim";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => onAnswer(i)}
              disabled={answered}
            >
              <span className="option-label">{OPTION_LABELS[i]}</span>
              <span className="option-text">
                {typeof opt === "object" ? opt.text : opt}
              </span>
              {answered && i === problem.correct && (
                <svg
                  className="option-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {answered && i === selected && i !== problem.correct && (
                <svg
                  className="option-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`feedback-box feedback-${feedback.type}`}>
          <div className="feedback-header">
            {feedback.type === "ok" ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                Correto!
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Incorreto
              </>
            )}
          </div>
          <p className="feedback-text">{feedback.msg}</p>
          <button className="btn-next" onClick={onNext}>
            {problemIdx + 1 < concept.problems.length
              ? "Próximo problema"
              : "Próximo nó"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}

      <GeminiChat
        concept={concept}
        problem={problem}
        problemIdx={problemIdx}
        selectedOptionIdx={selected}
        onPenalty={onHintPenalty}
      />
    </div>
  );
}
