module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/status',
        destination: `${process.env.API_URL}/status`,
      },
    ];
  },
};
