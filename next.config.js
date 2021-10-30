const nextTranslate = require("next-translate");
module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  images: {
    domains: ["asset.d4dj.info"],
  },
});
