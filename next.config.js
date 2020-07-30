const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [
    withOptimizedImages, // Configure based on your needs
    {
      mozjpeg: {
        quality: 50,
      },
      webp: {
        quality: 50,
      },
    },
  ],
])
