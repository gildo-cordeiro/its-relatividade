import { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { CONCEPTS } from "./data/concepts";

function isUnlocked(id, prof) {
  const c = CONCEPTS.find((x) => x.id === id);
  return c.prereqs.every((p) => prof[p] >= 0.7);
}

export function nodeStatus(id, prof) {
  if (prof[id] >= 0.7) return "done";
  if (isUnlocked(id, prof)) return "active";
  return "locked";
}

export function scaleProficiency(val) {
  if (val <= 0.15) return 0;
  if (val <= 0.7) {
    return Math.round(((val - 0.15) / 0.55) * 70);
  }
  return Math.round(70 + ((val - 0.7) / 0.3) * 30);
}

export default function App() {
  // Inicializamos a proficiência com 0.15 (15%), que representa a probabilidade inicial de domínio P(L0) no BKT ou lê do localStorage
  const [prof, setProf] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_prof");
    if (saved) return JSON.parse(saved);
    const initialProf = {};
    CONCEPTS.forEach((c) => {
      initialProf[c.id] = 0.15;
    });
    return initialProf;
  });
  const [activeNode, setActiveNode] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_activeNode");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [problemIdx, setProblemIdx] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_problemIdx");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_selected");
    return saved !== null && saved !== "null" && saved !== "undefined"
      ? parseInt(saved, 10)
      : null;
  });
  const [answered, setAnswered] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_answered");
    return saved === "true";
  });
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem("its_relatividade_feedback");
    return saved && saved !== "null" && saved !== "undefined"
      ? JSON.parse(saved)
      : null;
  });
  const [activeTab, setActiveTab] = useState("exercise");

  useEffect(() => {
    localStorage.setItem("its_relatividade_prof", JSON.stringify(prof));
  }, [prof]);

  useEffect(() => {
    localStorage.setItem("its_relatividade_activeNode", activeNode.toString());
  }, [activeNode]);

  useEffect(() => {
    localStorage.setItem("its_relatividade_problemIdx", problemIdx.toString());
  }, [problemIdx]);

  useEffect(() => {
    localStorage.setItem("its_relatividade_selected", String(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("its_relatividade_answered", String(answered));
  }, [answered]);

  useEffect(() => {
    localStorage.setItem("its_relatividade_feedback", JSON.stringify(feedback));
  }, [feedback]);

  const handleReset = useCallback(() => {
    if (
      window.confirm(
        "Deseja realmente resetar todo o seu progresso? Isso limpará suas proficiências e voltará ao início.",
      )
    ) {
      // Remove do localStorage as variáveis de progresso
      localStorage.removeItem("its_relatividade_prof");
      localStorage.removeItem("its_relatividade_activeNode");
      localStorage.removeItem("its_relatividade_problemIdx");
      localStorage.removeItem("its_relatividade_selected");
      localStorage.removeItem("its_relatividade_answered");
      localStorage.removeItem("its_relatividade_feedback");

      // Limpa todos os chats e penalidades acumuladas do localStorage
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          (key.startsWith("its_relatividade_chat_") ||
            key.startsWith("its_relatividade_penalty_"))
        ) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      const initialProf = {};
      CONCEPTS.forEach((c) => {
        initialProf[c.id] = 0.15;
      });
      setProf(initialProf);
      setActiveNode(1);
      setProblemIdx(0);
      setSelected(null);
      setAnswered(false);
      setFeedback(null);
    }
  }, []);

  // Algoritmo Bayesian Knowledge Tracing (BKT) para atualizar o estado cognitivo do estudante
  const updateProfBKT = useCallback((id, isCorrect) => {
    setProf((prev) => {
      const prevL = prev[id];
      // Parâmetros clássicos do modelo BKT
      const P_T = 0.2; // Probabilidade de transição de aprendizado
      const P_G = 0.25; // Probabilidade de chute (guess) - 4 alternativas = 25%
      const P_S = 0.1; // Probabilidade de deslize (slip) - 10%

      let P_L_cond;
      if (isCorrect) {
        // Teorema de Bayes aplicado ao acerto
        P_L_cond =
          (prevL * (1 - P_S)) / (prevL * (1 - P_S) + (1 - prevL) * P_G);
      } else {
        // Teorema de Bayes aplicado ao erro
        P_L_cond = (prevL * P_S) / (prevL * P_S + (1 - prevL) * (1 - P_G));
      }

      // Aplica a transição de aprendizado (no acerto há reforço pedagógico)
      const nextL = isCorrect ? P_L_cond + (1 - P_L_cond) * P_T : P_L_cond;

      return {
        ...prev,
        [id]: parseFloat(Math.max(0, Math.min(1, nextL)).toFixed(3)),
      };
    });
  }, []);

  const applyHintPenalty = useCallback((id) => {
    setProf((prev) => ({
      ...prev,
      [id]: parseFloat(Math.max(0, prev[id] - 0.1).toFixed(3)),
    }));
  }, []);

  const concept = CONCEPTS.find((c) => c.id === activeNode) || CONCEPTS[0];
  const problem = concept?.problems[problemIdx];

  function handleAnswer(optionIdx) {
    if (answered) return;
    setSelected(optionIdx);
    setAnswered(true);
    const correct = optionIdx === problem.correct;
    if (correct) {
      updateProfBKT(activeNode, true);
      setFeedback({ type: "ok", msg: problem.explanation });
    } else {
      updateProfBKT(activeNode, false);
      setFeedback({ type: "err", msg: problem.explanation });
    }
  }

  function handleHintPenalty() {
    applyHintPenalty(activeNode);
  }

  function next() {
    const nextPidx = problemIdx + 1;
    if (nextPidx < concept.problems.length) {
      setProblemIdx(nextPidx);
    } else {
      const nextNode = CONCEPTS.find(
        (c) => c.id > activeNode && isUnlocked(c.id, prof),
      );
      if (nextNode) {
        setActiveNode(nextNode.id);
        setProblemIdx(0);
      } else {
        // Se concluiu todas as questões mas não obteve proficiência suficiente,
        // reinicia as questões deste nó para permitir novas tentativas.
        setProblemIdx(0);
      }
    }
    setSelected(null);
    setAnswered(false);
    setFeedback(null);
  }

  function selectNode(id) {
    if (nodeStatus(id, prof) === "locked") return;
    setActiveNode(id);
    setProblemIdx(0);
    setSelected(null);
    setAnswered(false);
    setFeedback(null);
  }

  return (
    <div className="app-root">
      <Header onReset={handleReset} />
      
      <div className="mobile-tabs-bar">
        <button
          className={`mobile-tab-btn ${activeTab === "exercise" ? "active" : ""}`}
          onClick={() => setActiveTab("exercise")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ marginRight: "6px" }}
          >
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Exercício & Tutor
        </button>
        <button
          className={`mobile-tab-btn ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => setActiveTab("progress")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ marginRight: "6px" }}
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
          Mapa & Fórmulas
        </button>
      </div>

      <div className={`app-body show-${activeTab}`}>
        <LeftPanel
          concept={concept}
          problem={problem}
          problemIdx={problemIdx}
          prof={prof}
          selected={selected}
          answered={answered}
          feedback={feedback}
          onAnswer={handleAnswer}
          onNext={next}
          onHintPenalty={handleHintPenalty}
        />
        <RightPanel
          concepts={CONCEPTS}
          prof={prof}
          activeNode={activeNode}
          onSelectNode={selectNode}
        />
      </div>
    </div>
  );
}
