// Sistemas que Marcus construiu na Poiesis. O código é privado: cada ficha descreve o problema,
// a arquitetura e o resultado, sem dados de pessoas, fornecedores ou valores.
// Combinado com o Marcus (out/2026): os sistemas aparecem pela função, nunca pelo nome interno,
// e o portal de fornecedores entra só com problema, stack e resultado, sem o desenho de segurança.

import type { DadosDoDiagrama } from '@/components/diagrama/Diagrama'

export interface SistemaPoiesis {
  id: string
  nome: string
  area: string
  periodo: string
  resumo: string
  problema: string
  construcao?: string[]
  stack: string[]
  resultado: string
  diagrama?: DadosDoDiagrama
  /** Cena da seção de projetos de IA que aprofunda uma parte deste sistema. */
  cena?: { id: string; rotulo: string }
}

/** Diagrama estático: todos os nós visíveis, nenhum fluxo destacado. */
function estatico(dados: Omit<DadosDoDiagrama, 'passos'>): DadosDoDiagrama {
  return { ...dados, passos: [{ titulo: '', texto: '', nos: dados.nos.map((no) => no.id), fluxo: [] }] }
}

const termos: SistemaPoiesis = {
  id: 'termos-de-referencia',
  nome: 'Sistema de elaboração e aprovação de termos de referência',
  area: 'Compras',
  periodo: 'mar. 2026 – hoje',
  resumo:
    'As unidades escrevem o termo de referência de cada compra e o sistema o leva pela cadeia de aprovação até o setor de compras, com IA para redigir e para consultar.',
  problema:
    'Toda compra começa por um termo de referência: o documento que define objeto, itens, prazos e critério de julgamento. Antes de chegar a compras, ele passa pela gestão da unidade, pelo jurídico e pelo patrimônio, e qualquer etapa pode devolvê-lo para ajuste. Quem pede precisa saber com quem o termo está; quem aprova, o que mudou desde a última leitura.',
  construcao: [
    'Criação em etapas com validação de cada campo, itens de catálogo ou manuais, anexos e rascunho.',
    'Cadeia de aprovação calculada pela unidade e pela área de quem pede, com delegações. Sem aprovador definido, o termo não avança.',
    'Revisão para aprovadores com comentários presos ao campo, pedido de ajuste e diferença entre versões; no fim, PDF padronizado.',
    'Avisos por e-mail e um resumo diário das pendências de cada pessoa.',
    'Banco de modelos com termos já aprovados, para reaproveitar o que deu certo.',
    'IA para redigir seções e um agente conversacional que consulta termos, itens, histórico e aprovações. Em desenvolvimento: criar o termo em conversa, com as regras do sistema ainda decidindo campos, cálculos e encaminhamento.',
  ],
  stack: ['Next.js', 'React', 'TypeScript', 'Supabase · PostgreSQL', 'NextAuth', 'React Hook Form', 'Zod', 'Gemini', 'Groq', 'IBM Carbon'],
  resultado:
    'Mais de 800 termos de referência criados e tramitados pelo sistema, cada um com o histórico de quem aprovou, pediu ajuste ou comentou, e o mesmo PDF ao final.',
  diagrama: estatico({
    nome: 'Sistema de elaboração e aprovação de termos de referência',
    largura: 1040,
    altura: 250,
    nos: [
      { id: 'unidade', rotulo: 'Unidade', sub: 'cria o termo', tipo: 'entrada', x: 90, y: 70, detalhe: '' },
      { id: 'termo', rotulo: 'Termo estruturado', sub: 'versões e anexos', tipo: 'dados', x: 300, y: 70, detalhe: '' },
      { id: 'cadeia', rotulo: 'Cadeia de aprovação', sub: 'por unidade e área', tipo: 'regra', x: 520, y: 70, detalhe: '' },
      { id: 'aprovadores', rotulo: 'Aprovadores', sub: 'etapas em sequência', tipo: 'entrada', x: 740, y: 70, detalhe: '' },
      { id: 'compras', rotulo: 'Compras', sub: 'PDF padronizado', tipo: 'saida', x: 950, y: 70, detalhe: '' },
      { id: 'ia', rotulo: 'IA', sub: 'redação e consulta', tipo: 'llm', x: 300, y: 200, detalhe: '' },
      { id: 'email', rotulo: 'E-mail', sub: 'pendências do dia', tipo: 'ferramenta', x: 740, y: 200, detalhe: '' },
    ],
    arestas: [
      { de: 'unidade', para: 'termo' },
      { de: 'ia', para: 'termo', rotulo: 'sugere texto' },
      { de: 'termo', para: 'cadeia' },
      { de: 'cadeia', para: 'aprovadores' },
      { de: 'aprovadores', para: 'termo', rotulo: 'ajuste', retorno: true },
      { de: 'aprovadores', para: 'compras', rotulo: 'aprovado' },
      { de: 'email', para: 'aprovadores', rotulo: 'avisa' },
    ],
  }),
  cena: { id: 'agente-tr', rotulo: 'Ver o agente conversacional passo a passo' },
}

const indicadores: SistemaPoiesis = {
  id: 'indicadores',
  nome: 'Painel e assistente de indicadores de formação cultural',
  area: 'Programas culturais',
  periodo: 'ago. 2026 – hoje',
  resumo:
    'Painéis de matrículas, frequência, certificação e evasão sobre o histórico de programas de formação artística, e um assistente que responde perguntas sobre esses indicadores.',
  problema:
    'O histórico dos programas está no banco do sistema anterior, com centenas de milhares de registros de turmas, matrículas e presença. A gestão precisava que cada indicador saísse igual em qualquer recorte: a mesma pessoa contada uma vez, o cancelamento com a mesma regra em toda tela, no painel e no relatório.',
  construcao: [
    'ETL do banco de origem para uma base de leitura. Chave nula ou duplicada interrompe a construção, e a versão anterior continua no ar.',
    'API em FastAPI com cache por versão da base, para cálculos pesados não repetirem leitura no banco em nuvem.',
    'Painéis com filtros por município, formato, linguagem artística e faixa etária, e exportação em CSV.',
    'Camada semântica: um catálogo de nove indicadores com fórmula, denominador e limitações. O modelo só interpreta a pergunta; o código gera o SQL.',
    'Assistente por texto e por voz.',
  ],
  stack: ['Python', 'FastAPI', 'Pydantic', 'React', 'TypeScript', 'Recharts', 'Turso · libSQL', 'Redis', 'Gemini', 'ElevenLabs'],
  resultado:
    'Um único conjunto de definições para painel, relatório e assistente, e um script que recalcula os indicadores direto das tabelas, sem passar pelo compilador, para conferir os números.',
  diagrama: estatico({
    nome: 'Painel e assistente de indicadores de formação cultural',
    largura: 1040,
    altura: 250,
    nos: [
      { id: 'origem', rotulo: 'Banco de origem', sub: 'turmas e matrículas', tipo: 'dados', x: 90, y: 70, detalhe: '' },
      { id: 'etl', rotulo: 'ETL', sub: 'valida as chaves', tipo: 'regra', x: 300, y: 70, detalhe: '' },
      { id: 'base', rotulo: 'Base de leitura', sub: 'versão imutável', tipo: 'dados', x: 520, y: 70, detalhe: '' },
      { id: 'api', rotulo: 'API', sub: 'cache por versão', tipo: 'regra', x: 740, y: 70, detalhe: '' },
      { id: 'paineis', rotulo: 'Painéis', sub: 'filtros e CSV', tipo: 'saida', x: 950, y: 70, detalhe: '' },
      { id: 'assistente', rotulo: 'Assistente', sub: 'texto e voz', tipo: 'llm', x: 300, y: 200, detalhe: '' },
      { id: 'semantica', rotulo: 'Camada semântica', sub: '9 indicadores', tipo: 'regra', x: 520, y: 200, detalhe: '' },
    ],
    arestas: [
      { de: 'origem', para: 'etl' },
      { de: 'etl', para: 'base', rotulo: 'publica' },
      { de: 'base', para: 'api' },
      { de: 'api', para: 'paineis' },
      { de: 'assistente', para: 'semantica', rotulo: 'intenção' },
      { de: 'semantica', para: 'base', rotulo: 'SQL' },
    ],
  }),
  cena: { id: 'indicadores', rotulo: 'Ver o assistente de indicadores passo a passo' },
}

const plataforma: SistemaPoiesis = {
  id: 'plataforma-ti',
  nome: 'Plataforma interna de TI e pessoas',
  area: 'TI e pessoas',
  periodo: 'jun. 2026 – hoje',
  resumo:
    'O sistema de trabalho da equipe de tecnologia: chamados, acessos, equipamentos, entrada e saída de colaboradores, base de conhecimento e projetos, com automações e uma camada de IA comum.',
  problema:
    'A equipe de tecnologia atende a organização inteira, e cada pedido tem prazo, responsável e risco. Na entrada de um colaborador, contas e acessos precisam existir no primeiro dia; na saída, precisam deixar de existir. Um acesso esquecido depois de um desligamento é um problema de segurança.',
  construcao: [
    'Módulos de chamados com prazo de atendimento, equipamentos, colaboradores, desligamentos, base de conhecimento e projetos, com tarefas em tabela, quadro e Gantt.',
    'Nove automações no n8n: fila de e-mails, chamados parados, resumo diário, acessos órfãos, roteamento de aprovação, criação e suspensão de contas, expiração de acessos e curadoria de conteúdo.',
    'O n8n dispara e repete; a ação sensível roda num endpoint interno da plataforma, para as chaves de Google e Bitrix não ficarem na ferramenta de automação.',
    'Camada de IA com um ponto único de chamada, modelo escolhido pela tarefa e registro de cada execução.',
    'Painel executivo com as entregas da automação e da IA.',
  ],
  stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'n8n', 'Anthropic', 'Gemini', 'OpenAI', 'Google Workspace API'],
  resultado:
    'Contas criadas e suspensas por fluxo automatizado; acessos órfãos e chamados parados apontados por rotina diária; e o uso de IA medido por funcionalidade, com o que falhou e onde.',
  cena: { id: 'plataforma-ia', rotulo: 'Ver a camada de IA e as automações passo a passo' },
}

const orcamento: SistemaPoiesis = {
  id: 'execucao-orcamentaria',
  nome: 'Painel executivo de execução orçamentária',
  area: 'Diretoria',
  periodo: 'jul. 2026',
  resumo:
    'Painel para a diretoria acompanhar a execução do orçamento de um contrato de gestão, do total ao detalhe por rubrica, unidade e mês, comparando com o ano anterior.',
  problema:
    'Os números vinham de planilhas orçamentárias, uma aba por unidade, com armadilhas: uma linha de total que soma bases diferentes, centros de custo que mudaram de um ano para outro e diferenças entre as abas. O público era a diretoria, que precisa ler uma conclusão, não operar uma ferramenta.',
  construcao: [
    'ETL das planilhas para um conjunto de dados versionado, que roda antes de todo build.',
    'Testes dourados: o resultado do ETL é comparado ao centavo com números conferidos por recomputação independente. Se algum diverge, o build falha.',
    'Duas camadas de leitura: a da diretoria, com um veredito em texto e um semáforo em cada indicador, e a analítica, para quem quer o detalhe.',
    'Inconsistências da planilha mostradas num selo de integridade, em vez de escondidas.',
    'Relatório para impressão, exportação em CSV e um assistente por voz.',
  ],
  stack: ['Next.js', 'React', 'TypeScript', 'ECharts', 'Supabase', 'Zustand', 'ElevenLabs', 'IBM Carbon'],
  resultado:
    'Um painel que se lê como relatório, com 53 números de referência conferidos por recomputação independente e nenhuma divergência.',
  diagrama: estatico({
    nome: 'Painel executivo de execução orçamentária',
    largura: 1040,
    altura: 250,
    nos: [
      { id: 'planilhas', rotulo: 'Planilhas', sub: 'uma aba por unidade', tipo: 'entrada', x: 90, y: 70, detalhe: '' },
      { id: 'etl', rotulo: 'ETL', sub: 'antes do build', tipo: 'regra', x: 300, y: 70, detalhe: '' },
      { id: 'dourados', rotulo: 'Testes dourados', sub: 'ao centavo', tipo: 'regra', x: 520, y: 70, detalhe: '' },
      { id: 'dados', rotulo: 'Dados versionados', sub: 'por exercício', tipo: 'dados', x: 740, y: 70, detalhe: '' },
      { id: 'painel', rotulo: 'Painel', sub: 'diretoria e análise', tipo: 'saida', x: 950, y: 70, detalhe: '' },
      { id: 'voz', rotulo: 'Assistente de voz', sub: 'ElevenLabs', tipo: 'llm', x: 950, y: 200, detalhe: '' },
    ],
    arestas: [
      { de: 'planilhas', para: 'etl' },
      { de: 'etl', para: 'dourados' },
      { de: 'dourados', para: 'etl', rotulo: 'diverge: build falha', retorno: true },
      { de: 'dourados', para: 'dados', rotulo: 'confere' },
      { de: 'dados', para: 'painel' },
      { de: 'dados', para: 'voz', rotulo: 'contexto' },
    ],
  }),
}

const fornecedores: SistemaPoiesis = {
  id: 'propostas-fornecedores',
  nome: 'Portal de propostas de fornecedores',
  area: 'Compras',
  periodo: 'mai. 2026 – hoje',
  resumo:
    'Plataforma web em que fornecedores se cadastram, leem os chamamentos públicos e enviam propostas, e em que a equipe de compras conduz cada chamamento da publicação ao resultado.',
  problema:
    'A Poiesis compra por chamamento público. Fornecedores de todo porte, muitos sem costume com sistemas, precisavam de um caminho único para se cadastrar, entender o edital e enviar a proposta dentro do prazo; a equipe de compras precisava receber tudo num lugar só.',
  stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Edge Functions · Deno', 'TanStack Query', 'IBM Carbon', 'i18next', 'Playwright', 'Vitest', 'Vercel'],
  resultado:
    'Chamamentos abertos numa página pública com o prazo de encerramento em destaque, cadastro guiado com consulta automática de CNPJ e CEP, envio da proposta em etapas e interface em português, inglês e espanhol. Testes de ponta a ponta cobrem cadastro, criação de edital e envio de proposta.',
}

export const SISTEMAS_POIESIS: SistemaPoiesis[] = [termos, indicadores, plataforma, orcamento, fornecedores]
