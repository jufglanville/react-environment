const prod = process.env.NODE_ENV === "production";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: prod ? "production" : "development",
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[contenthash].bundle.js",
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new PrettierPlugin(),
    new ESLintPlugin(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      publicPath: "/",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: prod ? false : "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".wasm"],
  },
};
