module.exports = {
  locales: ["en", "ko"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "nav"],
    "/game/card": ["card"],
    "/game/card/[id]": ["card"],
    "/game/music": ["music"],
    "/game/music/[id]": ["music"],
    "/about": ["about"],
  },
};
