module.exports = {
  env: {
    REACT_APP_BASE_URL: 'http://127.0.0.1:8000',
  },
  images: {
    domains: ['127.0.0.1'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
