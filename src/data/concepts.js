export const CONCEPTS = [
  {
    id: 1,
    sym: "c",
    title: "Postulados",
    full: "Postulados da relatividade",
    desc: "Invariância das leis físicas em referenciais inerciais e constância da velocidade da luz (c ≈ 3×10⁸ m/s) para qualquer observador.",
    prereqs: [],
    problems: [
      {
        q: "Um trem se move a 0,5c em relação à plataforma. Um passageiro acende uma lanterna na direção do movimento. Para um observador na plataforma, qual é a velocidade da luz emitida pela lanterna?",
        options: [
          { text: "0,5c", misconception: "incorrect_subtraction" },
          { text: "1,5c", misconception: "classical_velocity_addition" },
          { text: "c", misconception: null },
          { text: "2c", misconception: "extreme_classical_addition" }
        ],
        correct: 2,
        explanation:
          "Pelo 2º postulado de Einstein, a velocidade da luz no vácuo é sempre $c$ para qualquer observador inercial, independente do movimento da fonte. Velocidades próximas à da luz não se somam de forma clássica."
      },
      {
        q: "Quais dos seguintes referenciais são considerados inerciais, segundo o 1º Postulado da Relatividade?",
        options: [
          { text: "Apenas um carro acelerando", misconception: "accelerated_reference" },
          { text: "Apenas uma estação espacial em órbita circular", misconception: "circular_orbit_acceleration" },
          { text: "Um trem em velocidade constante e uma estação parada", misconception: null },
          { text: "Qualquer referencial, incluindo os acelerados", misconception: "all_references_inercial" }
        ],
        correct: 2,
        explanation:
          "O 1º postulado se aplica exclusivamente a referenciais inerciais, que são aqueles em repouso ou em movimento retilíneo uniforme (velocidade constante). Um carro acelerando ou uma órbita circular envolvem aceleração, logo, não são inerciais."
      },
      {
        q: "Por que a Mecânica Newtoniana falha para descrever objetos próximos à velocidade da luz?",
        options: [
          { text: "Porque Newton não conhecia a eletricidade", misconception: "historical_distractor" },
          { text: "Porque ela pressupõe que a velocidade da luz depende do movimento da fonte", misconception: null },
          { text: "Because it was created before airplanes", misconception: "english_distractor" },
          { text: "Porque não inclui equações diferenciais", misconception: "mathematical_misconception" }
        ],
        correct: 1,
        explanation:
          "A Mecânica Newtoniana utiliza a transformação de Galileu, pressupondo que as velocidades se somam linearmente ($v_{total} = v_1 + v_2$). Isso faria com que a velocidade da luz variesse dependendo do referencial, o que contradiz o fato de $c$ ser uma constante universal."
      }
    ]
  },
  {
    id: 2,
    sym: "γ",
    title: "Dilatação do tempo",
    full: "Dilatação temporal",
    desc: "O tempo próprio (τ) é o menor intervalo de tempo possível. Para um observador em repouso relativo ao evento: Δt = γ · τ, onde γ = 1 / √(1 − v²/c²).",
    prereqs: [1],
    problems: [
      {
        q: "Uma nave viaja a v = 0,6c (γ = 1,25). O piloto mede a duração de um experimento como τ = 10 s (tempo próprio). Qual o tempo Δt medido por um observador na Terra?",
        options: [
          { text: "8 s", misconception: "incorrect_time_contraction" },
          { text: "10 s", misconception: "no_time_change" },
          { text: "12,5 s", misconception: null },
          { text: "15 s", misconception: "incorrect_lorentz_factor" }
        ],
        correct: 2,
        explanation:
          "Aplicando a fórmula da dilatação: $\\Delta t = \\gamma \\cdot \\tau$. Substituindo os valores dados no problema, temos $\\Delta t = 1,25 \\times 10 = 12,5\\text{ s}$. O observador fora do sistema sempre medirá um tempo maior (dilatado) em relação ao tempo próprio."
      },
      {
        q: "Múons criados na atmosfera a v ≈ 0,98c têm tempo de vida próprio de τ = 2,2 μs. Com γ ≈ 5, por que eles conseguem chegar à superfície da Terra antes de decair?",
        options: [
          { text: "Porque a Terra está se movendo em direção a eles", misconception: "incorrect_earth_movement" },
          { text: "Porque o tempo de vida deles dilata para ~11 μs no referencial da Terra", misconception: null },
          { text: "Porque eles não têm massa e viajam mais rápido que a luz", misconception: "massless_particle_misconception" },
          { text: "Porque a atmosfera encurta o percurso para 2 km", misconception: "incorrect_frame_contraction_explanation" }
        ],
        correct: 1,
        explanation:
          "No referencial da Terra, o tempo de vida dos múons sofre dilatação: $\\Delta t = \\gamma \\cdot \\tau = 5 \\times 2,2\\mu\\text{s} = 11\\mu\\text{s}$. Sob a perspectiva terrestre, esse tempo estendido é suficiente para que eles cruzem a atmosfera e atinjam o solo."
      },
      {
        q: "O que acontece com o fator de Lorentz (γ) à medida que a velocidade (v) de um corpo se aproxima da velocidade da luz (c)?",
        options: [
          { text: "γ → 0, fazendo o tempo parar", misconception: "lorentz_limit_zero" },
          { text: "γ → 1, fazendo o tempo se normalizar", misconception: "lorentz_limit_one" },
          { text: "γ → ∞, tendendo ao infinito", misconception: null },
          { text: "γ → c, tornando o tempo negativo", misconception: "lorentz_limit_c" }
        ],
        correct: 2,
        explanation:
          "Na equação $\\gamma = 1/\\sqrt{1-v^2/c^2}$, quando $v \\to c$, a fração $v^2/c^2$ tende a $1$. Isso faz com que o denominador tenda a zero, empurrando o valor de $\\gamma$ ao infinito ($\\gamma \\to \\infty$). Isso impede que objetos massivos atinjam a velocidade da luz."
      }
    ]
  },
  {
    id: 3,
    sym: "L",
    title: "Contração do espaço",
    full: "Contração de Lorentz",
    desc: "O comprimento próprio (L₀) é o maior comprimento possível. Na direção do movimento: L = L₀ / γ. Dimensões perpendiculares ao deslocamento não mudam.",
    prereqs: [2],
    problems: [
      {
        q: "Uma nave com comprimento próprio L₀ = 100 m viaja a v = 0,6c (γ = 1,25). Qual o comprimento medido por um observador estacionário na Terra?",
        options: [
          { text: "125 m", misconception: "length_dilation" },
          { text: "100 m", misconception: "no_length_change" },
          { text: "80 m", misconception: null },
          { text: "60 m", misconception: "incorrect_contraction_ratio" }
        ],
        correct: 2,
        explanation:
          "Utilizando a fórmula da contração de Lorentz: $L = L_0 / \\gamma$. Substituindo os valores dados: $L = 100 / 1,25 = 80\\text{ m}$. O comprimento medido por observadores externos em repouso relativo sempre será menor que o comprimento próprio."
      },
      {
        q: "No 'paradoxo do celeiro': um carro com L₀ = 12 m entra a γ = 2 numa garagem de 10 m. O que o observador na garagem mede como comprimento do carro em movimento?",
        options: [
          { text: "24 m", misconception: "length_dilation_barn" },
          { text: "12 m", misconception: "no_length_change_barn" },
          { text: "10 m", misconception: "garage_length_reference" },
          { text: "6 m", misconception: null }
        ],
        correct: 3,
        explanation:
          "Para o observador na garagem, o carro está em movimento rápido e sofre contração espacial: $L = L_0 / \\gamma = 12 / 2 = 6\\text{ m}$. Como $6\\text{ m} \\le 10\\text{ m}$, o carro cabe inteiramente dentro da garagem sob a perspectiva dela."
      },
      {
        q: "A contração de Lorentz afeta quais dimensões de um objeto em movimento?",
        options: [
          { text: "Todas as dimensões igualmente (contração volumétrica isométrica)", misconception: "isotropic_contraction" },
          { text: "Apenas as dimensões perpendiculares à direção do movimento", misconception: "perpendicular_contraction" },
          { text: "Apenas a dimensão contida na linha paralela à direção do movimento", misconception: null },
          { text: "Nenhuma dimensão, pois a contração é uma ilusão de ótica psicológica", misconception: "optical_illusion_misconception" }
        ],
        correct: 2,
        explanation:
          "A contração espacial relativística ocorre exclusivamente na dimensão paralela ao vetor velocidade do referencial. As dimensões perpendiculares e a altura/largura laterais que não seguem o eixo do movimento permanecem inalteradas."
      }
    ]
  },
  {
    id: 4,
    sym: "E",
    title: "Energia e E = mc²",
    full: "Equivalência massa-energia",
    desc: "Energia de repouso dada por E₀ = mc² e energia total por E = γmc². Corpos com massa necessitam de energia infinita para atingir c.",
    prereqs: [3],
    problems: [
      {
        q: "Qual é a energia de repouso contida em 1 g (0,001 kg) de matéria? Considere c = 3×10⁸ m/s.",
        options: [
          { text: "9×10¹⁰ J", misconception: "incorrect_c_square_power" },
          { text: "9×10¹³ J", misconception: null },
          { text: "3×10⁵ J", misconception: "incorrect_c_formula" },
          { text: "6×10²³ J", misconception: "avogadro_number_confusion" }
        ],
        correct: 1,
        explanation:
          "Usando a famosa equação de Einstein: $E_0 = mc^2$. Substituindo os valores em unidades do SI: $E_0 = 0,001 \\times (3\\times10^8)^2 = 0,001 \\times 9\\times10^{16} = 9\\times10^{13}\\text{ J}$. Uma quantidade colossal de energia vinda de apenas um grama."
      },
      {
        q: "Por que é estritamente impossível acelerar uma partícula com massa de repouso real até a velocidade da luz c?",
        options: [
          { text: "Porque a resistência térmica do meio impede o ganho cinético estável", misconception: "thermal_resistance_distractor" },
          { text: "Porque a energia cinética relativística dada por K = (γ−1)mc² tende ao infinito quando v → c", misconception: null },
          { text: "Porque a gravidade do próprio objeto colapsa o sistema antes de atingir a meta", misconception: "gravitational_collapse_distractor" },
          { text: "Porque fótons externos colidem e barram o empuxo contínuo", misconception: "photon_collision_distractor" }
        ],
        correct: 1,
        explanation:
          "A energia cinética necessária para mover um corpo massivo é $K = (\\gamma - 1)mc^2$. À medida que $v \\to c$, o fator $\\gamma \\to \\infty$, o que exige uma quantidade infinita de trabalho/energia para provocar o ganho final de velocidade, tornando a barreira intransponível."
      },
      {
        q: "Quando uma partícula em repouso decai espontaneamente transformando-se inteiramente em dois fótons, o que houve com sua massa de repouso?",
        options: [
          { text: "A massa é destruída e violada, contrariando a conservação de energia universal", misconception: "mass_conservation_violation" },
          { text: "A massa de repouso foi inteiramente convertida em energia cinética/eletromagnética dos fótons", misconception: null },
          { text: "A massa é dividida e transferida para os fótons, dando massa de repouso estática a eles", misconception: "photon_rest_mass_misconception" },
          { text: "A massa permanece no centro geométrico do sistema como uma gravidade fantasma", misconception: "gravitational_ghost_misconception" }
        ],
        correct: 1,
        explanation:
          "A massa de repouso da partícula original deixa de existir física e isoladamente, sendo 100% convertida na energia eletromagnética pura carregada pelos fótons resultantes seguindo rigorosamente a lei $E = mc^2$. Fótons carregam momento e energia, embora possuam massa de repouso nula."
      }
    ]
  }
];