// const withImage = require("next-images");
const nextTranslate = require("next-translate");
// withImage({
//   reactStrictMode: true,
//   images: {
//     domains: ["asset.d4dj.info"],
//   },
// });
module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
});
