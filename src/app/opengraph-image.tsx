import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { carregarFonteDoGoogle } from '@/lib/fonteDoGoogle'

// Imagem que aparece quando o link é compartilhado (LinkedIn, WhatsApp, X). Gerada no build.

export const alt = 'Marcus Vinícius Vila Nova · Analista de Sistemas · IA generativa aplicada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Mesmas cores de globals.css (tema g100 do Carbon).
const COR = {
  papel: '#161616',
  tinta: '#f4f4f4',
  tintaSuave: '#c6c6c6',
  tintaFraca: '#8d8d8d',
  linha: '#393939',
  sinal: '#4589ff',
}

const ROTULO = 'Analista de Sistemas · IA generativa aplicada · São Paulo'
const NOME = ['Marcus Vinícius', 'Vila Nova']
const GANCHO = 'Agentes, chatbots e RAG integrados a sistemas reais.'
const LEGENDA = 'O princípio de todos os projetos'

// O princípio do diagrama do topo do site; a aresta "JSON" é a ativa, em azul.
const NOS = [
  { rotulo: 'Pergunta', sub: 'texto livre', fundo: '#262626', borda: '#8d8d8d' },
  { rotulo: 'LLM interpreta', sub: 'intenção estruturada', fundo: '#31135e', borda: '#a56eff' },
  { rotulo: 'Regras validam', sub: 'catálogo, permissão', fundo: '#022b30', borda: '#08bdba' },
  { rotulo: 'Código executa', sub: 'SQL, ferramentas', fundo: '#022b30', borda: '#08bdba' },
  { rotulo: 'LLM redige', sub: 'cita as fontes', fundo: '#31135e', borda: '#a56eff' },
]
const ARESTAS = [
  { rotulo: '', ativa: false },
  { rotulo: 'JSON', ativa: true },
  { rotulo: 'válida', ativa: false },
  { rotulo: 'dados', ativa: false },
]

const LARGURA_NO = 156
const ALTURA_NO = 56
const LARGURA_ARESTA = (size.width - 2 * 64 - NOS.length * LARGURA_NO) / ARESTAS.length

const foto = await readFile(join(process.cwd(), 'public/marcus-vila-nova.jpg'), 'base64')

type Fontes = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']

async function carregarFontes(): Promise<Fontes> {
  const mono = [...NOS.map((no) => no.sub), ...ARESTAS.map((aresta) => aresta.rotulo)].join('')
  try {
    const [sansLeve, sans, sansForte, monoNormal] = await Promise.all([
      carregarFonteDoGoogle('IBM Plex Sans', 300, NOME.join('')),
      carregarFonteDoGoogle('IBM Plex Sans', 400, GANCHO + ROTULO + LEGENDA),
      carregarFonteDoGoogle('IBM Plex Sans', 600, NOS.map((no) => no.rotulo).join('')),
      carregarFonteDoGoogle('IBM Plex Mono', 400, mono),
    ])
    return [
      { name: 'Plex Sans', data: sansLeve, weight: 300, style: 'normal' },
      { name: 'Plex Sans', data: sans, weight: 400, style: 'normal' },
      { name: 'Plex Sans', data: sansForte, weight: 600, style: 'normal' },
      { name: 'Plex Mono', data: monoNormal, weight: 400, style: 'normal' },
    ]
  } catch (erro) {
    // Sem acesso ao Google Fonts, a imagem sai com a fonte padrão do next/og em vez de quebrar o build.
    console.warn('opengraph-image: usando a fonte padrão.', erro)
    return undefined
  }
}

export default async function ImagemDeCompartilhamento() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 64px 56px',
          backgroundColor: COR.papel,
          color: COR.tinta,
        }}
      >
        {/* Como no site: a foto vem antes do nome, porque nela você olha para a direita. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <div
            style={{
              display: 'flex',
              width: 300,
              height: 300,
              border: `1px solid ${COR.linha}`,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og só aceita <img> */}
            <img src={`data:image/jpeg;base64,${foto}`} width={300} height={300} style={{ objectFit: 'cover' }} alt="" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Plex Sans', fontSize: 20, letterSpacing: 0.2, color: COR.tintaSuave }}>
              {ROTULO}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 24,
                fontFamily: 'Plex Sans',
                fontWeight: 300,
                fontSize: 88,
                lineHeight: 1,
                letterSpacing: -2.2,
              }}
            >
              {NOME.map((linha) => (
                <div key={linha}>{linha}</div>
              ))}
            </div>
            <div style={{ marginTop: 26, fontFamily: 'Plex Sans', fontSize: 26, color: COR.tintaSuave }}>
              {GANCHO}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              marginBottom: 16,
              fontFamily: 'Plex Sans',
              fontSize: 15,
              letterSpacing: 0.2,
              color: COR.tintaSuave,
            }}
          >
            {LEGENDA}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {NOS.map((no, indice) => (
              <div key={no.rotulo} style={{ display: 'flex', alignItems: 'center' }}>
                {indice > 0 && <Aresta {...ARESTAS[indice - 1]} />}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: LARGURA_NO,
                    height: ALTURA_NO,
                    padding: '0 10px',
                    backgroundColor: no.fundo,
                    border: `1.5px solid ${no.borda}`,
                    borderRadius: 3,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div style={{ fontFamily: 'Plex Sans', fontWeight: 600, fontSize: 15 }}>{no.rotulo}</div>
                  <div style={{ marginTop: 2, fontFamily: 'Plex Mono', fontSize: 11, color: COR.tintaSuave }}>
                    {no.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await carregarFontes() },
  )
}

/** Seta entre dois nós, com o rótulo por cima; a ativa leva o pacote azul, como no site. */
function Aresta({ rotulo, ativa }: { rotulo: string; ativa: boolean }) {
  const cor = ativa ? COR.sinal : COR.tintaFraca
  const fim = LARGURA_ARESTA - 6
  return (
    <div style={{ display: 'flex', position: 'relative', width: LARGURA_ARESTA, height: ALTURA_NO, alignItems: 'center' }}>
      <svg width={LARGURA_ARESTA} height={14} viewBox={`0 0 ${LARGURA_ARESTA} 14`}>
        <path d={`M6 7 H${fim - 8}`} stroke={cor} strokeWidth={ativa ? 2.2 : 1.4} />
        <path d={`M${fim - 9} 2 L${fim} 7 L${fim - 9} 12 z`} fill={cor} />
        {ativa && <circle cx={LARGURA_ARESTA / 2} cy={7} r={4.5} fill={COR.sinal} stroke={COR.papel} strokeWidth={2} />}
      </svg>
      {rotulo && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Plex Mono',
            fontSize: 11,
            color: ativa ? COR.sinal : COR.tintaSuave,
          }}
        >
          {rotulo}
        </div>
      )}
    </div>
  )
}
