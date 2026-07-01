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
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
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

  if (res.status === 429)
    throw Object.assign(new Error("rate_limit"), { status: 429 });
  if (res.status === 404)
    throw Object.assign(new Error("not_found"), { status: 404 });
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
            if (attempt === 0) {
              await sleep(2000);
              continue;
            }
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

    setError(
      "Não foi possível conectar ao Gemini. Verifique sua chave em .env (VITE_GEMINI_API_KEY) e aguarde alguns segundos.",
    );
    setLoading(false);
    return null;
  }, []);

  return { ask, loading, error };
}

export function buildTutorPrompt(concept, problem, misconception) {
  let extraRules = "";
  if (misconception) {
    if (misconception === "classical_velocity_addition") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou ao somar velocidades de forma linear/clássica (v + u'). Explique de forma didática que a velocidade da luz é o limite universal e que as velocidades se somam de forma relativística usando a fórmula $u = (v + u') / (1 + vu'/c²)$.";
    } else if (misconception === "no_velocity_addition") {
      extraRules =
        "\n- ATENÇÃO: O aluno desconsiderou totalmente a velocidade de uma das partes. Explique que na relatividade devemos combinar as velocidades relativísticas da fonte e do projétil/sonda/nave.";
    } else if (misconception === "incorrect_math_addition") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou nas contas ou na aplicação da fórmula de adição relativística de velocidades.";
    } else if (misconception === "light_speed_limit_incorrect") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou ao achar que duas naves massivas podem se aproximar exatamente na velocidade da luz ou superior. Lembre-o de que a velocidade de aproximação mútua de corpos massivos é sempre estritamente menor que c.";
    } else if (misconception === "classical_doppler_subtraction" || misconception === "classical_doppler_approximation") {
      extraRules =
        "\n- ATENÇÃO: O aluno tentou aplicar a fórmula clássica do Efeito Doppler. Destaque que a luz se comporta de forma relativística e que o efeito Doppler luminoso precisa considerar a dilatação temporal de Lorentz, gerando a fórmula $f_{obs} = f_0 \\sqrt{(1 - v/c)/(1 + v/c)}$ para afastamento.";
    } else if (misconception === "doppler_blueshift_confusion" || misconception === "doppler_redshift_formula") {
      extraRules =
        "\n- ATENÇÃO: O aluno confundiu desvio para o vermelho (redshift, frequência observada menor decorrente de afastamento) com desvio para o azul (blueshift, frequência observada maior decorrente de aproximação).";
    } else if (misconception === "only_lorentz_time_dilation" || misconception === "only_lorentz_factor") {
      extraRules =
        "\n- ATENÇÃO: O aluno considerou apenas o fator gama de dilatação temporal de Lorentz, esquecendo o efeito Doppler clássico de propagação da onda no espaço.";
    } else if (misconception === "tired_light_hypothesis") {
      extraRules =
        "\n- ATENÇÃO: O aluno mencionou a teoria obsoleta da 'luz cansada' (perda de energia por poeira). Explique que o redshift cosmológico decorre da própria expansão do tecido do espaço-tempo.";
    } else if (misconception === "time_dilation_misinterpretation") {
      extraRules =
        "\n- ATENÇÃO: O aluno interpretou de forma errada o efeito da dilatação temporal cósmica no redshift.";
    } else if (misconception === "classical_space_addition" || misconception === "absolute_space_misconception") {
      extraRules =
        "\n- ATENÇÃO: O aluno raciocinou usando espaço absoluto ou soma clássica de coordenadas. Relembre que o espaço e o tempo mudam entre referenciais, mas o intervalo de espaço-tempo $\\Delta s^2 = (c\\Delta t)^2 - \\Delta x^2$ permanece rigorosamente invariante.";
    } else if (misconception === "incorrect_spacetime_math") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou na manipulação matemática ou nos sinais da fórmula do intervalo quadridimensional $\\Delta s^2 = (c\\Delta t)^2 - \\Delta x^2$.";
    } else if (misconception === "spacelike_misconception" || misconception === "timelike_misconception" || misconception === "tachyon_misconception") {
      extraRules =
        "\n- ATENÇÃO: O aluno confundiu a definição ou o significado de intervalos do tipo espaço ($\\Delta s^2 < 0$, causalmente desconectados, ordem temporal mutável) e tipo tempo ($\\Delta s^2 > 0$, causalmente conectáveis, ordem temporal absoluta).";
    } else if (misconception === "causal_preservation_misconception" || misconception === "absolute_simultaneity_misconception") {
      extraRules =
        "\n- ATENÇÃO: O aluno acredita erroneamente na simultaneidade absoluta ou que todos os observadores concordam com a ordem temporal de eventos separados por intervalos do tipo espaço.";
    } else if (misconception === "classical_momentum") {
      extraRules =
        "\n- ATENÇÃO: O aluno tentou usar a equação clássica de momento linear $p = mv$. Explique que para velocidades próximas à da luz, devemos incluir o fator de Lorentz, resultando em $p = \\gamma m v$.";
    } else if (misconception === "only_gamma_momentum") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou ao considerar apenas o fator $\\gamma$ no momento linear relativístico, esquecendo de multiplicar pelo momento mecânico próprio.";
    } else if (misconception === "relativistic_mass_misconception") {
      extraRules =
        "\n- ATENÇÃO: O aluno usou o conceito defasado de que a 'massa aumenta com a velocidade'. Explique que a massa de repouso $m$ é uma propriedade intrínseca invariante da partícula e que o fator de Lorentz $\\gamma$ modifica a relação de momento e energia, não a massa em si.";
    } else if (misconception === "linear_energy_addition" || misconception === "redundant_gamma_energy" || misconception === "dimensionally_incorrect_energy") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou ao expressar ou manipular a relação entre Energia total $E$, Momento relativístico $p$ e Massa de repouso $m$. A relação correta é a hipérbole $E^2 = (pc)^2 + (mc^2)^2$.";
    } else if (misconception === "accelerated_reference") {
      extraRules =
        "\n- ATENÇÃO: O aluno errou ao considerar referenciais acelerados como inerciais. Explique de forma simples que referenciais inerciais são apenas aqueles que estão em repouso ou em movimento retilíneo uniforme (velocidade constante, sem aceleração).";
    } else if (misconception === "circular_orbit_acceleration") {
      extraRules =
        "\n- ATENÇÃO: O aluno esqueceu que órbitas circulares envolvem aceleração centrípeta e, por isso, não são referenciais inerciais.";
    } else if (misconception === "incorrect_subtraction") {
      extraRules =
        "\n- ATENÇÃO: O aluno tentou subtrair velocidades em relação à luz. Diga que a velocidade da luz c é uma constante e não muda.";
    } else if (misconception === "incorrect_time_contraction") {
      extraRules =
        "\n- ATENÇÃO: O aluno inverteu a dilatação temporal e calculou como se o tempo contraísse (passasse mais rápido para o observador). Lembre-o de que o tempo próprio é sempre o menor intervalo de tempo possível, e o tempo medido de fora é sempre dilatado (maior).";
    } else if (
      misconception === "incorrect_lorentz_factor" ||
      misconception === "lorentz_limit_zero" ||
      misconception === "lorentz_limit_one" ||
      misconception === "lorentz_limit_c"
    ) {
      extraRules =
        "\n- ATENÇÃO: O aluno errou no cálculo ou na interpretação do limite do Fator de Lorentz (γ). Esclareça que à medida que v se aproxima de c, γ tende ao infinito (γ → ∞), e que γ é sempre maior ou igual a 1 (γ ≥ 1).";
    } else if (
      misconception === "length_dilation" ||
      misconception === "length_dilation_barn"
    ) {
      extraRules =
        "\n- ATENÇÃO: O aluno inverteu a contração espacial (Lorentz) e calculou como se o comprimento aumentasse. Relembre-o de que o comprimento próprio L₀ é o maior comprimento medido, e que qualquer observador em movimento relativo medirá um comprimento contraído (menor).";
    } else if (misconception === "isotropic_contraction") {
      extraRules =
        "\n- ATENÇÃO: O aluno achou que a contração espacial ocorre em todas as direções de forma volumétrica. Explique que ela ocorre exclusivamente na direção paralela ao vetor velocidade (na linha do movimento).";
    } else if (misconception === "optical_illusion_misconception") {
      extraRules =
        "\n- ATENÇÃO: O aluno acredita que a contração espacial é apenas uma ilusão de ótica psicológica. Explique que ela é um efeito real de alteração da própria geometria do espaço-tempo.";
    } else if (
      misconception === "avogadro_number_confusion" ||
      misconception === "incorrect_c_square_power"
    ) {
      extraRules =
        "\n- ATENÇÃO: O aluno errou na potência matemática ou na substituição do valor de c² na fórmula E = mc².";
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
