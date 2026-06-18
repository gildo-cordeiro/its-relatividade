import { useState, useCallback } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Modelos em ordem de preferência — atualizados para evitar o erro 404 na v1beta
const MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash-8b",
];

function geminiUrl(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

async function callGemini(model, systemPrompt, userMessage) {
  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      { role: "user", parts: [{ text: userMessage }] },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048, // Aumentado para evitar que a resposta seja cortada
    },
  };

  const res = await fetch(geminiUrl(model), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 429) throw Object.assign(new Error("rate_limit"), { status: 429 });
  if (res.status === 404) throw Object.assign(new Error("not_found"), { status: 404 });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 120)}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = useCallback(async (systemPrompt, userMessage) => {
    setLoading(true);
    setError(null);

    for (const model of MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const text = await callGemini(model, systemPrompt, userMessage);
          setLoading(false);
          return text ?? "O tutor não retornou uma resposta. Tente novamente.";
        } catch (e) {
          if (e.status === 429) {
            if (attempt === 0) { await sleep(2000); continue; }
            break; 
          }
          if (e.status === 404) {
            break; 
          }
          console.warn(`Modelo ${model} falhou:`, e.message);
          break;
        }
      }
    }

    setError("Não foi possível conectar ao Gemini. Verifique sua chave em .env (VITE_GEMINI_API_KEY) e aguarde alguns segundos.");
    setLoading(false);
    return null;
  }, []);

  return { ask, loading, error };
}

export function buildTutorPrompt(concept, problem, misconception) {
  let extraRules = "";
  if (misconception) {
    if (misconception === "classical_velocity_addition") {
      extraRules = "\n- ATENÇÃO: O aluno errou ao somar velocidades de forma linear (v + c). Explique de forma didática que a velocidade da luz é invariante e que as velocidades não se somam de forma clássica (Galileana) na relatividade. Introduza a ideia da soma relativística de forma conceitual.";
    } else if (misconception === "accelerated_reference") {
      extraRules = "\n- ATENÇÃO: O aluno errou ao considerar referenciais acelerados como inerciais. Explique de forma simples que referenciais inerciais são apenas aqueles que estão em repouso ou em movimento retilíneo uniforme (velocidade constante, sem aceleração).";
    } else if (misconception === "circular_orbit_acceleration") {
      extraRules = "\n- ATENÇÃO: O aluno esqueceu que órbitas circulares envolvem aceleração centrípeta e, por isso, não são referenciais inerciais.";
    } else if (misconception === "incorrect_subtraction") {
      extraRules = "\n- ATENÇÃO: O aluno tentou subtrair velocidades em relação à luz. Diga que a velocidade da luz c é uma constante e não muda.";
    } else if (misconception === "incorrect_time_contraction") {
      extraRules = "\n- ATENÇÃO: O aluno inverteu a dilatação temporal e calculou como se o tempo contraísse (passasse mais rápido para o observador). Lembre-o de que o tempo próprio é sempre o menor intervalo de tempo possível, e o tempo medido de fora é sempre dilatado (maior).";
    } else if (misconception === "incorrect_lorentz_factor" || misconception === "lorentz_limit_zero" || misconception === "lorentz_limit_one" || misconception === "lorentz_limit_c") {
      extraRules = "\n- ATENÇÃO: O aluno errou no cálculo ou na interpretação do limite do Fator de Lorentz (γ). Esclareça que à medida que v se aproxima de c, γ tende ao infinito (γ → ∞), e que γ é sempre maior ou igual a 1 (γ ≥ 1).";
    } else if (misconception === "length_dilation" || misconception === "length_dilation_barn") {
      extraRules = "\n- ATENÇÃO: O aluno inverteu a contração espacial (Lorentz) e calculou como se o comprimento aumentasse. Relembre-o de que o comprimento próprio L₀ é o maior comprimento medido, e que qualquer observador em movimento relativo medirá um comprimento contraído (menor).";
    } else if (misconception === "isotropic_contraction") {
      extraRules = "\n- ATENÇÃO: O aluno achou que a contração espacial ocorre em todas as direções de forma volumétrica. Explique que ela ocorre exclusivamente na direção paralela ao vetor velocidade (na linha do movimento).";
    } else if (misconception === "optical_illusion_misconception") {
      extraRules = "\n- ATENÇÃO: O aluno acredita que a contração espacial é apenas uma ilusão de ótica psicológica. Explique que ela é um efeito real de alteração da própria geometria do espaço-tempo.";
    } else if (misconception === "avogadro_number_confusion" || misconception === "incorrect_c_square_power") {
      extraRules = "\n- ATENÇÃO: O aluno errou na potência matemática ou na substituição do valor de c² na fórmula E = mc².";
    }
  }

  return `Você é um tutor especialista em Física — Relatividade Restrita para estudantes universitários iniciantes.
Você está ensinando o conceito: "${concept.full}".
Descrição do conceito: ${concept.desc}
${extraRules}

Regras estritas de resposta:
- Seja extremamente direto, didático e encorajador.
- EVITE blocos densos de texto. Escreva parágrafos de no máximo 2 ou 3 linhas.
- Use listas com marcadores (bullet points) e negrito para destacar palavras-chave e tornar o texto fácil de escanear visualmente.
- Use exemplos concretos e analogias do dia a dia.
- IMPORTANTE: Toda e qualquer expressão matemática, variável isolada (como $c$, $v$, $E$, $t$) ou fórmula DEVE obrigatoriamente estar entre símbolos de cifrão simples para LaTeX inline. Exemplo: $c \\approx 3 \\times 10^8 \\text{ m/s}$ ou $E = mc^2$. Nunca escreva fórmulas ou variáveis sem os delimitadores $.
- Não dê a resposta correta diretamente se o aluno ainda não respondeu.
- Responda em português brasileiro.`;
}