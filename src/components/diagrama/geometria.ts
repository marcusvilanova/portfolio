import type { Aresta, No } from '@/data/tipos'

export const LARGURA_NO = 156
export const ALTURA_NO = 56

/** Distância do rótulo da aresta de retorno até a linha reta entre os nós. */
const CURVA_DO_RETORNO = 64

export const chaveDaAresta = (aresta: Pick<Aresta, 'de' | 'para'>) => `${aresta.de}>${aresta.para}`

interface Ponto {
  x: number
  y: number
}

/** Ponto onde a reta que sai do centro do nó na direção (ux, uy) cruza a borda da caixa. */
function bordaNaDirecao(no: No, ux: number, uy: number): Ponto {
  const tx = ux === 0 ? Infinity : LARGURA_NO / 2 / Math.abs(ux)
  const ty = uy === 0 ? Infinity : ALTURA_NO / 2 / Math.abs(uy)
  const t = Math.min(tx, ty)
  return { x: no.x + ux * t, y: no.y + uy * t }
}

/**
 * Caminho SVG de uma aresta e o ponto do rótulo.
 * Arestas comuns saem pela lateral (fluxo horizontal) ou por cima/baixo (vertical),
 * em curva suave. Arestas de retorno fazem um arco por fora, para não cobrir a de ida.
 */
export function geometriaDaAresta(de: No, para: No, retorno = false): { d: string; rotulo: Ponto } {
  const dx = para.x - de.x
  const dy = para.y - de.y

  if (retorno) {
    const comprimento = Math.hypot(dx, dy) || 1
    const ux = dx / comprimento
    const uy = dy / comprimento
    const inicio = bordaNaDirecao(de, ux, uy)
    const fim = bordaNaDirecao(para, -ux, -uy)
    // Normal à esquerda da direção do retorno: o arco fica do lado oposto ao da ida.
    const controle = {
      x: (inicio.x + fim.x) / 2 + uy * CURVA_DO_RETORNO * 2,
      y: (inicio.y + fim.y) / 2 - ux * CURVA_DO_RETORNO * 2,
    }
    const rotulo = {
      x: 0.25 * inicio.x + 0.5 * controle.x + 0.25 * fim.x,
      y: 0.25 * inicio.y + 0.5 * controle.y + 0.25 * fim.y - 6,
    }
    return { d: `M${inicio.x},${inicio.y} Q${controle.x},${controle.y} ${fim.x},${fim.y}`, rotulo }
  }

  const horizontal = Math.abs(dx) >= Math.abs(dy) * 1.2
  let inicio: Ponto
  let fim: Ponto
  let c1: Ponto
  let c2: Ponto

  if (horizontal) {
    const sentido = Math.sign(dx) || 1
    inicio = { x: de.x + (sentido * LARGURA_NO) / 2, y: de.y }
    fim = { x: para.x - (sentido * LARGURA_NO) / 2, y: para.y }
    const meio = (fim.x - inicio.x) / 2
    c1 = { x: inicio.x + meio, y: inicio.y }
    c2 = { x: fim.x - meio, y: fim.y }
  } else {
    const sentido = Math.sign(dy) || 1
    inicio = { x: de.x, y: de.y + (sentido * ALTURA_NO) / 2 }
    fim = { x: para.x, y: para.y - (sentido * ALTURA_NO) / 2 }
    const meio = (fim.y - inicio.y) / 2
    c1 = { x: inicio.x, y: inicio.y + meio }
    c2 = { x: fim.x, y: fim.y - meio }
  }

  // Ponto da cúbica em t = 0,5; em arestas horizontais o rótulo sobe para não cobrir a linha.
  const rotulo = {
    x: (inicio.x + 3 * c1.x + 3 * c2.x + fim.x) / 8,
    y: (inicio.y + 3 * c1.y + 3 * c2.y + fim.y) / 8 + (horizontal ? -9 : 4),
  }
  return {
    d: `M${inicio.x},${inicio.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${fim.x},${fim.y}`,
    rotulo,
  }
}
