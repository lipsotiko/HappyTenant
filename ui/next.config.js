module.exports = {
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production'
    return !isProd
      ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ]:[]
  }
}
