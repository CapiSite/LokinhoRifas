// my-app/next.config.js
const repoName = 'LokinhoRifas'                               // nome exato do seu repo
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,

  // só em produção (GitHub Pages roda em production)
  basePath: isDev ? '' : `/${repoName}`,
  assetPrefix: isDev ? '' : `/${repoName}/`,

  images: {
    domains: [ 'static-cdn.jtvnw.net', 'lokinhoskins.com.br' ]
  },
  reactStrictMode: true,

  // expõe no bundle a URL do seu backend
  env: {
    NEXT_PUBLIC_API_URL: isDev
      ? 'http://localhost:5000'       // dev local
      : 'https://lokinhorifas.onrender.com'
  }
}
