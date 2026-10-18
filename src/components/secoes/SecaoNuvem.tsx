import { Abertura } from '@/components/texto/Abertura'
import { PROJETOS_NUVEM } from '@/data/outros'
import styles from './SecaoNuvem.module.css'

export function SecaoNuvem() {
  return (
    <section id="nuvem" className={styles.secao} aria-labelledby="titulo-nuvem">
      <div className="envoltorio">
        <Abertura
          rotulo="Nuvem e DevOps"
          titulo="Do contêiner ao Azure."
          idTitulo="titulo-nuvem"
        >
          <p>Projetos da FIAP publicados de verdade: cada linha mostra o caminho da requisição até o dado.</p>
        </Abertura>

        <ol className={`${styles.lista} revelar`}>
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
