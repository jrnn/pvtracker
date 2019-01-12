const path = require("path")
const webpack = require("webpack")

module.exports = (env, args) => {
  const DIST_PATH = path.resolve(__dirname, "dist")
  const SRC_PATH = path.resolve(__dirname, "src")
  const SERVER_URL = (args.mode === "production")
    ? "https://FILL-IN-LATER.herokuapp.com"
    : "http://localhost:1337"

  return {
    entry: "./src/index.jsx",
    output: {
      path: DIST_PATH,
      filename: "main.js"
    },
    resolve: {
      modules: [
        SRC_PATH,
        "node_modules"
      ]
    },
    devServer: {
      contentBase: DIST_PATH,
      compress: true,
      port: 8080
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          include: [
            SRC_PATH
          ],
          exclude: /node_modules/,
          options: {
            presets: [
              "@babel/env",
              "@babel/react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        SERVER_URL: JSON.stringify(SERVER_URL)
      })
    ]
  }
}
