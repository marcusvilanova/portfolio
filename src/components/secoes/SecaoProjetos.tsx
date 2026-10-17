import { CenaProjeto } from '@/components/cena/CenaProjeto'
import { PROJETOS_IA } from '@/data/projetos-ia'

export function SecaoProjetos() {
  return (
    <section id="projetos" aria-labelledby="titulo-projetos">
      <div className="envoltorio">
        <div className="titulo-secao">
          <p className="rotulo">Projetos de IA</p>
          <h2 id="titulo-projetos">Role a página e a arquitetura se monta</h2>
          <p>
            Cada projeto aparece passo a passo, na ordem em que uma pergunta atravessa o sistema. Os trechos do RAG
            vêm do repositório público; os sistemas da Poiesis têm código privado, então os trechos são reescritos
            para mostrar o padrão.
          </p>
        </div>
        {PROJETOS_IA.map((projeto, indice) => (
          <CenaProjeto key={projeto.id} projeto={projeto} numero={indice + 1} total={PROJETOS_IA.length} />
        ))}
      </div>
    </section>
  )
}
