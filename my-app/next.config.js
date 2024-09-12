const nextConfig = {
  images: {
    domains: ['localhost', 'static-cdn.jtvnw.net', 'lokinhorifasback.onrender.com']
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://back-app:5000/:path*', // Redireciona as rotas /api para o back-end Node.js
      },
    ];
  },
};

module.exports = nextConfig;
