import path from 'path';
import withPlugins from 'next-compose-plugins';
import optimizedImages from 'next-optimized-images';

module.exports = withPlugins([
  [
    optimizedImages,
    {
      inlineImageLimit: 8192,
      imagesFolder: path.resolve(__dirname, 'public/photos'),
      handleImages: ['jpg', 'jpeg'],
      removeOriginalExtension: false,
      optimizeImages: true,
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 90,
      },
    },
  ],
]);
