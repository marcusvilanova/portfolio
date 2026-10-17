import type { TrechoDeCodigo } from '@/data/tipos'
import { realcar } from './realce'
import styles from './BlocoDeCodigo.module.css'

export function BlocoDeCodigo({ trecho }: { trecho: TrechoDeCodigo }) {
  const linhas = trecho.codigo.split('\n')

  return (
    <figure className={styles.bloco}>
      <figcaption className={styles.cabecalho}>
        <span className={styles.linguagem}>{trecho.linguagem}</span>
        {trecho.origem === 'real' ? (
          <span className={styles.origem}>{trecho.caminho}</span>
        ) : (
          <span className={styles.origem}>ilustrativo · o código original é privado</span>
        )}
      </figcaption>
      <pre className={styles.pre}>
        <code>
          {linhas.map((linha, indice) => (
            <span key={indice} className={styles.linha}>
              {realcar(linha, trecho.linguagem).map((parte, j) =>
                parte.tipo ? (
                  <span key={j} className={styles[parte.tipo]}>
                    {parte.texto}
                  </span>
                ) : (
                  parte.texto
                ),
              )}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
