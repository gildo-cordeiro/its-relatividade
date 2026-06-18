# ITS · Relatividade Restrita
Sistema de Tutoria Inteligente — IMD0511 IAED 2026.1

## Autores
- Gildo Cordeiro Duarte
- Jonas Alves de Sena Neto

## Stack
- React 18 + Vite
- Google Gemini 2.0 Flash (tutor IA)
- CSS puro (sem UI lib)

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar arquivo .env
```bash
cp .env.example .env
```
Edite `.env` e insira sua chave do Gemini:
```
VITE_GEMINI_API_KEY=AIza...
```
Obtenha gratuitamente em: https://aistudio.google.com/app/apikey

### 3. Rodar em desenvolvimento
```bash
npm run dev
```

### 4. Build de produção
```bash
npm run build
npm run preview
```

## Estrutura do projeto
```
src/
  App.jsx              # Estado global e roteamento de nós
  main.jsx             # Entry point React
  index.css            # Todos os estilos
  data/
    concepts.js        # 4 nós do DAG com 3 questões cada (múltipla escolha)
  hooks/
    useGemini.js       # Integração com Gemini API
  components/
    Header.jsx         # Cabeçalho
    LeftPanel.jsx      # Problema + alternativas + feedback + chat
    RightPanel.jsx     # Grafo DAG + progresso + fórmulas + regras
    GeminiChat.jsx     # Chat com tutor IA (Gemini)
```

## Arquitetura ITS (Burns & Capps)
| Módulo | Implementação |
|---|---|
| Especialista | `data/concepts.js` — questões, gabarito, explicações |
| Aluno | `App.jsx` — proficiência [0,1] por conceito |
| Pedagógico | Lógica +20%/−10%, critério ≥70%, desbloqueio de nós |
| Interface | React + CSS, split-screen, chat Gemini |

## Regras de proficiência
- Acerto na 1ª tentativa: **+20%**
- Erro ou consulta ao tutor IA: **−10%**
- Critério de domínio (avança nó): **≥ 70%**
