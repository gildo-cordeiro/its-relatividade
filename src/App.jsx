import { useState, useCallback } from "react";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { CONCEPTS } from "./data/concepts";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateNextBKT, getInitialProficiency } from "./utils/bkt";

function isUnlocked(id, prof) {
  const c = CONCEPTS.find((x) => x.id === id);
  return c.prereqs.every((p) => prof[p] >= 0.7);
}

export function nodeStatus(id, prof) {
  if (prof[id] >= 0.7) return "done";
  if (isUnlocked(id, prof)) return "active";
  return "locked";
}

export default function App() {
  const [prof, setProf] = useLocalStorage("its_relatividade_prof", () => getInitialProficiency(CONCEPTS));
  const [activeNode, setActiveNode] = useLocalStorage("its_relatividade_activeNode", 1);
  const [problemIdx, setProblemIdx] = useLocalStorage("its_relatividade_problemIdx", 0);
  const [selected, setSelected] = useLocalStorage("its_relatividade_selected", null);
  const [answered, setAnswered] = useLocalStorage("its_relatividade_answered", false);
  const [feedback, setFeedback] = useLocalStorage("its_relatividade_feedback", null);
  const [activeTab, setActiveTab] = useState("exercise");

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

      setProf(getInitialProficiency(CONCEPTS));
      setActiveNode(1);
      setProblemIdx(0);
      setSelected(null);
      setAnswered(false);
      setFeedback(null);
    }
  }, [setProf, setActiveNode, setProblemIdx, setSelected, setAnswered, setFeedback]);

  // Algoritmo Bayesian Knowledge Tracing (BKT) para atualizar o estado cognitivo do estudante
  const updateProfBKT = useCallback((id, isCorrect) => {
    setProf((prev) => {
      const prevL = prev[id];
      const nextL = calculateNextBKT(prevL, isCorrect);
      return {
        ...prev,
        [id]: nextL,
      };
    });
  }, [setProf]);

  const applyHintPenalty = useCallback((id) => {
    setProf((prev) => ({
      ...prev,
      [id]: parseFloat(Math.max(0, prev[id] - 0.1).toFixed(3)),
    }));
  }, [setProf]);

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
