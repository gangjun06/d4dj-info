module.exports = {
  locales: ['en', 'ko'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'nav'],
    '/game/character/[id]': ['character', 'card'],
    '/game/gacha': ['gacha'],
    '/game/gacha/[id]': ['gacha', 'card'],
    '/game/card': ['card'],
    '/game/card/[id]': ['card'],
    '/game/music': ['music'],
    '/game/music/[id]': ['music'],
    '/game/event/[id]': ['event'],
    '/game/etc/exp': ['exp', 'card'],
    '/about': ['about'],
  },
}
