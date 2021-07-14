module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "i.ibb.co", "secure.gravatar.com"],
  },
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
};
