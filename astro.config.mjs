import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// SITE_URL est injecté au build (Docker/CI). Valeur provisoire en local.
const site = process.env.SITE_URL ?? 'https://example.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
    }),
  ],
  vite: {
    // Aucune ressource inlinée en data: URI (polices, etc.) : permet une CSP stricte (font-src 'self').
    build: { assetsInlineLimit: 0 },
  },
  markdown: {
    shikiConfig: { theme: 'vitesse-dark', wrap: true },
  },
});
