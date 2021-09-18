const withImage = require("next-images");
module.exports = withImage({
  reactStrictMode: true,
  images: {
    domains: ["api.d4dj.info"],
  },
});
