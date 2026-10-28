import { Download } from '@carbon/icons-react'
import { Declaracao } from '@/components/texto/Declaracao'
import { CURRICULO, RESUMO } from '@/data/outros'
import styles from './SecaoSobre.module.css'

// Resumo profissional logo depois do topo. A frase de abertura do resumo já está no topo, por isso não se repete aqui.
export function SecaoSobre() {
  return (
    <section id="sobre" className={styles.secao} aria-labelledby="titulo-sobre">
      <div className={`envoltorio ${styles.grade}`}>
        <div className={`titulo-secao ${styles.titulo}`}>
          <p className="rotulo">Sobre</p>
          <Declaracao id="titulo-sobre" texto="Resumo profissional" />
          <a className={`botao botao-primario ${styles.curriculo}`} href={CURRICULO} download>
            Baixar currículo <Download size={16} className="seta-baixo" />
          </a>
        </div>

        <div className={styles.conteudo}>
          {RESUMO.trajetoria.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}

          <h3>O que construí até aqui</h3>
          <ul className={styles.lista}>
            {RESUMO.construido.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Como trabalho</h3>
          <p>{RESUMO.comoTrabalho}</p>

          <h3>Tecnologias</h3>
          <ul className="pilha" aria-label="Tecnologias">
            {RESUMO.tecnologias.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Formação</h3>
          <ul className={styles.lista}>
            {RESUMO.formacao.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
