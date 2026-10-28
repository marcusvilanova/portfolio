import { ArrowDown } from '@carbon/icons-react'
import { CenaProjeto } from '@/components/cena/CenaProjeto'
import { Abertura } from '@/components/texto/Abertura'
import { PROJETOS_IA } from '@/data/projetos-ia'
import styles from './SecaoProjetos.module.css'

const dois = (n: number) => String(n).padStart(2, '0')

export function SecaoProjetos() {
  return (
    <section id="projetos" aria-labelledby="titulo-projetos">
      <div className="envoltorio">
        <Abertura
          rotulo="Projetos de IA"
          titulo="Role a página e a arquitetura se monta."
          idTitulo="titulo-projetos"
        >
          <p>
            Cada projeto aparece passo a passo, na ordem em que uma pergunta atravessa o sistema. Os trechos do RAG
            vêm do repositório público; os sistemas profissionais têm código privado, então os trechos são reescritos
            para mostrar o padrão.
          </p>
        </Abertura>

        <ol className={styles.sumario} aria-label="Projetos desta seção">
          {PROJETOS_IA.map((projeto, indice) => (
            <li key={projeto.id}>
              <a href={`#cena-${projeto.id}`}>
                <span className={styles.numero}>{dois(indice + 1)}</span>
                <span className={styles.nome}>{projeto.nome}</span>
                <span className={styles.contexto}>{projeto.contexto}</span>
                <ArrowDown size={20} className={`seta-baixo ${styles.seta}`} />
              </a>
            </li>
          ))}
        </ol>

        {PROJETOS_IA.map((projeto, indice) => {
          const seguinte = PROJETOS_IA[indice + 1]
          const proximo = seguinte
            ? { href: `#cena-${seguinte.id}`, rotulo: seguinte.nome }
            : { href: '#nuvem', rotulo: 'Nuvem e DevOps' }
          return (
            <CenaProjeto
              key={projeto.id}
              projeto={projeto}
              numero={indice + 1}
              total={PROJETOS_IA.length}
              proximo={proximo}
            />
          )
        })}
      </div>
    </section>
  )
}
