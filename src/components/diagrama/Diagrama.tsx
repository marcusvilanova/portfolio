'use client'

import { useId, useMemo } from 'react'
import type { Aresta, No, Projeto } from '@/data/tipos'
import { usePrefereMenosMovimento } from '@/lib/usePrefereMenosMovimento'
import { geometriaDaAresta, chaveDaAresta, ALTURA_NO, LARGURA_NO } from './geometria'
import styles from './Diagrama.module.css'

export type DadosDoDiagrama = Pick<Projeto, 'nome' | 'largura' | 'altura' | 'nos' | 'arestas' | 'passos'>

interface Props {
  dados: DadosDoDiagrama
  passoAtivo: number
  /** Mostra todos os nós desde o início, destacando só os do passo ativo. */
  revelarTudo?: boolean
  selecionado?: string | null
  onSelecionar?: (id: string) => void
}

export function Diagrama({ dados, passoAtivo, revelarTudo = false, selecionado = null, onSelecionar }: Props) {
  const uid = useId().replace(/:/g, '')
  const menosMovimento = usePrefereMenosMovimento()

  const { visiveis, ativos, fluxo } = useMemo(() => {
    const visiveis = new Set<string>()
    dados.passos.forEach((passo, indice) => {
      if (revelarTudo || indice <= passoAtivo) passo.nos.forEach((id) => visiveis.add(id))
    })
    const atual = dados.passos[passoAtivo]
    return { visiveis, ativos: new Set(atual?.nos ?? []), fluxo: new Set(atual?.fluxo ?? []) }
  }, [dados.passos, passoAtivo, revelarTudo])

  const porId = useMemo(() => new Map(dados.nos.map((no) => [no.id, no])), [dados.nos])

  return (
    <svg
      className={styles.diagrama}
      viewBox={`0 0 ${dados.largura} ${dados.altura}`}
      role="group"
      aria-label={`Diagrama de arquitetura: ${dados.nome}`}
    >
      <defs>
        <marker id={`${uid}-seta`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={styles.seta} />
        </marker>
        <marker id={`${uid}-seta-ativa`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={styles.setaAtiva} />
        </marker>
      </defs>

      {dados.arestas.map((aresta) => (
        <ArestaDesenhada
          key={chaveDaAresta(aresta)}
          aresta={aresta}
          de={porId.get(aresta.de)}
          para={porId.get(aresta.para)}
          visivel={visiveis.has(aresta.de) && visiveis.has(aresta.para)}
          ativa={fluxo.has(chaveDaAresta(aresta))}
          uid={uid}
          animar={!menosMovimento}
        />
      ))}

      {dados.nos.map((no) => (
        <NoDesenhado
          key={no.id}
          no={no}
          visivel={visiveis.has(no.id)}
          ativo={ativos.has(no.id)}
          selecionado={selecionado === no.id}
          onSelecionar={onSelecionar}
        />
      ))}
    </svg>
  )
}

interface PropsAresta {
  aresta: Aresta
  de?: No
  para?: No
  visivel: boolean
  ativa: boolean
  uid: string
  animar: boolean
}

function ArestaDesenhada({ aresta, de, para, visivel, ativa, uid, animar }: PropsAresta) {
  if (!de || !para) return null
  const { d, rotulo } = geometriaDaAresta(de, para, aresta.retorno)
  const classe = [styles.aresta, visivel && styles.visivel, ativa && styles.ativa, aresta.retorno && styles.retorno]
    .filter(Boolean)
    .join(' ')

  return (
    <g className={classe}>
      <path d={d} className={styles.linha} markerEnd={`url(#${uid}-${ativa ? 'seta-ativa' : 'seta'})`} />
      {ativa && visivel && animar && (
        <circle r="4.5" className={styles.pacote}>
          <animateMotion dur="1.6s" repeatCount="indefinite" path={d} />
        </circle>
      )}
      {aresta.rotulo && (
        <text x={rotulo.x} y={rotulo.y} className={styles.rotuloAresta} textAnchor="middle">
          {aresta.rotulo}
        </text>
      )}
    </g>
  )
}

interface PropsNo {
  no: No
  visivel: boolean
  ativo: boolean
  selecionado: boolean
  onSelecionar?: (id: string) => void
}

function NoDesenhado({ no, visivel, ativo, selecionado, onSelecionar }: PropsNo) {
  const interativo = Boolean(onSelecionar) && visivel
  const classe = [
    styles.no,
    styles[no.tipo],
    visivel && styles.visivel,
    ativo && styles.ativo,
    selecionado && styles.selecionado,
    interativo && styles.interativo,
  ]
    .filter(Boolean)
    .join(' ')

  const selecionar = () => onSelecionar?.(no.id)

  return (
    <g
      className={classe}
      transform={`translate(${no.x - LARGURA_NO / 2} ${no.y - ALTURA_NO / 2})`}
      role={interativo ? 'button' : undefined}
      tabIndex={interativo ? 0 : -1}
      aria-label={interativo ? `${no.rotulo}. ${no.detalhe}` : undefined}
      aria-pressed={interativo ? selecionado : undefined}
      aria-hidden={visivel ? undefined : true}
      onClick={interativo ? selecionar : undefined}
      onKeyDown={
        interativo
          ? (evento) => {
              if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault()
                selecionar()
              }
            }
          : undefined
      }
    >
      <g className={styles.corpo}>
        <rect width={LARGURA_NO} height={ALTURA_NO} rx="3" className={styles.caixa} />
        <text x={12} y={no.sub ? 24 : 33} className={styles.rotuloNo}>
          {no.rotulo}
        </text>
        {no.sub && (
          <text x={12} y={42} className={styles.subNo}>
            {no.sub}
          </text>
        )}
      </g>
    </g>
  )
}
