/**
 * Fonte para as imagens geradas com next/og, que só leem TTF, OTF ou WOFF (o next/font serve woff2).
 * Pede ao Google Fonts só os caracteres de `texto`, então cada arquivo tem poucos KB. Roda no build, como o next/font.
 */
export async function carregarFonteDoGoogle(familia: string, peso: number, texto: string): Promise<ArrayBuffer> {
  const parametros = new URLSearchParams({ family: `${familia}:wght@${peso}`, text: texto })
  const css = await fetch(`https://fonts.googleapis.com/css2?${parametros}`).then((resposta) => resposta.text())
  const arquivo = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!arquivo) throw new Error(`O Google Fonts não devolveu ${familia} ${peso} em TTF.`)

  const resposta = await fetch(arquivo)
  if (!resposta.ok) throw new Error(`Falha ao baixar ${familia} ${peso}: HTTP ${resposta.status}.`)
  return resposta.arrayBuffer()
}
