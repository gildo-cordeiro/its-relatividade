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
          { text: "2c", misconception: "extreme_classical_addition" },
        ],
        correct: 2,
        explanation:
          "Pelo 2º postulado de Einstein, a velocidade da luz no vácuo é sempre $c$ para qualquer observador inercial, independente do movimento da fonte. Velocidades próximas à da luz não se somam de forma clássica.",
      },
      {
        q: "Quais dos seguintes referenciais são considerados inerciais, segundo o 1º Postulado da Relatividade?",
        options: [
          {
            text: "Apenas um carro acelerando",
            misconception: "accelerated_reference",
          },
          {
            text: "Apenas uma estação espacial em órbita circular",
            misconception: "circular_orbit_acceleration",
          },
          {
            text: "Um trem em velocidade constante e uma estação parada",
            misconception: null,
          },
          {
            text: "Qualquer referencial, incluindo os acelerados",
            misconception: "all_references_inercial",
          },
        ],
        correct: 2,
        explanation:
          "O 1º postulado se aplica exclusivamente a referenciais inerciais, que são aqueles em repouso ou em movimento retilíneo uniforme (velocidade constante). Um carro acelerando ou uma órbita circular envolvem aceleração, logo, não são inerciais.",
      },
      {
        q: "Por que a Mecânica Newtoniana falha para descrever objetos próximos à velocidade da luz?",
        options: [
          {
            text: "Porque Newton não conhecia a eletricidade",
            misconception: "historical_distractor",
          },
          {
            text: "Porque ela pressupõe que a velocidade da luz depende do movimento da fonte",
            misconception: null,
          },
          {
            text: "Porque foi criada antes dos aviões",
            misconception: "airplane_distractor",
          },
          {
            text: "Porque não inclui equações diferenciais",
            misconception: "mathematical_misconception",
          },
        ],
        correct: 1,
        explanation:
          "A Mecânica Newtoniana utiliza a transformação de Galileu, pressupondo que as velocidades se somam linearmente ($v_{total} = v_1 + v_2$). Isso faria com que a velocidade da luz variesse dependendo do referencial, o que contradiz o fato de $c$ ser uma constante universal.",
      },
    ],
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
          { text: "15 s", misconception: "incorrect_lorentz_factor" },
        ],
        correct: 2,
        explanation:
          "Aplicando a fórmula da dilatação: $\\Delta t = \\gamma \\cdot \\tau$. Substituindo os valores dados no problema, temos $\\Delta t = 1,25 \\times 10 = 12,5\\text{ s}$. O observador fora do sistema sempre medirá um tempo maior (dilatado) em relação ao tempo próprio.",
      },
      {
        q: "Múons criados na atmosfera a v ≈ 0,98c têm tempo de vida próprio de τ = 2,2 μs. Com γ ≈ 5, por que eles conseguem chegar à superfície da Terra antes de decair?",
        options: [
          {
            text: "Porque a Terra está se movendo em direção a eles",
            misconception: "incorrect_earth_movement",
          },
          {
            text: "Porque o tempo de vida deles dilata para ~11 μs no referencial da Terra",
            misconception: null,
          },
          {
            text: "Porque eles não têm massa e viajam mais rápido que a luz",
            misconception: "massless_particle_misconception",
          },
          {
            text: "Porque a atmosfera encurta o percurso para 2 km",
            misconception: "incorrect_frame_contraction_explanation",
          },
        ],
        correct: 1,
        explanation:
          "No referencial da Terra, o tempo de vida dos múons sofre dilatação: $\\Delta t = \\gamma \\cdot \\tau = 5 \\times 2,2\\mu\\text{s} = 11\\mu\\text{s}$. Sob a perspectiva terrestre, esse tempo estendido é suficiente para que eles cruzem a atmosfera e atinjam o solo.",
      },
      {
        q: "O que acontece com o fator de Lorentz (γ) à medida que a velocidade (v) de um corpo se aproxima da velocidade da luz (c)?",
        options: [
          {
            text: "γ → 0, fazendo o tempo parar",
            misconception: "lorentz_limit_zero",
          },
          {
            text: "γ → 1, fazendo o tempo se normalizar",
            misconception: "lorentz_limit_one",
          },
          { text: "γ → ∞, tendendo ao infinito", misconception: null },
          {
            text: "γ → c, tornando o tempo negativo",
            misconception: "lorentz_limit_c",
          },
        ],
        correct: 2,
        explanation:
          "Na equação $\\gamma = 1/\\sqrt{1-v^2/c^2}$, quando $v \\to c$, a fração $v^2/c^2$ tende a $1$. Isso faz com que o denominador tenda a zero, empurrando o valor de $\\gamma$ ao infinito ($\\gamma \\to \\infty$). Isso impede que objetos massivos atinjam a velocidade da luz.",
      },
    ],
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
          { text: "60 m", misconception: "incorrect_contraction_ratio" },
        ],
        correct: 2,
        explanation:
          "Utilizando a fórmula da contração de Lorentz: $L = L_0 / \\gamma$. Substituindo os valores dados: $L = 100 / 1,25 = 80\\text{ m}$. O comprimento medido por observadores externos em repouso relativo sempre será menor que o comprimento próprio.",
      },
      {
        q: "No 'paradoxo do celeiro': um carro com L₀ = 12 m entra a γ = 2 numa garagem de 10 m. O que o observador na garagem mede como comprimento do carro em movimento?",
        options: [
          { text: "24 m", misconception: "length_dilation_barn" },
          { text: "12 m", misconception: "no_length_change_barn" },
          { text: "10 m", misconception: "garage_length_reference" },
          { text: "6 m", misconception: null },
        ],
        correct: 3,
        explanation:
          "Para o observador na garagem, o carro está em movimento rápido e sofre contração espacial: $L = L_0 / \\gamma = 12 / 2 = 6\\text{ m}$. Como $6\\text{ m} \\le 10\\text{ m}$, o carro cabe inteiramente dentro da garagem sob a perspectiva dela.",
      },
      {
        q: "A contração de Lorentz afeta quais dimensões de um objeto em movimento?",
        options: [
          {
            text: "Todas as dimensões igualmente (contração volumétrica isométrica)",
            misconception: "isotropic_contraction",
          },
          {
            text: "Apenas as dimensões perpendiculares à direção do movimento",
            misconception: "perpendicular_contraction",
          },
          {
            text: "Apenas a dimensão contida na linha paralela à direção do movimento",
            misconception: null,
          },
          {
            text: "Nenhuma dimensão, pois a contração é uma ilusão de ótica psicológica",
            misconception: "optical_illusion_misconception",
          },
        ],
        correct: 2,
        explanation:
          "A contração espacial relativística ocorre exclusivamente na dimensão paralela ao vetor velocidade do referencial. As dimensões perpendiculares e a altura/largura laterais que não seguem o eixo do movimento permanecem inalteradas.",
      },
    ],
  },
  {
    id: 5,
    sym: "⊕",
    title: "Adição de Velocidades",
    full: "Adição relativística de velocidades",
    desc: "A relatividade impõe que nada ultrapasse c. A soma de velocidades é dada por: u = (v + u') / (1 + vu'/c²).",
    prereqs: [3],
    problems: [
      {
        q: "Uma nave espacial se afasta da Terra a 0,8c e lança uma sonda para a frente com velocidade de 0,6c em relação à nave. Qual a velocidade da sonda medida por um observador na Terra?",
        options: [
          { text: "1,40c", misconception: "classical_velocity_addition" },
          { text: "0,95c", misconception: null },
          { text: "0,80c", misconception: "no_velocity_addition" },
          { text: "0,98c", misconception: "incorrect_math_addition" },
        ],
        correct: 1,
        explanation:
          "Usando a fórmula de adição relativística: $u = \\frac{v + u'}{1 + vu'/c^2} = \\frac{0,8c + 0,6c}{1 + 0,8 \\times 0,6} = \\frac{1,4c}{1 + 0,48} = \\frac{1,4c}{1,48} \\approx 0,946c$ (aproximadamente $0,95c$).",
      },
      {
        q: "Duas naves viajam em rota de colisão frontal direta, cada uma a 0,9c em relação a uma estação espacial central. Qual é a velocidade de aproximação de uma nave em relação à outra?",
        options: [
          { text: "1,80c", misconception: "classical_velocity_addition" },
          { text: "0,99c", misconception: null },
          { text: "0,90c", misconception: "no_velocity_addition" },
          { text: "1,00c (exatamente c)", misconception: "light_speed_limit_incorrect" },
        ],
        correct: 1,
        explanation:
          "No referencial de uma das naves, a outra vem com velocidade dada pela adição relativística: $u = \\frac{v + u'}{1 + vu'/c^2} = \\frac{0,9c + 0,9c}{1 + 0,9 \\times 0,9} = \\frac{1,8c}{1 + 0,81} = \\frac{1,8c}{1,81} \\approx 0,994c$.",
      },
      {
        q: "Se uma lanterna em uma nave a 0,99c emite um feixe de luz para a frente, qual a velocidade da luz em relação a um observador parado na plataforma de lançamento?",
        options: [
          { text: "1,99c", misconception: "classical_velocity_addition" },
          { text: "c", misconception: null },
          { text: "0,01c", misconception: "incorrect_subtraction" },
          { text: "0,99c", misconception: "incorrect_frame_speed" },
        ],
        correct: 1,
        explanation:
          "Embora a fórmula de adição dê $u = \\frac{0,99c + c}{1 + 0,99 \\times 1} = \\frac{1,99c}{1,99} = c$, sabemos diretamente do 2º Postulado que a velocidade da luz é sempre $c$ em qualquer referencial inercial.",
      },
    ],
  },
  {
    id: 6,
    sym: "fD",
    title: "Efeito Doppler",
    full: "Efeito Doppler Relativístico",
    desc: "A frequência observada da luz muda devido ao movimento relativo da fonte, combinando efeito clássico e dilatação do tempo: f_obs = f₀ · √((1 ∓ v/c) / (1 ± v/c)).",
    prereqs: [2],
    problems: [
      {
        q: "Uma galáxia distante está se afastando da Terra a v = 0,6c. Se ela emite luz com frequência própria $f_0$, qual a frequência $f_{obs}$ medida na Terra?",
        options: [
          { text: "0,50 f₀", misconception: null },
          { text: "0,80 f₀", misconception: "classical_doppler_subtraction" },
          { text: "2,00 f₀", misconception: "doppler_blueshift_confusion" },
          { text: "1,25 f₀", misconception: "only_lorentz_time_dilation" },
        ],
        correct: 0,
        explanation:
          "Para afastamento, a frequência diminui (redshift): $f_{obs} = f_0 \\sqrt{\\frac{1 - v/c}{1 + v/c}} = f_0 \\sqrt{\\frac{1 - 0,6}{1 + 0,6}} = f_0 \\sqrt{\\frac{0,4}{1,6}} = f_0 \\sqrt{0,25} = 0,5 f_0$.",
      },
      {
        q: "O desvio para o vermelho (redshift) relativístico de galáxias distantes é uma evidência cosmológica fundamental de qual fenômeno?",
        options: [
          { text: "Que o universo está em expansão acelerada", misconception: null },
          { text: "Que as estrelas estão esfriando rapidamente", misconception: "star_cooling_misconception" },
          { text: "Que a luz perde energia ao colidir com poeira cósmica", misconception: "tired_light_hypothesis" },
          { text: "Que o tempo passa mais rápido no espaço profundo", misconception: "time_dilation_misinterpretation" },
        ],
        correct: 0,
        explanation:
          "O desvio para o vermelho relativístico sistemático indica que as galáxias estão se afastando radialmente de nós, o que comprova a expansão contínua do próprio tecido do espaço-tempo.",
      },
      {
        q: "Se uma nave se aproxima rapidamente da Terra com velocidade v, qual é a expressão correta da frequência observada $f_{obs}$ (desvio para o azul - blueshift)?",
        options: [
          { text: "$f_{obs} = f_0 \\sqrt{\\frac{1 + v/c}{1 - v/c}}$", misconception: null },
          { text: "$f_{obs} = f_0 \\sqrt{\\frac{1 - v/c}{1 + v/c}}$", misconception: "doppler_redshift_formula" },
          { text: "$f_{obs} = f_0 (1 + v/c)$", misconception: "classical_doppler_approximation" },
          { text: "$f_{obs} = f_0 / \\gamma$", misconception: "only_lorentz_factor" },
        ],
        correct: 0,
        explanation:
          "No caso de aproximação, a frequência aumenta (blueshift), portanto os sinais dentro da raiz se invertem, dando a fórmula: $f_{obs} = f_0 \\sqrt{\\frac{1 + v/c}{1 - v/c}}$.",
      },
    ],
  },
  {
    id: 7,
    sym: "s²",
    title: "Espaço-Tempo",
    full: "Intervalo Espaço-Tempo",
    desc: "A distância quadridimensional invariante entre dois eventos no espaço-tempo, mantendo o mesmo valor em todos os referenciais: Δs² = (cΔt)² − Δx².",
    prereqs: [2, 3],
    problems: [
      {
        q: "Dois eventos ocorrem no mesmo local físico no referencial A (Δx_A = 0), separados por Δt_A = 4 s. No referencial B, que se move em relação a A, os eventos ocorrem separados por Δt_B = 5 s. Qual a distância espacial Δx_B entre os eventos em B? (Considere c = 3×10⁸ m/s).",
        options: [
          { text: "9×10⁸ m", misconception: null },
          { text: "12×10⁸ m", misconception: "classical_space_addition" },
          { text: "15×10⁸ m", misconception: "incorrect_spacetime_math" },
          { text: "0 m", misconception: "absolute_space_misconception" },
        ],
        correct: 0,
        explanation:
          "Pela invariância do intervalo: $\\Delta s^2 = (c\\Delta t_A)^2 - \\Delta x_A^2 = (c\\Delta t_B)^2 - \\Delta x_B^2$. Substituindo: $(c \\times 4)^2 - 0 = (c \\times 5)^2 - \\Delta x_B^2 \\Rightarrow 16c^2 = 25c^2 - \\Delta x_B^2 \\Rightarrow \\Delta x_B^2 = 9c^2 \\Rightarrow \\Delta x_B = 3c = 9\\times10^8\\text{ m}$.",
      },
      {
        q: "Um intervalo de espaço-tempo com Δs² > 0 (intervalo do tipo tempo) possui qual significado causal?",
        options: [
          { text: "É possível existir uma relação de causa e efeito física entre os eventos", misconception: null },
          { text: "Os eventos são tão distantes que nenhuma informação pôde ligá-los", misconception: "spacelike_misconception" },
          { text: "Os eventos ocorrem no mesmo instante de tempo para todos", misconception: "absolute_simultaneity_misconception" },
          { text: "A velocidade necessária para viajar entre os eventos é maior que c", misconception: "tachyon_misconception" },
        ],
        correct: 0,
        explanation:
          "Um intervalo do tipo tempo ($\\Delta s^2 > 0$) significa que a separação temporal é maior que a espacial. Assim, uma partícula ou sinal viajando abaixo da velocidade da luz pode ir de um evento a outro, permitindo relação de causa e efeito.",
      },
      {
        q: "Se dois eventos possuem um intervalo do tipo espaço (Δs² < 0), o que se pode afirmar sobre a ordem temporal deles em diferentes referenciais?",
        options: [
          { text: "Diferentes observadores inerciais podem discordar sobre qual evento ocorreu primeiro", misconception: null },
          { text: "Todos os observadores concordarão sobre a ordem cronológica deles", misconception: "causal_preservation_misconception" },
          { text: "Os eventos são obrigatoriamente simultâneos para todos", misconception: "absolute_simultaneity_misconception" },
          { text: "Eles ocorrem necessariamente no mesmo local físico", misconception: "timelike_misconception" },
        ],
        correct: 0,
        explanation:
          "Eventos do tipo espaço ($\\Delta s^2 < 0$) são causalmente desconectados. Como nenhuma informação pode ligar os dois eventos (pois exigiria velocidade maior que $c$), a ordem temporal deles depende do referencial do observador.",
      },
    ],
  },
  {
    id: 8,
    sym: "p",
    title: "Momento Relativístico",
    full: "Momento linear relativístico",
    desc: "Generalização do momento clássico para garantir a conservação do momento em colisões de altas velocidades: p = γ · m · v.",
    prereqs: [5],
    problems: [
      {
        q: "Um elétron de massa m viaja com velocidade v = 0,8c (γ = 5/3 ≈ 1,67). Qual é o módulo do seu momento linear relativístico p?",
        options: [
          { text: "1,33 mc", misconception: null },
          { text: "0,80 mc", misconception: "classical_momentum" },
          { text: "1,67 mc", misconception: "only_gamma_momentum" },
          { text: "2,08 mc", misconception: "incorrect_gamma_multiplication" },
        ],
        correct: 0,
        explanation:
          "Usando a fórmula do momento relativístico: $p = \\gamma m v$. Substituindo os valores: $p = 1,67 \\times m \\times 0,8c = 1,333 mc$.",
      },
      {
        q: "Por que o momento relativístico p = γmv é usado em vez do clássico p = mv na física de altas energias?",
        options: [
          { text: "Porque a fórmula clássica violaria a lei de conservação do momento em colisões rápidas", misconception: null },
          { text: "Porque a massa de repouso das partículas aumenta com a velocidade", misconception: "relativistic_mass_misconception" },
          { text: "Porque o momento clássico cai para zero à medida que v se aproxima de c", misconception: "classical_momentum_zero" },
          { text: "Porque a física clássica só se aplica a objetos macroscópicos em repouso", misconception: "scale_misconception" },
        ],
        correct: 0,
        explanation:
          "Se usássemos a definição clássica $p=mv$ em colisões de alta velocidade, a lei fundamental da conservação do momento não seria invariante de Lorentz, ou seja, falharia para observadores em movimento.",
      },
      {
        q: "Qual a relação fundamental que une a Energia total E, o Momento relativístico p e a Massa de repouso m de uma partícula?",
        options: [
          { text: "E² = (pc)² + (mc²)²", misconception: null },
          { text: "E = pc + mc²", misconception: "linear_energy_addition" },
          { text: "E = γ(pc + mc²)", misconception: "redundant_gamma_energy" },
          { text: "E² = pc² + mc²", misconception: "dimensionally_incorrect_energy" },
        ],
        correct: 0,
        explanation:
          "A equação de energia e momento relativística é $E^2 = (pc)^2 + (mc^2)^2$. Para partículas sem massa (como o fóton), ela reduz-se a $E=pc$.",
      },
    ],
  },
  {
    id: 4,
    sym: "E",
    title: "Energia e E = mc²",
    full: "Equivalência massa-energia",
    desc: "Energia de repouso dada por E₀ = mc² e energia total por E = γmc². Corpos com massa necessitam de energia infinita para atingir c.",
    prereqs: [8],
    problems: [
      {
        q: "Qual é a energia de repouso contida em 1 g (0,001 kg) de matéria? Considere c = 3×10⁸ m/s.",
        options: [
          { text: "9×10¹⁰ J", misconception: "incorrect_c_square_power" },
          { text: "9×10¹³ J", misconception: null },
          { text: "3×10⁵ J", misconception: "incorrect_c_formula" },
          { text: "6×10²³ J", misconception: "avogadro_number_confusion" },
        ],
        correct: 1,
        explanation:
          "Usando a famosa equação de Einstein: $E_0 = mc^2$. Substituindo os valores em unidades do SI: $E_0 = 0,001 \\times (3\\times10^8)^2 = 0,001 \\times 9\\times10^{16} = 9\\times10^{13}\\text{ J}$. Uma quantidade colossal de energia vinda de apenas um grama.",
      },
      {
        q: "Por que é estritamente impossível acelerar uma partícula com massa de repouso real até a velocidade da luz c?",
        options: [
          {
            text: "Porque a resistência térmica do meio impede o ganho cinético estável",
            misconception: "thermal_resistance_distractor",
          },
          {
            text: "Porque a energia cinética relativística dada por K = (γ−1)mc² tende ao infinito quando v → c",
            misconception: null,
          },
          {
            text: "Porque a gravidade do próprio objeto colapsa o sistema antes de atingir a meta",
            misconception: "gravitational_collapse_distractor",
          },
          {
            text: "Porque fótons externos colidem e barram o empuxo contínuo",
            misconception: "photon_collision_distractor",
          },
        ],
        correct: 1,
        explanation:
          "A energia cinética necessária para mover um corpo massivo é $K = (\\gamma - 1)mc^2$. À medida que $v \\to c$, o fator $\\gamma \\to \\infty$, o que exige uma quantidade infinita de trabalho/energia para provocar o ganho final de velocidade, tornando a barreira intransponível.",
      },
      {
        q: "Quando uma partícula em repouso decai espontaneamente transformando-se inteiramente em dois fótons, o que houve com sua massa de repouso?",
        options: [
          {
            text: "A massa é destruída e violada, contrariando a conservação de energia universal",
            misconception: "mass_conservation_violation",
          },
          {
            text: "A massa de repouso foi inteiramente convertida em energia cinética/eletromagnética dos fótons",
            misconception: null,
          },
          {
            text: "A massa é dividida e transferida para os fótons, dando massa de repouso estática a eles",
            misconception: "photon_rest_mass_misconception",
          },
          {
            text: "A massa permanece no centro geométrico do sistema como uma gravidade fantasma",
            misconception: "gravitational_ghost_misconception",
          },
        ],
        correct: 1,
        explanation:
          "A massa de repouso da partícula original deixa de existir física e isoladamente, sendo 100% convertida na energia eletromagnética pura carregada pelos fótons resultantes seguindo rigorosamente a lei $E = mc^2$. Fótons carregam momento e energia, embora possuam massa de repouso nula.",
      },
    ],
  },
];
