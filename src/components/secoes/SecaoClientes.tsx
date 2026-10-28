import { Launch, LogoGithub } from '@carbon/icons-react'
import { Abertura } from '@/components/texto/Abertura'
import { SITES_CLIENTES } from '@/data/outros'
import styles from './SecaoClientes.module.css'

export function SecaoClientes() {
  return (
    <section id="clientes" className={styles.secao} aria-labelledby="titulo-clientes">
      <div className="envoltorio">
        <Abertura
          rotulo="Sites para clientes"
          titulo="Front-end feito sob encomenda."
          idTitulo="titulo-clientes"
        >
          <p>Portfólios para profissionais de moda e de audiovisual, com animação por rolagem e publicação na Vercel.</p>
        </Abertura>

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
                {/* "Ver o site" cobre o cartão inteiro; "Código" fica por cima dele. */}
                <a className={`${styles.principal} link-icone`} href={site.noAr} target="_blank" rel="noreferrer">
                  Ver o site <Launch size={16} className="abrir" />
                </a>
                <a className={`${styles.codigo} link-icone`} href={site.repositorio} target="_blank" rel="noreferrer">
                  Código <LogoGithub size={16} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
