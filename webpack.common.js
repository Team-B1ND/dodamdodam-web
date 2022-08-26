const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        type: "asset",
      },
      {
        test: /\.svg/,
        type: "asset",
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "esbuild-loader",
            options: {
              loader: "css",
              minify: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "/",
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      hash: true,
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-report.json",
    }),
  ],
};
