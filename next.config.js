module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "wallpaperaccess.com",
      "d1csarkz8obe9u.cloudfront.net",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
};
