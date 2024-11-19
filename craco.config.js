module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return webpackConfig;
    },
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
      },
    },
  },
};
