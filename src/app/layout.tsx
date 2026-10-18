import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'
import './globals.css'

// Serifada só nas declarações grandes; o corpo continua em sans e os rótulos em mono.
const plexSerif = IBM_Plex_Serif({
  variable: '--font-plex-serif',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Marcus Vinícius Vila Nova · IA generativa aplicada',
  description:
    'Portfólio de Marcus Vinícius Vila Nova, Analista de Sistemas: agentes, chatbots e RAG integrados a sistemas reais, com a arquitetura de cada projeto em diagramas interativos.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
