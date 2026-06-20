/**
 * Bayesian Knowledge Tracing (BKT) utilities.
 */

// BKT standard model parameters
export const BKT_PARAMS = {
  P_L0: 0.15, // Probabilidade inicial de domínio (prior)
  P_T: 0.20,  // Probabilidade de transição (aprendizado)
  P_G: 0.25,  // Probabilidade de chute (guess) - 4 opções = 25%
  P_S: 0.10,  // Probabilidade de deslize (slip) - 10%
};

/**
 * Calculates the next proficiency value using BKT update equations.
 * 
 * @param {number} prevL Current proficiency (prior probability)
 * @param {boolean} isCorrect Whether the student got the answer correct
 * @returns {number} The updated proficiency (posterior probability)
 */
export function calculateNextBKT(prevL, isCorrect) {
  const { P_S, P_G, P_T } = BKT_PARAMS;
  
  let P_L_cond;
  if (isCorrect) {
    // Teorema de Bayes aplicado ao acerto
    P_L_cond = (prevL * (1 - P_S)) / (prevL * (1 - P_S) + (1 - prevL) * P_G);
  } else {
    // Teorema de Bayes aplicado ao erro
    P_L_cond = (prevL * P_S) / (prevL * P_S + (1 - prevL) * (1 - P_G));
  }

  // Aplica a transição de aprendizado
  const nextL = isCorrect ? P_L_cond + (1 - P_L_cond) * P_T : P_L_cond;

  // Garante que o valor fique estritamente entre 0 e 1, formatado com 3 casas decimais
  return parseFloat(Math.max(0, Math.min(1, nextL)).toFixed(3));
}

/**
 * Returns the default initial proficiency state for all concepts.
 * 
 * @param {Array} concepts Array of concepts
 * @returns {Object} Initial proficiency map
 */
export function getInitialProficiency(concepts) {
  const initial = {};
  concepts.forEach((c) => {
    initial[c.id] = BKT_PARAMS.P_L0;
  });
  return initial;
}
