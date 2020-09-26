module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/rooms/:slug',
        destination: `${process.env.API_URL}/rooms/:slug`,
      },
    ];
  },
};
