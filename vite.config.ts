import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import seo from './src/seo.json' with { type: 'json' }

type Locale = keyof typeof seo
const locales = Object.keys(seo) as Locale[]

// Preenche as marcas {{...}} do index.html com os dados de SEO de um idioma.
// Os valores entram em atributos HTML e no bloco JSON-LD sem escape, então
// aspas duplas e "<" são recusados em vez de gerar marcação quebrada.
function fill(html: string, locale: Locale, site: string): string {
  const other = locales.find((l) => l !== locale)!
  const values: Record<string, string> = {
    ...seo[locale],
    site,
    url: site + seo[locale].path,
    ogLocaleAlt: seo[other].ogLocale,
  }
  return html.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key]
    if (value === undefined) throw new Error(`index.html usa {{${key}}}, que não existe em src/seo.json`)
    if (/["<]/.test(value)) throw new Error(`src/seo.json: "${key}" (${locale}) não pode conter aspas duplas nem "<"`)
    return value
  })
}

// Site estático com um HTML por idioma: "/" em português e "/en/" em inglês,
// cada um com título, descrição e Open Graph próprios, mais robots.txt e sitemap.
function seoPages(site: string): Plugin {
  let template = ''
  let outDir = 'dist'
  let building = false
  return {
    name: 'seo-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      building = config.command === 'build'
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html
        return fill(html, 'pt', site)
      },
    },
    // closeBundle também roda quando o servidor de desenvolvimento fecha;
    // só o build de produção pode escrever em dist/.
    closeBundle() {
      if (!building || !template) return
      mkdirSync(resolve(outDir, 'en'), { recursive: true })
      writeFileSync(resolve(outDir, 'en/index.html'), fill(template, 'en', site))

      const alternates = locales
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${seo[l].lang}" href="${site}${seo[l].path}" />`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/" />`)
        .join('\n')
      const urls = locales.map((l) => `  <url>\n    <loc>${site}${seo[l].path}</loc>\n${alternates}\n  </url>`).join('\n')
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      )
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const site = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  if (!site || site.includes('seu-dominio')) {
    console.warn('\n[seo] VITE_SITE_URL ainda não é o domínio real. Ajuste o arquivo .env antes de publicar.\n')
  }
  return { plugins: [react(), seoPages(site)] }
})
