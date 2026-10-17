import { PROJETOS_NUVEM } from '@/data/outros'
import styles from './SecaoNuvem.module.css'

export function SecaoNuvem() {
  return (
    <section id="nuvem" className={styles.secao} aria-labelledby="titulo-nuvem">
      <div className="envoltorio">
        <div className="titulo-secao">
          <p className="rotulo">Nuvem e DevOps</p>
          <h2 id="titulo-nuvem">Do contêiner ao Azure</h2>
          <p>Projetos da FIAP publicados de verdade: cada linha mostra o caminho da requisição até o dado.</p>
        </div>

        <ol className={styles.lista}>
          {PROJETOS_NUVEM.map((projeto) => (
            <li key={projeto.nome} className={styles.item}>
              <div className={styles.cabeca}>
                <h3>{projeto.nome}</h3>
                <p className="rotulo">{projeto.contexto}</p>
              </div>
              <p className={styles.resumo}>{projeto.resumo}</p>
              <ol className={styles.topologia} aria-label="Caminho da requisição">
                {projeto.topologia.map((etapa) => (
                  <li key={etapa}>{etapa}</li>
                ))}
              </ol>
              <div className={styles.rodape}>
                <ul className="pilha" aria-label="Tecnologias">
                  {projeto.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={projeto.repositorio} target="_blank" rel="noreferrer" className={styles.link}>
                  Repositório ↗
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
