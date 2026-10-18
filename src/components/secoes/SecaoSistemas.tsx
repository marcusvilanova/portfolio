import { Diagrama } from '@/components/diagrama/Diagrama'
import { Abertura } from '@/components/texto/Abertura'
import { SISTEMAS_POIESIS } from '@/data/sistemas-poiesis'
import styles from './SecaoSistemas.module.css'

const dois = (n: number) => String(n).padStart(2, '0')

export function SecaoSistemas() {
  return (
    <section id="sistemas" className={styles.secao} aria-labelledby="titulo-sistemas">
      <div className="envoltorio">
        <Abertura
          rotulo="Sistemas na Poiesis"
          titulo="Sistemas internos, do problema ao resultado."
          idTitulo="titulo-sistemas"
        >
          <p>
            Construídos na equipe de Desenvolvimento e Inovação em Tecnologia da Poiesis, organização social que
            gere equipamentos culturais em São Paulo. O código é privado: aqui ficam o problema, a arquitetura e o
            resultado, sem dados de pessoas, fornecedores ou valores.
          </p>
        </Abertura>

        <ol className={styles.lista}>
          {SISTEMAS_POIESIS.map((sistema, indice) => (
            <li key={sistema.id} id={`sistema-${sistema.id}`} className={`${styles.ficha} revelar`}>
              {/* A identificação fica presa só enquanto os campos rolam; para antes do diagrama. */}
              <div className={styles.corpo}>
                <header className={styles.cabeca}>
                  <p className="rotulo">
                    {dois(indice + 1)} · {sistema.area} · {sistema.periodo}
                  </p>
                  <h3>{sistema.nome}</h3>
                  <p className={styles.resumo}>{sistema.resumo}</p>
                  <ul className="pilha" aria-label="Tecnologias">
                    {sistema.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </header>

                <dl className={styles.campos}>
                  <div>
                    <dt>Problema</dt>
                    <dd>{sistema.problema}</dd>
                  </div>
                  {sistema.construcao && (
                    <div>
                      <dt>O que construí</dt>
                      <dd>
                        <ul className={styles.itens}>
                          {sistema.construcao.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Resultado</dt>
                    <dd>{sistema.resultado}</dd>
                  </div>
                </dl>
              </div>

              {sistema.diagrama && (
                <figure className={styles.arquitetura}>
                  <figcaption>Arquitetura</figcaption>
                  <div className={styles.diagrama}>
                    <Diagrama dados={sistema.diagrama} passoAtivo={0} revelarTudo montarAoRolar />
                  </div>
                </figure>
              )}

              {sistema.cena && (
                <a className={styles.aprofundar} href={`#cena-${sistema.cena.id}`}>
                  {sistema.cena.rotulo} ↓
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
