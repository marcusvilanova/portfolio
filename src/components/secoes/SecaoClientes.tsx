import { Declaracao } from '@/components/texto/Declaracao'
import { SITES_CLIENTES } from '@/data/outros'
import styles from './SecaoClientes.module.css'

export function SecaoClientes() {
  return (
    <section id="clientes" className={styles.secao} aria-labelledby="titulo-clientes">
      <div className="envoltorio">
        <div className="titulo-secao">
          <p className="rotulo">Sites para clientes</p>
          <Declaracao id="titulo-clientes" texto="Front-end feito sob encomenda." />
          <p>Portfólios para profissionais de moda e de audiovisual, com animação por rolagem e publicação na Vercel.</p>
        </div>

        <ul className={styles.lista}>
          {SITES_CLIENTES.map((site) => (
            <li key={site.nome} className={`${styles.item} revelar`}>
              <p className="rotulo">{site.para}</p>
              <h3>{site.nome}</h3>
              <p className={styles.resumo}>{site.resumo}</p>
              <ul className="pilha" aria-label="Tecnologias">
                {site.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.links}>
                <a href={site.noAr} target="_blank" rel="noreferrer">
                  Ver o site ↗
                </a>
                <a href={site.repositorio} target="_blank" rel="noreferrer">
                  Código ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
