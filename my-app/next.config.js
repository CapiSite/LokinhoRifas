// next.config.js
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // em dev o localhost ainda funciona, em prod só os domínios reais
    domains: isDev
      ? ['localhost', 'static-cdn.jtvnw.net', 'lokinhoskins.com.br']
      : ['static-cdn.jtvnw.net', 'lokinhoskins.com.br'],
  },

  // só injetamos a variável no bundle, que você define no Vercel/Local .env
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // somente em dev fazemos o rewrite /api → proxy local
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination:
            (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001') +
            '/:path*',
        },
      ]
    },
  }),
}

module.exports = nextConfig
