import { Cabecalho } from '@/components/secoes/Cabecalho'
import { Hero } from '@/components/secoes/Hero'
import { SecaoProjetos } from '@/components/secoes/SecaoProjetos'
import { SecaoNuvem } from '@/components/secoes/SecaoNuvem'
import { SecaoClientes } from '@/components/secoes/SecaoClientes'
import { Rodape, SecaoTrajetoria } from '@/components/secoes/SecaoTrajetoria'

export default function Pagina() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <SecaoProjetos />
        <SecaoNuvem />
        <SecaoClientes />
        <SecaoTrajetoria />
      </main>
      <Rodape />
    </>
  )
}
