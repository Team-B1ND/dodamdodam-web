const stream = require('stream-browerify');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return webpackConfig;
    },
    resolve: {
      fallback: {
        stream: stream,
      },
    },
  },
};
