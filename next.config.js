module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "i.ibb.co", "secure.gravatar.com"],
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
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
};
