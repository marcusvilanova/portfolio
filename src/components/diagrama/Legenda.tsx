import type { TipoDeNo } from '@/data/tipos'
import styles from './Legenda.module.css'

const ITENS: { tipo: TipoDeNo; rotulo: string }[] = [
  { tipo: 'llm', rotulo: 'modelo de linguagem' },
  { tipo: 'regra', rotulo: 'regra em código' },
  { tipo: 'dados', rotulo: 'dados' },
  { tipo: 'ferramenta', rotulo: 'ferramenta ou serviço' },
]

export function Legenda() {
  return (
    <ul className={styles.legenda} aria-label="Legenda do diagrama">
      {ITENS.map((item) => (
        <li key={item.tipo}>
          <span className={`${styles.amostra} ${styles[item.tipo]}`} aria-hidden="true" />
          {item.rotulo}
        </li>
      ))}
    </ul>
  )
}
