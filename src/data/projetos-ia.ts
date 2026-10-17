import type { Projeto } from './tipos'

// Trechos "real" são cópias literais do repositório público rag-agentes-python.
// Os projetos da Poiesis têm código privado: os trechos são reescritos para
// mostrar o padrão e vêm marcados como "ilustrativo".

const rag: Projeto = {
  id: 'rag-agentes',
  nome: 'RAG com agentes sobre legislação brasileira',
  contexto: 'Projeto pessoal · código aberto',
  resumo:
    'Perguntas e respostas sobre LGPD, Marco Civil, LAI, LDB e o decreto que criou o Senac. Três agentes em LangGraph classificam, redigem e verificam; nenhuma resposta sai sem citar o artigo que a sustenta.',
  stack: ['Python', 'LangGraph', 'MongoDB Atlas Vector Search', 'Milvus', 'Gemini', 'Langfuse', 'Redis', 'FastAPI', 'MCP'],
  link: { rotulo: 'Repositório', url: 'https://github.com/marcusvilanova/rag-agentes-python' },
  largura: 1040,
  altura: 440,
  nos: [
    { id: 'pergunta', rotulo: 'Pergunta', sub: 'POST /perguntar', tipo: 'entrada', x: 90, y: 110, detalhe: 'A API recebe a pergunta em português. Antes de qualquer chamada de modelo, ela passa pelo cache.' },
    { id: 'cache', rotulo: 'Redis', sub: 'cache exato', tipo: 'dados', x: 90, y: 300, detalhe: 'A chave é o hash da pergunta normalizada mais a assinatura da configuração. Trocar de modelo ou de corpus invalida o cache sozinho.' },
    { id: 'classificar', rotulo: 'Classificador', sub: 'saída estruturada', tipo: 'llm', x: 300, y: 110, detalhe: 'Encerra perguntas fora do corpus antes de gastar busca e redação, e reescreve a pergunta como consulta de busca.' },
    { id: 'recuperar', rotulo: 'Recuperação', sub: 'Atlas Vector Search', tipo: 'dados', x: 520, y: 110, detalhe: 'Não é um agente: só vetoriza a consulta (gemini-embedding-2, 768 dimensões) e busca os artigos mais próximos. O corpus foi fragmentado por artigo de lei, não por número de caracteres.' },
    { id: 'redigir', rotulo: 'Redator', sub: 'cita [n]', tipo: 'llm', x: 740, y: 110, detalhe: 'Responde usando apenas os trechos numerados. Sem base, devolve SEM_FUNDAMENTO em vez de inventar.' },
    { id: 'verificar', rotulo: 'Verificador', sub: 'regra + LLM', tipo: 'regra', x: 950, y: 210, detalhe: 'Primeiro uma checagem determinística (há citação? cada [n] existe?), depois um LLM que confere cada afirmação contra o trecho citado. Reprovada, volta ao redator com o motivo.' },
    { id: 'resposta', rotulo: 'Resposta', sub: 'com artigos citados', tipo: 'saida', x: 740, y: 330, detalhe: 'Só chega aqui o que o verificador aprovou. Fora do escopo ou sem fundamento, a API diz isso explicitamente.' },
    { id: 'langfuse', rotulo: 'Langfuse', sub: 'traces', tipo: 'ferramenta', x: 520, y: 330, detalhe: 'Cada chamada de LLM do grafo vira um trace: entrada, saída, modelo e latência.' },
    { id: 'mcp', rotulo: 'Servidor MCP', sub: 'buscar_trechos', tipo: 'ferramenta', x: 300, y: 330, detalhe: 'Expõe a mesma busca vetorial como ferramenta para clientes MCP. Devolve só os trechos: quem redige é o LLM do cliente.' },
  ],
  arestas: [
    { de: 'pergunta', para: 'cache', rotulo: 'sha256' },
    { de: 'pergunta', para: 'classificar' },
    { de: 'classificar', para: 'recuperar', rotulo: 'consulta' },
    { de: 'recuperar', para: 'redigir', rotulo: 'trechos' },
    { de: 'redigir', para: 'verificar' },
    { de: 'verificar', para: 'redigir', rotulo: 'reprovada', retorno: true },
    { de: 'verificar', para: 'resposta', rotulo: 'aprovada' },
    { de: 'redigir', para: 'langfuse', rotulo: 'trace' },
    { de: 'mcp', para: 'recuperar', rotulo: 'mesmo índice' },
  ],
  passos: [
    {
      titulo: 'O cache vem antes do modelo',
      texto: 'Pergunta repetida não gasta LLM. A chave inclui a assinatura da configuração, então uma resposta gerada com outro modelo ou outro corpus nunca é servida.',
      nos: ['pergunta', 'cache'],
      fluxo: ['pergunta>cache'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/cache.py',
        codigo: `def normalizar_pergunta(pergunta: str) -> str:
    texto = unicodedata.normalize("NFKC", pergunta).casefold()
    texto = re.sub(r"\\s+", " ", texto).strip()
    return texto.rstrip("?!. ")

    def chave(self, pergunta: str) -> str:
        conteudo = f"{self._assinatura}\\n{normalizar_pergunta(pergunta)}"
        return PREFIXO + hashlib.sha256(conteudo.encode("utf-8")).hexdigest()`,
      },
    },
    {
      titulo: 'Fora do escopo, o grafo para cedo',
      texto: 'O classificador devolve uma categoria em saída estruturada. Se a pergunta não é sobre as leis indexadas, o grafo encerra sem busca e sem redação.',
      nos: ['classificar'],
      fluxo: ['pergunta>classificar'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/agentes/grafo.py',
        codigo: `def apos_classificar(estado: EstadoDoGrafo) -> str:
    return "recuperar" if estado["categoria"] == "consulta_legislacao" else "fora_do_escopo"

def apos_recuperar(estado: EstadoDoGrafo) -> str:
    return "redigir" if estado["trechos"] else "sem_fundamento"`,
      },
    },
    {
      titulo: 'Fragmentar pela estrutura da lei',
      texto: 'Os trechos seguem os artigos, não um tamanho fixo. Assim cada citação aponta para um artigo inteiro, que é a unidade que um advogado usaria.',
      nos: ['recuperar'],
      fluxo: ['classificar>recuperar'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/fragmentacao.py',
        codigo: `# O sufixo de artigo inserido vem colado ao número ("Art. 4º-A", "Art. 55-B"); com
# espaço ("Art. 1º - O ...") o hífen é só pontuação do caput.
_ARTIGO = re.compile(r"^Art\\.\\s*(\\d+)\\s*º?(?:-([A-Z]))?(?![\\d])")`,
      },
    },
    {
      titulo: 'Redigir só com o que foi recuperado',
      texto: 'O redator recebe trechos numerados e cita cada afirmação com [n]. Se os trechos não bastam, ele declara SEM_FUNDAMENTO, e o grafo trata isso como resposta válida.',
      nos: ['redigir'],
      fluxo: ['recuperar>redigir'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/agentes/grafo.py',
        codigo: `def apos_redigir(estado: EstadoDoGrafo) -> str:
    resposta = estado["resposta"]
    # Tolera variações como "SEM_FUNDAMENTO." ou "**SEM_FUNDAMENTO**", desde que sem citações.
    declarou_sem_base = redator.SEM_FUNDAMENTO in resposta and not extrair_citacoes(resposta)
    return "sem_fundamento" if declarou_sem_base else "verificar"`,
      },
    },
    {
      titulo: 'Verificar antes de responder',
      texto: 'A primeira barreira é código: sem citação ou com citação inexistente, a resposta volta. Só depois um LLM confere afirmação por afirmação. Reprovada, ela volta ao redator com o motivo, até o limite de tentativas.',
      nos: ['verificar', 'resposta'],
      fluxo: ['redigir>verificar', 'verificar>redigir', 'verificar>resposta'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/agentes/verificador.py',
        codigo: `def checar_citacoes(resposta: str, quantidade_de_trechos: int) -> ResultadoVerificacao | None:
    """Etapa determinística. Devolve a reprovação, ou None se as citações forem válidas."""
    citacoes = extrair_citacoes(resposta)
    if not citacoes:
        return ResultadoVerificacao(aprovada=False, motivo="A resposta não cita nenhum trecho.")
    invalidas = [n for n in citacoes if not 1 <= n <= quantidade_de_trechos]
    if invalidas:
        lista = ", ".join(f"[{n}]" for n in invalidas)
        return ResultadoVerificacao(
            aprovada=False,
            motivo=f"A resposta cita {lista}, mas só existem os trechos [1] a [{quantidade_de_trechos}].",
        )
    return None`,
      },
    },
    {
      titulo: 'Observável e reutilizável',
      texto: 'Cada chamada de LLM vira trace no Langfuse. E a mesma busca vetorial é exposta como ferramenta MCP, com validação de entrada, para qualquer cliente que fale o protocolo.',
      nos: ['langfuse', 'mcp'],
      fluxo: ['redigir>langfuse', 'mcp>recuperar'],
      trecho: {
        linguagem: 'python',
        origem: 'real',
        caminho: 'src/rag_agentes/servidor_mcp.py',
        codigo: `@servidor.tool()
def buscar_trechos(
    consulta: Annotated[
        str,
        StringConstraints(strip_whitespace=True, min_length=3, max_length=_CONSULTA_MAXIMA),
        Field(description="Pergunta ou termos a buscar."),
    ],
    k: Annotated[int, Field(ge=1, le=_K_MAXIMO, description="Quantidade de trechos.")] = 5,
    documentos: Annotated[list[str] | None, Field(description="Restringe a busca a estes documentos.")] = None,
) -> list[TrechoEncontrado]:
    """Devolve os artigos de lei mais próximos da consulta, com referência e pontuação."""`,
      },
    },
  ],
}

const agenteTr: Projeto = {
  id: 'agente-tr',
  nome: 'Agente conversacional para Termos de Referência',
  contexto: 'Poiesis · código privado',
  resumo:
    'Assistente que ajuda a criar e acompanhar Termos de Referência de compras. O modelo escolhe ferramentas de consulta; quem decide aprovadores e status são as regras do sistema.',
  stack: ['TypeScript', 'Next.js', 'Groq · Llama 3.3 70B', 'Gemini', 'Supabase', 'Function calling'],
  largura: 1040,
  altura: 440,
  nos: [
    { id: 'usuario', rotulo: 'Mensagem', sub: 'chat do sistema', tipo: 'entrada', x: 90, y: 120, detalhe: 'A pessoa conversa dentro do sistema de Termos de Referência, já autenticada.' },
    { id: 'guarda', rotulo: 'Validação', sub: 'entrada', tipo: 'regra', x: 300, y: 120, detalhe: 'Bloqueia tentativas de prompt injection e pedidos de segredo antes de qualquer chamada ao modelo.' },
    { id: 'escopo', rotulo: 'Escopo', sub: 'permissão do usuário', tipo: 'regra', x: 300, y: 320, detalhe: 'O system prompt recebe o que aquela pessoa pode ver. O modelo nunca recebe dados fora do escopo dela.' },
    { id: 'llm', rotulo: 'Llama 3.3 70B', sub: 'Groq', tipo: 'llm', x: 520, y: 120, detalhe: 'Decide se responde direto ou se chama uma ferramenta. O loop de ferramentas tem limite de 4 passos por pergunta.' },
    { id: 'ferramentas', rotulo: '11 ferramentas', sub: 'somente leitura', tipo: 'ferramenta', x: 740, y: 120, detalhe: 'Consultar TR, itens, histórico, comentários, aprovações pendentes, TRs semelhantes, dossiê de aprovação e navegação. Nenhuma altera dados.' },
    { id: 'banco', rotulo: 'PostgreSQL', sub: 'Supabase', tipo: 'dados', x: 950, y: 120, detalhe: 'As ferramentas consultam o banco do sistema, respeitando o mesmo escopo de permissão.' },
    { id: 'reserva', rotulo: 'Gemini', sub: 'sem ferramentas', tipo: 'llm', x: 520, y: 320, detalhe: 'Se o Groq falhar em todas as chaves, o Gemini responde sem ferramentas, para a conversa não morrer.' },
    { id: 'saida', rotulo: 'Resposta', sub: 'streaming filtrado', tipo: 'saida', x: 740, y: 320, detalhe: 'A saída passa por filtragem e redação de dados sensíveis e chega à interface em eventos de streaming.' },
  ],
  arestas: [
    { de: 'usuario', para: 'guarda' },
    { de: 'escopo', para: 'llm', rotulo: 'system prompt' },
    { de: 'guarda', para: 'llm' },
    { de: 'llm', para: 'ferramentas', rotulo: 'tool call' },
    { de: 'ferramentas', para: 'banco' },
    { de: 'ferramentas', para: 'llm', rotulo: 'resultado', retorno: true },
    { de: 'llm', para: 'saida' },
    { de: 'reserva', para: 'saida' },
  ],
  passos: [
    {
      titulo: 'Validar antes de chamar o modelo',
      texto: 'A primeira camada é código, não prompt: padrões de prompt injection e pedidos de chave ou senha são barrados na entrada.',
      nos: ['usuario', 'guarda'],
      fluxo: ['usuario>guarda'],
      trecho: {
        linguagem: 'typescript',
        origem: 'ilustrativo',
        codigo: `const PADROES_DE_INJECAO = [
  /ignor(e|ar)\\s+(todas?\\s+)?(as\\s+)?instru(c|ç)(o|õ)es/i,
  /\\bprompt\\s+(do\\s+)?sistema\\b/i,
  /\\b(api[_\\s-]?key|token|senha)\\b.*\\b(mostre|revele|exiba)\\b/i,
]

export function validarEntrada(texto: string): string | null {
  return PADROES_DE_INJECAO.some((p) => p.test(texto))
    ? 'Não posso atender a esse pedido.'
    : null
}`,
      },
    },
    {
      titulo: 'O escopo entra no prompt',
      texto: 'Cada conversa monta o system prompt com o escopo de permissão de quem pergunta. O modelo só sabe o que aquela pessoa poderia ver na tela.',
      nos: ['escopo', 'llm'],
      fluxo: ['escopo>llm', 'guarda>llm'],
    },
    {
      titulo: 'Function calling com limite',
      texto: 'O modelo pede ferramentas; o código executa e devolve o resultado. O loop para em 4 passos, e o que sai de cada passo vira evento na interface.',
      nos: ['ferramentas', 'banco'],
      fluxo: ['llm>ferramentas', 'ferramentas>banco', 'ferramentas>llm'],
      trecho: {
        linguagem: 'typescript',
        origem: 'ilustrativo',
        codigo: `const MAX_PASSOS = 4

for (let passo = 0; passo < MAX_PASSOS; passo++) {
  const resposta = await modelo.completar({ mensagens, ferramentas: DEFINICOES })
  if (!resposta.chamadas?.length) return resposta.texto

  for (const chamada of resposta.chamadas) {
    yield { tipo: 'ferramenta', nome: chamada.nome }
    const resultado = await executarFerramenta(chamada, escopo) // só leitura
    mensagens.push({ role: 'tool', id: chamada.id, content: JSON.stringify(resultado) })
  }
}`,
      },
    },
    {
      titulo: 'Reserva e saída',
      texto: 'Falhou o provedor principal, o Gemini responde sem ferramentas. Em qualquer caminho, a resposta passa por limpeza de dados sensíveis antes de chegar à tela.',
      nos: ['reserva', 'saida'],
      fluxo: ['llm>saida', 'reserva>saida'],
    },
  ],
}

const indicadores: Projeto = {
  id: 'indicadores',
  nome: 'Assistente de indicadores com camada semântica',
  contexto: 'Poiesis · código privado',
  resumo:
    'Chat, inclusive por voz, que responde perguntas sobre matrículas, cancelamentos, presença e evasão de programas culturais. O LLM só interpreta a pergunta; quem calcula é o código.',
  stack: ['Python', 'FastAPI', 'Pydantic', 'SQLite · libSQL', 'Redis', 'Gemini', 'Groq', 'ElevenLabs'],
  largura: 1040,
  altura: 440,
  nos: [
    { id: 'voz', rotulo: 'Pergunta', sub: 'texto ou voz', tipo: 'entrada', x: 90, y: 120, detalhe: 'Por voz, a transcrição usa ElevenLabs, com Groq de reserva. A pessoa revisa o texto antes de enviar.' },
    { id: 'local', rotulo: 'Reconhecedor', sub: 'sem IA', tipo: 'regra', x: 300, y: 120, detalhe: 'Perguntas de contagem conhecidas são resolvidas localmente, sem chamar modelo nenhum.' },
    { id: 'llm', rotulo: 'LLM', sub: 'só a intenção', tipo: 'llm', x: 300, y: 320, detalhe: 'As demais vão ao modelo, que devolve apenas uma intenção em JSON: métrica, agrupamentos e filtros.' },
    { id: 'catalogo', rotulo: 'Catálogo', sub: 'metrics.yml', tipo: 'dados', x: 520, y: 320, detalhe: 'Nove indicadores, cada um com fórmula, denominador, referência temporal, tamanho mínimo de grupo e limitações.' },
    { id: 'compilador', rotulo: 'Compilador', sub: 'valida e gera SQL', tipo: 'regra', x: 520, y: 120, detalhe: 'Confere a intenção contra o catálogo e gera SQL parametrizado. Métrica sem definição aprovada vira pedido de esclarecimento.' },
    { id: 'acervo', rotulo: 'Acervo', sub: 'somente leitura', tipo: 'dados', x: 740, y: 120, detalhe: 'Versão imutável do acervo, com cache por versão no Redis.' },
    { id: 'resposta', rotulo: 'Resposta', sub: 'texto, voz, PDF, CSV', tipo: 'saida', x: 950, y: 120, detalhe: 'Vem com definição, recorte e referência do período. Também sai falada e em relatório.' },
    { id: 'oraculo', rotulo: 'Conferência', sub: 'SQL independente', tipo: 'regra', x: 740, y: 320, detalhe: 'Um script recalcula os indicadores direto das tabelas, sem usar o compilador, e compara.' },
  ],
  arestas: [
    { de: 'voz', para: 'local' },
    { de: 'local', para: 'compilador', rotulo: 'reconhecida' },
    { de: 'local', para: 'llm', rotulo: 'não reconhecida' },
    { de: 'llm', para: 'compilador', rotulo: 'intenção JSON' },
    { de: 'catalogo', para: 'compilador' },
    { de: 'compilador', para: 'acervo', rotulo: 'SQL' },
    { de: 'acervo', para: 'resposta' },
    { de: 'oraculo', para: 'acervo', rotulo: 'compara' },
  ],
  passos: [
    {
      titulo: 'Primeiro, sem IA',
      texto: 'O caminho mais barato e mais previsível vem antes: perguntas de contagem conhecidas são resolvidas por regra, sem chamada de modelo.',
      nos: ['voz', 'local'],
      fluxo: ['voz>local'],
    },
    {
      titulo: 'O modelo só interpreta',
      texto: 'Para as demais perguntas, o LLM devolve uma intenção estruturada. Ele não escreve SQL e não calcula número nenhum.',
      nos: ['llm'],
      fluxo: ['local>llm'],
      trecho: {
        linguagem: 'json',
        origem: 'ilustrativo',
        codigo: `{
  "metrica": "cancelamentos",
  "agrupar_por": ["unidade"],
  "filtros": { "ano": 2025, "linguagem_artistica": "música" }
}`,
      },
    },
    {
      titulo: 'A camada semântica decide',
      texto: 'O compilador valida a intenção contra o catálogo de métricas e gera SQL parametrizado. Grupos pequenos demais são suprimidos para proteger as pessoas.',
      nos: ['catalogo', 'compilador', 'acervo'],
      fluxo: ['llm>compilador', 'local>compilador', 'catalogo>compilador', 'compilador>acervo'],
      trecho: {
        linguagem: 'python',
        origem: 'ilustrativo',
        codigo: `def compilar(intencao: Intencao, catalogo: Catalogo) -> ConsultaSql:
    metrica = catalogo.metricas.get(intencao.metrica)
    if metrica is None:
        raise PrecisaEsclarecer(f"Não há definição aprovada para {intencao.metrica!r}.")
    for filtro in intencao.filtros:
        metrica.exigir_filtro_suportado(filtro)
    sql, parametros = metrica.montar(intencao.agrupar_por, intencao.filtros)
    return ConsultaSql(sql, parametros, minimo_por_grupo=metrica.minimo_por_grupo)`,
      },
    },
    {
      titulo: 'Conferir os números',
      texto: 'Um script recalcula cada indicador direto das tabelas, sem passar pelo compilador, e compara. A resposta sai com definição, recorte e período.',
      nos: ['resposta', 'oraculo'],
      fluxo: ['acervo>resposta', 'oraculo>acervo'],
    },
  ],
}

const hubIa: Projeto = {
  id: 'hub-ia',
  nome: 'Camada de IA multi-provedor e automações',
  contexto: 'Poiesis · código privado',
  resumo:
    'Plataforma interna de TI e pessoas. Toda chamada de IA passa por um ponto único que escolhe o modelo pela tarefa e registra o uso; as automações rodam no n8n, mas os segredos ficam no sistema.',
  stack: ['TypeScript', 'Next.js', 'Supabase', 'Anthropic', 'Gemini', 'OpenAI', 'n8n'],
  largura: 1040,
  altura: 440,
  nos: [
    { id: 'features', rotulo: 'Funcionalidades', sub: 'suporte, base, labs', tipo: 'entrada', x: 90, y: 120, detalhe: 'Base de conhecimento, laboratório de arquitetura, curadoria de inovação, chamados e agentes de escrita.' },
    { id: 'executar', rotulo: 'executarIa()', sub: 'ponto único', tipo: 'regra', x: 300, y: 120, detalhe: 'As funcionalidades dizem qual é a tarefa, nunca qual é o modelo. Nenhuma chamada lança exceção: devolve sucesso ou erro.' },
    { id: 'roteador', rotulo: 'Roteador', sub: 'tarefa → modelo', tipo: 'regra', x: 520, y: 120, detalhe: 'Classificar e resumir vão para um modelo rápido; redigir para um intermediário; arquitetura e análise crítica para um de raciocínio.' },
    { id: 'provedores', rotulo: 'Provedores', sub: '3 provedores', tipo: 'llm', x: 740, y: 120, detalhe: 'Todos implementam a mesma interface. Trocar de provedor não toca regra de negócio.' },
    { id: 'telemetria', rotulo: 'ia_execucoes', sub: 'uso e falhas', tipo: 'dados', x: 520, y: 320, detalhe: 'Cada chamada grava funcionalidade, modelo, sucesso e erro. É daí que sai quanto a IA custou no mês.' },
    { id: 'n8n', rotulo: 'n8n', sub: '9 fluxos', tipo: 'ferramenta', x: 90, y: 320, detalhe: 'Gatilhos, novas tentativas, logs e avisos: provisionamento, SLA de chamados, acessos órfãos, curadoria de conteúdo.' },
    { id: 'endpoint', rotulo: 'Endpoint interno', sub: 'segredo no Hub', tipo: 'regra', x: 300, y: 320, detalhe: 'O n8n orquestra e o Hub executa: as chaves do Google e do Bitrix nunca saem do sistema.' },
    { id: 'sistemas', rotulo: 'Google · Bitrix', sub: 'contas e acessos', tipo: 'ferramenta', x: 740, y: 320, detalhe: 'Criação e suspensão de contas no provisionamento e no desligamento.' },
  ],
  arestas: [
    { de: 'features', para: 'executar', rotulo: 'tarefa' },
    { de: 'executar', para: 'roteador' },
    { de: 'roteador', para: 'provedores', rotulo: 'modelo' },
    { de: 'executar', para: 'telemetria', rotulo: 'registra' },
    { de: 'n8n', para: 'endpoint', rotulo: 'webhook' },
    { de: 'endpoint', para: 'sistemas' },
  ],
  passos: [
    {
      titulo: 'A tarefa, não o modelo',
      texto: 'Quem chama a IA diz o que está fazendo: classificar, resumir, redigir, analisar. Decidir o modelo é questão de custo e qualidade, e fica num lugar só.',
      nos: ['features', 'executar'],
      fluxo: ['features>executar'],
    },
    {
      titulo: 'Roteamento por custo e qualidade',
      texto: 'Modelo caro para classificar tag desperdiça orçamento; modelo barato para desenhar arquitetura entrega raciocínio fraco. O roteador resolve isso por tarefa.',
      nos: ['roteador', 'provedores'],
      fluxo: ['executar>roteador', 'roteador>provedores'],
      trecho: {
        linguagem: 'typescript',
        origem: 'ilustrativo',
        codigo: `type Tarefa = 'classificacao' | 'resumo' | 'redacao' | 'chat' | 'arquitetura'

const PERFIL: Record<Tarefa, 'rapido' | 'intermediario' | 'raciocinio'> = {
  classificacao: 'rapido',
  resumo: 'rapido',
  redacao: 'intermediario',
  chat: 'intermediario',
  arquitetura: 'raciocinio',
}

export async function executarIa(tarefa: Tarefa, pedido: Pedido): Promise<Resultado> {
  const provedor = provedorAtivo()
  const modelo = provedor.modeloPara(PERFIL[tarefa])
  try {
    const texto = await provedor.completar({ ...pedido, modelo })
    await registrar({ tarefa, modelo, sucesso: true })
    return { ok: true, texto }
  } catch (erro) {
    await registrar({ tarefa, modelo, sucesso: false, erro: String(erro) })
    return { ok: false, erro: 'A IA não respondeu agora.' }
  }
}`,
      },
    },
    {
      titulo: 'Saber quanto a IA custa',
      texto: 'Cada chamada fica registrada. A tela de agentes mostra o que cada um fez e onde falhou.',
      nos: ['telemetria'],
      fluxo: ['executar>telemetria'],
    },
    {
      titulo: 'O n8n orquestra, o sistema executa',
      texto: 'O n8n cuida de gatilho, nova tentativa e aviso. A ação sensível é um endpoint interno autenticado, para os segredos não morarem na ferramenta de automação.',
      nos: ['n8n', 'endpoint', 'sistemas'],
      fluxo: ['n8n>endpoint', 'endpoint>sistemas'],
    },
  ],
}

export const PROJETOS_IA: Projeto[] = [rag, agenteTr, indicadores, hubIa]
