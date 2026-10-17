// Modelo dos diagramas vivos: cada projeto é um conjunto de nós e arestas que
// aparecem passo a passo enquanto o visitante rola a página.

export type TipoDeNo = 'entrada' | 'llm' | 'regra' | 'dados' | 'ferramenta' | 'saida'

export interface TrechoDeCodigo {
  linguagem: 'python' | 'typescript' | 'sql' | 'json'
  /** "real": copiado do repositório público. "ilustrativo": reescrito, porque o código original é privado. */
  origem: 'real' | 'ilustrativo'
  /** Caminho no repositório, só para trechos reais. */
  caminho?: string
  codigo: string
}

export interface No {
  id: string
  rotulo: string
  /** Segunda linha do nó, em fonte monoespaçada. */
  sub?: string
  tipo: TipoDeNo
  /** Centro do nó, nas coordenadas do viewBox do diagrama. */
  x: number
  y: number
  detalhe: string
}

export interface Aresta {
  de: string
  para: string
  rotulo?: string
  /** Aresta de retorno (ex.: verificador devolve ao redator), desenhada por baixo. */
  retorno?: boolean
}

export interface Passo {
  titulo: string
  texto: string
  /** Nós revelados neste passo; os dos passos anteriores continuam visíveis. */
  nos: string[]
  /** Arestas destacadas neste passo, no formato "de>para". */
  fluxo: string[]
  trecho?: TrechoDeCodigo
}

export interface Projeto {
  id: string
  nome: string
  contexto: string
  resumo: string
  stack: string[]
  link?: { rotulo: string; url: string }
  largura: number
  altura: number
  nos: No[]
  arestas: Aresta[]
  passos: Passo[]
}
