'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './NavegacaoDeSecoes.module.css'

const SECOES = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'sistemas', rotulo: 'Sistemas' },
  { id: 'projetos', rotulo: 'Projetos de IA' },
  { id: 'nuvem', rotulo: 'Nuvem' },
  { id: 'clientes', rotulo: 'Sites' },
  { id: 'trajetoria', rotulo: 'Trajetória' },
  { id: 'contato', rotulo: 'Contato' },
] as const

type IdDaSecao = (typeof SECOES)[number]['id']

/** A seção ativa é a que cruza uma linha a 40% da altura da tela; o contato, que é curto, vale quando metade dele aparece. */
const LINHA = '-40% 0px -59% 0px'

export function NavegacaoDeSecoes() {
  const [ativa, setAtiva] = useState<IdDaSecao>('inicio')
  const lista = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const naLinha = new Set<string>()
    let contatoVisivel = false

    const decidir = () => {
      if (contatoVisivel) return setAtiva('contato')
      const primeira = SECOES.find((secao) => naLinha.has(secao.id))
      if (primeira) setAtiva(primeira.id)
    }

    const observadorDaLinha = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) naLinha.add(entrada.target.id)
          else naLinha.delete(entrada.target.id)
        }
        decidir()
      },
      { rootMargin: LINHA },
    )

    const observadorDoContato = new IntersectionObserver(
      ([entrada]) => {
        contatoVisivel = entrada.isIntersecting
        decidir()
      },
      { threshold: 0.5 },
    )

    for (const secao of SECOES) {
      const elemento = document.getElementById(secao.id)
      if (elemento) observadorDaLinha.observe(elemento)
    }
    const contato = document.getElementById('contato')
    if (contato) observadorDoContato.observe(contato)

    return () => {
      observadorDaLinha.disconnect()
      observadorDoContato.disconnect()
    }
  }, [])

  // No celular a lista rola para o lado: mantém o item ativo no centro.
  useEffect(() => {
    const ul = lista.current
    const item = ul?.querySelector<HTMLElement>('[aria-current]')
    if (!ul || !item) return
    ul.scrollTo({ left: item.offsetLeft - (ul.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' })
  }, [ativa])

  return (
    <nav className={styles.navegacao} aria-label="Seções da página">
      <ul ref={lista} className={styles.lista}>
        {SECOES.map((secao) => (
          <li key={secao.id}>
            <a
              href={`#${secao.id}`}
              className={styles.item}
              aria-current={secao.id === ativa ? 'location' : undefined}
            >
              {secao.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
