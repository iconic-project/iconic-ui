import { existsSync } from 'node:fs'
import { createResolver } from 'nuxt/kit'
import { fileURLToPath } from 'node:url'

const { resolve } = createResolver(import.meta.url)
const internationalizedDate = fileURLToPath(new URL('./node_modules/@internationalized/date', import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  css: [resolve('./app/assets/css/main.css')],
  alias: existsSync(internationalizedDate)
    ? { '@internationalized/date': internationalizedDate }
    : {},
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'preconnect', href: 'https://cdn.fontshare.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap',
        },
      ],
    },
  },
  fonts: {
    // The stylesheet above loads Satoshi. Resolving it here makes the build
    // download the file to measure fallbacks, and that fetch times out on Netlify.
    processCSSVariables: false,
    families: [
      { name: 'Satoshi', provider: 'none' },
    ],
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', language: 'en', file: 'en.json' },
    ],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
    },
  },
})
