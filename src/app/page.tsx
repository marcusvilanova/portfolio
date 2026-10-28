import { Cabecalho } from '@/components/secoes/Cabecalho'
import { Hero } from '@/components/secoes/Hero'
import { SecaoSobre } from '@/components/secoes/SecaoSobre'
import { SecaoSistemas } from '@/components/secoes/SecaoSistemas'
import { SecaoProjetos } from '@/components/secoes/SecaoProjetos'
import { SecaoNuvem } from '@/components/secoes/SecaoNuvem'
import { SecaoClientes } from '@/components/secoes/SecaoClientes'
import { Rodape, SecaoTrajetoria } from '@/components/secoes/SecaoTrajetoria'
import { NavegacaoDeSecoes } from '@/components/navegacao/NavegacaoDeSecoes'

export default function Pagina() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <SecaoSobre />
        <SecaoSistemas />
        <SecaoProjetos />
        <SecaoNuvem />
        <SecaoClientes />
        <SecaoTrajetoria />
      </main>
      <Rodape />
      <NavegacaoDeSecoes />
    </>
  )
}
