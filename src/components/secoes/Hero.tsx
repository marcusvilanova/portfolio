import { Principio } from '@/components/hero/Principio'
import { CONTATO } from '@/data/outros'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="titulo-hero">
      <div className="envoltorio">
        <div className={styles.texto}>
          <p className="rotulo">Analista de Sistemas · IA generativa aplicada · São Paulo</p>
          <h1 id="titulo-hero">
            Marcus Vinícius
            <br />
            Vila Nova
          </h1>
          <p className={styles.gancho}>
            Construo aplicações com IA generativa para áreas que conheço por ter trabalhado nelas: agentes com
            ferramentas, chatbots e respostas ancoradas em documentos, integrados a sistemas reais.
          </p>
          <ul className={styles.acoes}>
            <li>
              <a className={styles.primaria} href="#projetos">
                Ver a arquitetura dos projetos ↓
              </a>
            </li>
            <li>
              <a href={CONTATO.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={CONTATO.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
        <Principio />
      </div>
    </section>
  )
}
