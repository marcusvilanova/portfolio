import type { TrechoDeCodigo } from '@/data/tipos'

// Realce de sintaxe mínimo, linha a linha, sem dependência: comentários,
// strings, números e palavras-chave. Suficiente para trechos curtos.

export type TipoDeToken = 'comentario' | 'texto' | 'numero' | 'palavra' | null

export interface Parte {
  texto: string
  tipo: TipoDeToken
}

const PALAVRAS: Record<TrechoDeCodigo['linguagem'], Set<string>> = {
  python: new Set([
    'def', 'return', 'if', 'else', 'elif', 'for', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False',
    'class', 'import', 'from', 'raise', 'with', 'as', 'lambda', 'async', 'await',
  ]),
  typescript: new Set([
    'const', 'let', 'function', 'return', 'if', 'else', 'for', 'of', 'in', 'await', 'async', 'export',
    'import', 'from', 'type', 'interface', 'try', 'catch', 'new', 'true', 'false', 'null', 'yield',
  ]),
  json: new Set(['true', 'false', 'null']),
  sql: new Set(['SELECT', 'FROM', 'WHERE', 'AND', 'GROUP', 'BY', 'COUNT', 'AS', 'ORDER']),
}

const COMENTARIO: Record<TrechoDeCodigo['linguagem'], RegExp | null> = {
  python: /#.*/,
  typescript: /\/\/.*/,
  json: null,
  sql: /--.*/,
}

const TOKEN = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/g

export function realcar(linha: string, linguagem: TrechoDeCodigo['linguagem']): Parte[] {
  const partes: Parte[] = []
  let codigo = linha
  let comentario = ''

  const padraoComentario = COMENTARIO[linguagem]
  if (padraoComentario) {
    // Só conta como comentário o que está fora de string.
    const semStrings = linha.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, (s) => ' '.repeat(s.length))
    const achado = padraoComentario.exec(semStrings)
    if (achado) {
      codigo = linha.slice(0, achado.index)
      comentario = linha.slice(achado.index)
    }
  }

  let ultimo = 0
  for (const achado of codigo.matchAll(TOKEN)) {
    const [inteiro, texto, numero, palavra] = achado
    const inicio = achado.index ?? 0
    if (inicio > ultimo) partes.push({ texto: codigo.slice(ultimo, inicio), tipo: null })
    if (texto) partes.push({ texto: inteiro, tipo: 'texto' })
    else if (numero) partes.push({ texto: inteiro, tipo: 'numero' })
    else if (palavra && PALAVRAS[linguagem].has(palavra)) partes.push({ texto: inteiro, tipo: 'palavra' })
    else partes.push({ texto: inteiro, tipo: null })
    ultimo = inicio + inteiro.length
  }
  if (ultimo < codigo.length) partes.push({ texto: codigo.slice(ultimo), tipo: null })
  if (comentario) partes.push({ texto: comentario, tipo: 'comentario' })
  return partes
}
