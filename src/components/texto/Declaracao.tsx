import { Fragment, type CSSProperties } from 'react'

interface Props {
  texto: string
  como?: 'h1' | 'h2' | 'p'
  id?: string
  className?: string
}

/**
 * Frase grande cujas palavras saem do desfoque conforme sobem na tela (ver .declaracao em globals.css).
 * Cada palavra recebe --p, a posição relativa dela na frase, que escalona o início da animação.
 */
export function Declaracao({ texto, como: Tag = 'h2', id, className }: Props) {
  const palavras = texto.split(' ')
  const classe = className ? `declaracao ${className}` : 'declaracao'

  return (
    <Tag id={id} className={classe}>
      {/* O espaço fica fora do span: a palavra é inline-block (para poder subir) e engoliria o espaço final. */}
      {palavras.map((palavra, indice) => (
        <Fragment key={indice}>
          <span className="palavra" style={{ '--p': indice / palavras.length } as CSSProperties}>
            {palavra}
          </span>
          {indice < palavras.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}
