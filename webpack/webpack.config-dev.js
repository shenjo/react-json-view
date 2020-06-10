const path = require("path")
const webpack = require("webpack")

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  js: path.join(__dirname, "..", "src", "js"),
  style: path.join(__dirname, "..", "src", "style"),
  build: path.join(__dirname, "..", "dev-server", "dist"),
  devServer: path.join(__dirname, "..", "dev-server")
}

const config = {
  entry: [PATHS.devServer + "/src/index.js"],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    host: "localhost",
    port: 2000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build
  },
  output: {
    path: PATHS.build,
    filename: "main.js",
    library: "reactJsonView",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: [PATHS.js, PATHS.devServer]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
          options: { // 配置参数
            name: '[name]_[hash].[ext]', // 使用图片的名字，并使用图片的后缀
            limit: 10240
          }
        }
      },
    ]
  }
}

module.exports = config
