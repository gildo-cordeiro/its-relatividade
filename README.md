# ITS · Relatividade Restrita
Sistema de Tutoria Inteligente — IMD0511 IAED 2026.1

Este é um **Sistema de Tutoria Inteligente (ITS)** voltado ao ensino de tópicos de Relatividade Restrita (ou Especial) para estudantes universitários de física e engenharia. O sistema adota a arquitetura clássica de tutores inteligentes, estendida com inteligência artificial generativa e modelagem cognitiva avançada para oferecer uma aprendizagem personalizada.

---

## 🚀 Diferenciais de IAED Avançada Implementados

Em comparação com a especificação original do pré-projeto, este sistema foi estendido com técnicas de última geração em Inteligência Artificial na Educação:

### 🧠 1. Modelagem do Aluno via Bayesian Knowledge Tracing (BKT)
Em vez de um acréscimo linear fixo (ex: $+20\%$ ou $-10\%$), o estado cognitivo e o domínio do aluno são calculados através de probabilidades bayesianas em tempo real:
* **Parâmetro $P(L_0)$ (Domínio Inicial):** Definido como `0.15` (15% de probabilidade do aluno já dominar o conceito).
* **Parâmetro $P(G)$ (Chute / Guess):** Definido como `0.25` (25% de chance de acerto aleatório em 4 alternativas).
* **Parâmetro $P(S)$ (Deslize / Slip):** Definido como `0.10` (10% de chance de errar por distração mesmo dominando o conceito).
* **Parâmetro $P(T)$ (Transição):** Definido como `0.20` (probabilidade de aprendizado a cada acerto).
* A proficiência é atualizada usando o **Teorema de Bayes** a cada resposta, fornecendo uma estimativa científica e adaptativa sobre se o estudante realmente domina a habilidade.

### 🎯 2. Remediação Pedagógica Baseada em Misconceptions (Concepções Errôneas)
* O **Modelo do Domínio** mapeia cada alternativa incorreta das questões (distratores) a um erro clássico da física (como `classical_velocity_addition` para soma linear de velocidades ou `length_dilation` para inversão de contração espacial).
* Quando o aluno erra, o **Modelo Pedagógico** diagnostica a falha específica e repassa esse contexto ao **Tutor IA (Google Gemini)**.
* O Gemini recebe instruções especializadas baseadas no erro cometido para corrigir especificamente a inadequação do raciocínio físico daquele distrator.

### 💾 3. Persistência de Progresso e Estado (`localStorage`)
* O progresso do aluno (proficiências BKT por nó, nó ativo, índice do problema atual) e as conversas com o Gemini são guardadas automaticamente no navegador.
* Isso evita perdas acidentais de progresso ao atualizar a página (F5) e previne a reaplicação de penalidades de dica caso a página seja recarregada.
* Foi incluído um botão de **"Resetar"** no cabeçalho com alerta de confirmação para limpar o progresso e recomeçar do zero.

---

## 🛠️ Stack Tecnológica
* **Frontend:** React 18 + Vite
* **Estilização:** CSS Puro (sem bibliotecas UI, layout responsivo em duas colunas fixas *split-screen*)
* **Integração de IA:** Google Gemini API (v1beta) com fallback automático de modelos
* **Matemática Científica:** `katex` + `rehype-katex` + `remark-math` (suporte completo a $\LaTeX$ em explicações e conversas com o tutor)

---

## 📐 Arquitetura do ITS (Burns & Capps)

| Módulo do ITS | Implementação no Código |
|---|---|
| **Modelo do Domínio (Especialista)** | `src/data/concepts.js` — conceitos encadeados por pré-requisitos em DAG, equações e distratores mapeados. |
| **Modelo do Aluno** | `src/App.jsx` — atualiza probabilidade de domínio BKT por nó, inicializado de forma dinâmica. |
| **Modelo Pedagógico** | `src/App.jsx` — fluxo adaptativo de avanço com corte $\ge 0.70$ (70%) para liberação de nós e penalidade de dicas ($-10\%$). |
| **Modelo de Interface** | `src/components/` — interface em duas colunas com chat de suporte integrado e mapa de conceitos interativo. |

---

## ⚙️ Configuração e Execução

### 1. Instalar as dependências
```bash
npm install
```

### 2. Configurar a Chave do Gemini
Copie o arquivo de exemplo para configurar o ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` e insira sua chave da API do Gemini:
```env
VITE_GEMINI_API_KEY=AIzaSy...
```
*(Você pode obter sua chave gratuitamente em https://aistudio.google.com/app/apikey)*

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

### 4. Build e Visualização de Produção
```bash
npm run build
npm run preview
```

---

## 📂 Estrutura de Diretórios
```
src/
  App.jsx              # Loop de controle principal, persistência e BKT
  main.jsx             # Ponto de entrada do React
  index.css            # Estilização global e responsividade
  data/
    concepts.js        # Banco de conceitos e problemas enriquecido com misconceptions
  hooks/
    useGemini.js       # Integração com o Gemini e gerador de prompts com remediação
  components/
    Header.jsx         # Cabeçalho da aplicação com botão de reset de progresso
    LeftPanel.jsx      # Painel de resolução de problemas e chat
    RightPanel.jsx     # Visualização do DAG, progresso do aluno e fórmulas
    GeminiChat.jsx     # Interface do chat persistente do tutor IA
```
