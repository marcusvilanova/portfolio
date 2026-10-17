import styles from './Cabecalho.module.css'

const ITENS = [
  { href: '#projetos', rotulo: 'Projetos de IA' },
  { href: '#nuvem', rotulo: 'Nuvem e DevOps' },
  { href: '#clientes', rotulo: 'Sites' },
  { href: '#trajetoria', rotulo: 'Trajetória' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <div className={`envoltorio ${styles.linha}`}>
        <a href="#inicio" className={styles.marca}>
          marcus<span>.</span>vila-nova
        </a>
        <nav aria-label="Seções">
          <ul className={styles.menu}>
            {ITENS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
