const path = require("path")
const webpack = require("webpack")

module.exports = (env, args) => {
  const SERVER_URL = (args.mode === "production")
    ? "https://pvtrax.herokuapp.com"
    : "http://localhost:1337"

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "src")
      ],
      extensions: [
        ".js",
        ".ts",
        ".jsx",
        ".tsx"
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      compress: true,
      port: 8080,
      proxy: {
        "/accounts": "http://localhost:1337"
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader"
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
