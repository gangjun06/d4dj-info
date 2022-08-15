// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate')
module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config
  },
  images: {
    domains: ['cdn.d4dj.info'],
  },
})
