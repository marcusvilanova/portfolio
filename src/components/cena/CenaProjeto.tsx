'use client'

import { useEffect, useRef, useState } from 'react'
import type { Projeto } from '@/data/tipos'
import { Diagrama } from '@/components/diagrama/Diagrama'
import { Legenda } from '@/components/diagrama/Legenda'
import { BlocoDeCodigo } from '@/components/codigo/BlocoDeCodigo'
import styles from './CenaProjeto.module.css'

interface Props {
  projeto: Projeto
  numero: number
  total: number
  /** Para onde vai o "pular": a próxima cena, ou a seção seguinte depois da última. */
  proximo: { href: string; rotulo: string }
}

const dois = (n: number) => String(n).padStart(2, '0')

export function CenaProjeto({ projeto, numero, total, proximo }: Props) {
  const [passoAtivo, setPassoAtivo] = useState(0)
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const passos = useRef<(HTMLLIElement | null)[]>([])

  // O diagrama ocupa a metade de cima da tela; o passo ativo é o que cruza a faixa logo abaixo dele.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setPassoAtivo(Number((entrada.target as HTMLElement).dataset.passo))
        }
      },
      { rootMargin: '-62% 0px -30% 0px' },
    )
    passos.current.forEach((elemento) => elemento && observador.observe(elemento))
    return () => observador.disconnect()
  }, [projeto.passos.length])

  const noSelecionado = projeto.nos.find((no) => no.id === selecionado)
  const idTitulo = `projeto-${projeto.id}`

  return (
    <section id={`cena-${projeto.id}`} className={styles.cena} aria-labelledby={idTitulo}>
      <header className={styles.cabecalho}>
        <p className="rotulo">
          {dois(numero)} / {dois(total)} · {projeto.contexto}
        </p>
        <h3 id={idTitulo}>{projeto.nome}</h3>
        <p className={styles.resumo}>{projeto.resumo}</p>
        <ul className="pilha" aria-label="Tecnologias">
          {projeto.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {projeto.link && (
          <a className={styles.link} href={projeto.link.url} target="_blank" rel="noreferrer">
            {projeto.link.rotulo} ↗
          </a>
        )}
      </header>

      <div className={styles.grade}>
        <div className={styles.palco}>
          <figure className={styles.quadro}>
            <div className={styles.progresso}>
              <span className={styles.contagem}>
                Passo {passoAtivo + 1} de {projeto.passos.length}
              </span>
              <ol className={styles.segmentos} aria-hidden="true">
                {projeto.passos.map((passo, indice) => (
                  <li
                    key={passo.titulo}
                    className={
                      indice < passoAtivo ? styles.feito : indice === passoAtivo ? styles.atual : undefined
                    }
                  />
                ))}
              </ol>
              <a className={styles.pular} href={proximo.href} aria-label={`Pular para ${proximo.rotulo}`}>
                Pular ↓
              </a>
            </div>
            <div className={styles.tela}>
              <Diagrama
                dados={projeto}
                passoAtivo={passoAtivo}
                selecionado={selecionado}
                onSelecionar={(id) => setSelecionado((atual) => (atual === id ? null : id))}
              />
            </div>
            <figcaption className={styles.rodapeDoQuadro}>
              <div className={styles.detalhe} aria-live="polite">
                {noSelecionado ? (
                  <>
                    <strong>{noSelecionado.rotulo}</strong> {noSelecionado.detalhe}
                  </>
                ) : (
                  <span className={styles.dica}>Clique num bloco do diagrama para ver o que ele faz.</span>
                )}
              </div>
              <Legenda />
            </figcaption>
          </figure>
        </div>

        <ol className={styles.passos}>
          {projeto.passos.map((passo, indice) => (
            <li
              key={passo.titulo}
              data-passo={indice}
              ref={(elemento) => {
                passos.current[indice] = elemento
              }}
              className={indice === passoAtivo ? `${styles.passo} ${styles.passoAtivo}` : styles.passo}
            >
              <span className="rotulo">Passo {indice + 1}</span>
              <h4>{passo.titulo}</h4>
              <p>{passo.texto}</p>
              {passo.trecho && <BlocoDeCodigo trecho={passo.trecho} />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
