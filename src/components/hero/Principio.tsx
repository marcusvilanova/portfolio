'use client'

import { useEffect, useState } from 'react'
import { Diagrama, type DadosDoDiagrama } from '@/components/diagrama/Diagrama'
import { usePrefereMenosMovimento } from '@/lib/usePrefereMenosMovimento'
import styles from './Principio.module.css'

// O princípio que se repete em todos os projetos, num exemplo ilustrativo.
const PRINCIPIO: DadosDoDiagrama = {
  nome: 'Como uso IA em sistema',
  largura: 1040,
  altura: 250,
  nos: [
    { id: 'pergunta', rotulo: 'Pergunta', sub: 'texto livre', tipo: 'entrada', x: 90, y: 80, detalhe: '' },
    { id: 'interpreta', rotulo: 'LLM interpreta', sub: 'intenção estruturada', tipo: 'llm', x: 300, y: 80, detalhe: '' },
    { id: 'valida', rotulo: 'Regras validam', sub: 'catálogo, permissão', tipo: 'regra', x: 520, y: 80, detalhe: '' },
    { id: 'executa', rotulo: 'Código executa', sub: 'SQL, ferramentas', tipo: 'regra', x: 740, y: 80, detalhe: '' },
    { id: 'redige', rotulo: 'LLM redige', sub: 'cita as fontes', tipo: 'llm', x: 950, y: 80, detalhe: '' },
    { id: 'esclarece', rotulo: 'Esclarecimento', sub: 'quando não valida', tipo: 'saida', x: 520, y: 200, detalhe: '' },
  ],
  arestas: [
    { de: 'pergunta', para: 'interpreta' },
    { de: 'interpreta', para: 'valida', rotulo: 'JSON' },
    { de: 'valida', para: 'executa', rotulo: 'válida' },
    { de: 'executa', para: 'redige', rotulo: 'dados' },
    { de: 'valida', para: 'esclarece', rotulo: 'inválida' },
  ],
  passos: [
    { titulo: 'Pergunta', texto: '', nos: ['pergunta'], fluxo: [] },
    { titulo: 'Interpretação', texto: '', nos: ['interpreta'], fluxo: ['pergunta>interpreta'] },
    { titulo: 'Validação', texto: '', nos: ['valida', 'esclarece'], fluxo: ['interpreta>valida'] },
    { titulo: 'Execução', texto: '', nos: ['executa'], fluxo: ['valida>executa'] },
    { titulo: 'Redação', texto: '', nos: ['redige'], fluxo: ['executa>redige'] },
  ],
}

/** O que existe em cada etapa do exemplo, mostrado como uma linha de console. */
const ARTEFATOS = [
  '"Quantas matrículas foram canceladas em 2025, por unidade?"',
  '{ "metrica": "cancelamentos", "ano": 2025, "agrupar_por": ["unidade"] }',
  'métrica aprovada no catálogo · filtro suportado · grupos acima do mínimo',
  'SELECT unidade, COUNT(*) FROM matriculas WHERE situacao = ? AND ano = ? GROUP BY unidade',
  'resposta com a definição do indicador, o recorte, o período e a fonte',
]

const INTERVALO_MS = 2600

export function Principio() {
  const [passo, setPasso] = useState(0)
  const [pausado, setPausado] = useState(false)
  const menosMovimento = usePrefereMenosMovimento()
  const automatico = !pausado && !menosMovimento

  useEffect(() => {
    if (!automatico) return
    const timer = window.setInterval(() => setPasso((atual) => (atual + 1) % PRINCIPIO.passos.length), INTERVALO_MS)
    return () => window.clearInterval(timer)
  }, [automatico])

  return (
    <figure
      className={styles.principio}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className={styles.topo}>
        <p className="rotulo">O princípio de todos os projetos · exemplo ilustrativo</p>
        <div className={styles.etapas} role="group" aria-label="Etapas do exemplo">
          {PRINCIPIO.passos.map((etapa, indice) => (
            <button
              key={etapa.titulo}
              type="button"
              aria-pressed={indice === passo}
              className={indice === passo ? `${styles.etapa} ${styles.etapaAtiva}` : styles.etapa}
              onClick={() => setPasso(indice)}
            >
              <span aria-hidden="true">{indice + 1}</span> {etapa.titulo}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tela}>
        <Diagrama dados={PRINCIPIO} passoAtivo={passo} revelarTudo />
      </div>

      <div className={styles.console} aria-live="polite">
        <span className={styles.prompt} aria-hidden="true">
          ›
        </span>
        <code key={passo} className={styles.artefato}>
          {ARTEFATOS[passo]}
        </code>
      </div>

      <figcaption className={styles.legenda}>
        O modelo interpreta e redige. As regras do sistema validam, calculam e decidem.
      </figcaption>
    </figure>
  )
}
