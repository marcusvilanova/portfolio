import Image from 'next/image'
import { Principio } from '@/components/hero/Principio'
import { CONTATO } from '@/data/outros'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="titulo-hero">
      <div className="envoltorio">
        <div className={styles.topo}>
          <div className={styles.texto}>
            <p className="rotulo">Analista de Sistemas · IA generativa aplicada · São Paulo</p>
            {/* Cada linha sobe por trás de uma máscara ao carregar. */}
            <h1 id="titulo-hero">
              <span className={styles.linha}>
                <span>Marcus Vinícius</span>
              </span>
              <span className={styles.linha}>
                <span>Vila Nova</span>
              </span>
            </h1>
            <p className={styles.gancho}>
              Construo aplicações com IA generativa para áreas que conheço por ter trabalhado nelas: agentes com
              ferramentas, chatbots e respostas ancoradas em documentos, integrados a sistemas reais.
            </p>
            <ul className={styles.acoes}>
              <li>
                <a className={styles.primaria} href="#sistemas">
                  Ver os projetos ↓
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

          {/* No desktop fica à direita do nome; no celular, acima dele. */}
          <div className={styles.retrato}>
            <Image
              src="/marcus-vila-nova.jpg"
              alt="Foto de Marcus Vinícius Vila Nova"
              width={400}
              height={400}
              sizes="(max-width: 860px) 96px, 260px"
              loading="eager"
            />
          </div>
        </div>
        <Principio />
      </div>
    </section>
  )
}
