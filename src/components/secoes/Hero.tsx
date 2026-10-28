import Image from 'next/image'
import { ArrowDown, Download, LogoGithub, LogoLinkedin } from '@carbon/icons-react'
import { Principio } from '@/components/hero/Principio'
import { CONTATO, CURRICULO } from '@/data/outros'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="titulo-hero">
      <div className="envoltorio">
        <div className={styles.texto}>
          <p className="rotulo">Analista de Sistemas · IA generativa aplicada · São Paulo</p>
          {/* A foto fica à esquerda do nome, com a altura das duas linhas dele; no celular, acima. */}
          <div className={styles.identidade}>
            <div className={styles.retrato}>
              <Image
                src="/marcus-vila-nova.jpg"
                alt="Foto de Marcus Vinícius Vila Nova"
                width={400}
                height={400}
                sizes="(max-width: 560px) 88px, 144px"
                loading="eager"
              />
            </div>
            {/* Cada linha sobe por trás de uma máscara ao carregar. */}
            <h1 id="titulo-hero">
              <span className={styles.linha}>
                <span>Marcus Vinícius</span>
              </span>
              <span className={styles.linha}>
                <span>Vila Nova</span>
              </span>
            </h1>
          </div>
          <p className={styles.gancho}>
            Construo aplicações com IA generativa para áreas que conheço por ter trabalhado nelas: agentes com
            ferramentas, chatbots e respostas ancoradas em documentos, integrados a sistemas reais.
          </p>
          <ul className={styles.acoes}>
            <li>
              <a className="botao botao-primario" href="#sistemas">
                Ver os projetos <ArrowDown size={16} className="seta-baixo" />
              </a>
            </li>
            <li>
              <a className="botao botao-terciario" href={CURRICULO} download>
                Currículo em PDF <Download size={16} className="seta-baixo" />
              </a>
            </li>
            <li>
              <a className="botao botao-terciario" href={CONTATO.github} target="_blank" rel="noreferrer">
                GitHub <LogoGithub size={16} />
              </a>
            </li>
            <li>
              <a className="botao botao-terciario" href={CONTATO.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <LogoLinkedin size={16} />
              </a>
            </li>
          </ul>
        </div>
        <Principio />
      </div>
    </section>
  )
}
