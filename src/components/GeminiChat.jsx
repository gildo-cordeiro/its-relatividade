import { useState, useRef, useEffect } from "react";
import { useGemini, buildTutorPrompt } from "../hooks/useGemini";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function GeminiChat({
  concept,
  problem,
  problemIdx,
  selectedOptionIdx,
  onPenalty,
  tutorTrigger,
}) {
  const chatKey = `its_relatividade_chat_${concept.id}_${problemIdx}`;
  const penaltyKey = `its_relatividade_penalty_${concept.id}_${problemIdx}`;

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(chatKey);
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "assistant",
            text: `Olá! Estou aqui para ajudar com **${concept.full}**. Pode me perguntar qualquer coisa sobre o conceito ou o problema — mas lembre que cada ajuda tem custo de −10% na sua proficiência! 😄`,
          },
        ];
  });
  const [input, setInput] = useState("");
  const [penaltyApplied, setPenaltyApplied] = useState(() => {
    return localStorage.getItem(penaltyKey) === "true";
  });
  const { ask, loading } = useGemini();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const saved = localStorage.getItem(chatKey);
    const savedPenalty = localStorage.getItem(penaltyKey) === "true";
    setPenaltyApplied(savedPenalty);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: "assistant",
          text: `Olá! Estou aqui para ajudar com **${concept.full}**. Pode me perguntar qualquer coisa sobre o conceito ou o problema — mas lembre que cada ajuda tem custo de −10% na sua proficiência!`,
        },
      ]);
    }
  }, [concept.id, problemIdx]);

  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey]);

  useEffect(() => {
    localStorage.setItem(penaltyKey, String(penaltyApplied));
  }, [penaltyApplied, penaltyKey]);

  useEffect(() => {
    if (tutorTrigger) {
      send("Pode me explicar por que a alternativa que escolhi está incorreta e qual foi o meu erro?");
    }
  }, [tutorTrigger]);

  async function send(customMsg) {
    if (loading) return;
    const userMsg = typeof customMsg === "string" ? customMsg : input.trim();
    if (!userMsg) return;

    if (typeof customMsg !== "string") {
      setInput("");
    }

    if (!penaltyApplied) {
      onPenalty();
      setPenaltyApplied(true);
    }

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Obtém a alternativa selecionada e a concepção errônea se houver
    const selOpt =
      selectedOptionIdx !== null && selectedOptionIdx !== undefined
        ? problem.options[selectedOptionIdx]
        : null;
    const misconception =
      selOpt && typeof selOpt === "object" ? selOpt.misconception : null;

    const systemPrompt = buildTutorPrompt(concept, problem, misconception);

    const optionsText = problem.options
      .map((o, i) => `(${i + 1}) ${typeof o === "object" ? o.text : o}`)
      .join(", ");
    let contextMsg = `O aluno está resolvendo o seguinte problema de múltipla escolha:\n"${problem.q}"\nAlternativas: ${optionsText}\n`;

    if (selectedOptionIdx !== null && selectedOptionIdx !== undefined) {
      const selText = typeof selOpt === "object" ? selOpt.text : selOpt;
      const correctOpt = problem.options[problem.correct];
      const correctText =
        typeof correctOpt === "object" ? correctOpt.text : correctOpt;

      contextMsg += `O aluno respondeu e selecionou a alternativa: "${selText}". `;
      if (selectedOptionIdx === problem.correct) {
        contextMsg += `Esta alternativa está CORRETA.\n`;
      } else {
        contextMsg += `Esta alternativa está INCORRETA. A correta é: "${correctText}".\n`;
        if (misconception) {
          contextMsg += `Diagnóstico do erro (misconception): "${misconception}".\n`;
        }
      }
    } else {
      contextMsg += `O aluno ainda não respondeu a essa questão.\n`;
    }

    contextMsg += `\nPergunta do aluno: ${userMsg}`;

    const reply = await ask(systemPrompt, contextMsg);
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text: "⚠️ Não foi possível conectar ao Gemini. Verifique sua chave de API no arquivo .env (VITE_GEMINI_API_KEY) e aguarde alguns segundos antes de tentar novamente.",
        },
      ]);
    }
  }

  return (
    <div className="gemini-chat">
      <div className="chat-header">
        <div className="chat-header-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span>Tutor IA · Gemini</span>
        <span className="chat-penalty-badge">−10% por consulta</span>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg chat-msg-${m.role === "error" ? "error" : m.role}`}
          >
            {(m.role === "assistant" || m.role === "error") && (
              <div
                className={`chat-avatar ${m.role === "error" ? "chat-avatar-err" : ""}`}
              >
                {m.role === "error" ? "!" : "G"}
              </div>
            )}
            <div
              className={`chat-bubble ${m.role === "error" ? "chat-bubble-err" : ""}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                  ),
                  // Adicionado inline styles estritos para forçar os marcadores a ficarem dentro da área interna do balão
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{
                        listStylePosition: "inside",
                        paddingLeft: "0.5rem",
                      }}
                      className="list-disc mb-2 space-y-1"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      style={{
                        listStylePosition: "inside",
                        paddingLeft: "0.5rem",
                      }}
                      className="list-decimal mb-2 space-y-1"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-0.5" {...props} />
                  ),
                }}
              >
                {m.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg chat-msg-assistant">
            <div className="chat-avatar">G</div>
            <div className="chat-bubble chat-loading">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Pergunte sobre o conceito ou o problema..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={send}
          disabled={loading || !input.trim()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
