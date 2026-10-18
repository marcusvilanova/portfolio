import type { CSSProperties } from 'react'

interface Props {
  texto: string
  como?: 'h1' | 'h2' | 'p'
  id?: string
  className?: string
}

/**
 * Frase grande cujas palavras ganham tinta conforme sobem na tela (ver .declaracao em globals.css).
 * Cada palavra recebe --p, a posição relativa dela na frase, que escalona o início da animação.
 */
export function Declaracao({ texto, como: Tag = 'h2', id, className }: Props) {
  const palavras = texto.split(' ')
  const classe = className ? `declaracao ${className}` : 'declaracao'

  return (
    <Tag id={id} className={classe}>
      {palavras.map((palavra, indice) => (
        <span key={indice} className="palavra" style={{ '--p': indice / palavras.length } as CSSProperties}>
          {indice < palavras.length - 1 ? `${palavra} ` : palavra}
        </span>
      ))}
    </Tag>
  )
}
