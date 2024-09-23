const nextConfig = {
  images: {
    domains: ['localhost', 'static-cdn.jtvnw.net', 'lokinhoskins.com.br']
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*', // Redireciona as rotas /api para o back-end Node.js
      },
    ];
  },
};

module.exports = nextConfig;
