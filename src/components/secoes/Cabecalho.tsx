import { CONTATO } from '@/data/outros'
import styles from './Cabecalho.module.css'

// As seções ficam na navegação fixa do rodapé; aqui ficam a marca, os perfis e o progresso da leitura.
export function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <div className={`envoltorio ${styles.linha}`}>
        <a href="#inicio" className={styles.marca}>
          marcus<span>.</span>vila-nova
        </a>
        <ul className={styles.perfis}>
          <li>
            <a href={CONTATO.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={CONTATO.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.progresso} aria-hidden="true" />
    </header>
  )
}
