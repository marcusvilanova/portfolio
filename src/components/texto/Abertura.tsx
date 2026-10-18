import type { ReactNode } from 'react'
import { Declaracao } from './Declaracao'

interface Props {
  rotulo: string
  titulo: string
  idTitulo: string
  children: ReactNode
}

/**
 * Abertura de seção: rótulo, declaração e descrição num palco que fica preso no centro da tela
 * enquanto as palavras aparecem (ver .abertura em globals.css).
 */
export function Abertura({ rotulo, titulo, idTitulo, children }: Props) {
  return (
    <div className="abertura">
      <div className="abertura-palco">
        <div className="titulo-secao">
          <p className="rotulo">{rotulo}</p>
          <Declaracao id={idTitulo} texto={titulo} />
          {children}
        </div>
      </div>
    </div>
  )
}
