const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = merge(webpackCommon, {
  mode: "production",
  devtool: "hidden-source-map",
  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
        css: true,
      }),
    ],
  },
  plugins: [new ESBuildPlugin()],
});
