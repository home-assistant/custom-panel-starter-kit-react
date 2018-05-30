const path = require('path');

const webpack = require('webpack');

const package = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const publicPath = isProd ? package.panelServingUrl : 'http://localhost:8080/';
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // Only support the syntax, Webpack will handle it.
              "syntax-dynamic-import",
              "transform-react-jsx",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __PUBLIC_PATH__: JSON.stringify(publicPath),
    }),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: buildPath,
    publicPath,
  },
  devServer: {
    contentBase: buildPath,
  }
}
