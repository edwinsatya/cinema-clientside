module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "i.ibb.co"],
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
