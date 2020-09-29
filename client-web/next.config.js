module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/rooms/:slug',
        destination: `${process.env.NEXT_PUBLIC_API_TOPIC}/rooms/:slug`,
      },
      {
        source: '/api/users/:slug',
        destination: `${process.env.NEXT_PUBLIC_API_TOPIC}/users/:slug`,
      },
    ];
  },
};
