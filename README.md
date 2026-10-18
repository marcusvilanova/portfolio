# Portfólio — Marcus Vinícius Vila Nova

Portfólio em que a arquitetura de cada projeto se monta na tela enquanto a página rola. Cada bloco do diagrama abre o que ele faz, e cada passo traz o trecho de código correspondente.

## Como funciona

```mermaid
flowchart LR
    D[src/data/projetos-ia.ts<br/>nós, arestas e passos] --> C[CenaProjeto<br/>IntersectionObserver]
    C -->|passo ativo| G[Diagrama<br/>SVG]
    G -->|clique num nó| P[detalhe do nó]
    C --> B[BlocoDeCodigo<br/>realce próprio]
```

- **Dados separados do desenho.** Cada projeto é uma lista de nós (com tipo: modelo, regra, dados, ferramenta), arestas e passos. Um passo revela nós e destaca o fluxo que está acontecendo.
- **Diagrama em SVG puro.** As curvas saem da borda de cada caixa (`geometria.ts`); arestas de retorno, como o verificador devolvendo ao redator, fazem um arco por fora. Os pacotes de dados correm pelas arestas ativas com `animateMotion`.
- **Rolagem que dirige o estado.** Um `IntersectionObserver` marca como ativo o passo que cruza a faixa logo abaixo do diagrama fixo. Cada projeto mostra o progresso em segmentos (passo n de m) e um "Pular" para o seguinte.
- **Movimento ligado à rolagem, sem JavaScript.** As declarações de abertura de seção ganham tinta palavra a palavra e os blocos sobem ao entrar na tela, com CSS scroll-driven animations (`animation-timeline: view()`). Sem suporte no navegador, tudo aparece pronto.
- **Navegação fixa no rodapé.** Mostra a seção em que o visitante está; no celular a lista rola para o lado e mantém a seção ativa no centro.
- **Acessível.** Os nós são botões navegáveis por teclado. Com `prefers-reduced-motion`, nada anima e o exemplo da abertura não avança sozinho. Tema claro e escuro seguem o sistema.
- **Sem bibliotecas de UI.** Next.js, React e CSS Modules. O realce de sintaxe é uma função de 60 linhas.

Os trechos do projeto de RAG são cópias do [repositório público](https://github.com/marcusvilanova/rag-agentes-python). Os sistemas da Poiesis têm código privado: ali os trechos são reescritos para mostrar o padrão e aparecem marcados como ilustrativos. As fichas desses sistemas (`src/data/sistemas-poiesis.ts`) os descrevem pela função, sem nome interno, sem capturas de tela e sem dados de pessoas, fornecedores ou valores.

## Stack

Next.js 16 · React 19 · TypeScript · CSS Modules · IBM Plex Serif, Plex Sans e Plex Mono · Vercel

## Como rodar

```bash
npm install
npm run dev
```

`npm run build` gera a versão de produção. A página é estática.
