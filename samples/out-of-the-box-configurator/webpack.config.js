/* eslint-disable */
var webpack = require('webpack');
var path = require("path"),
  CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    // babelPolyfill: 'babel-polyfill',
    controller: path.resolve(__dirname, "./js/controller.js"),
    app: path.resolve(__dirname, "./js/app.jsx")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', exclude: [ "node_modules", "dist" ] }
    ],
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "style!css!less" },
      {
        test: /\.jsx?$/,
        exclude: [ "node_modules", "dist" ],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
        }
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?progressive=true' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?mimetype=image/svg+xml' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: false
    }),
    new CopyWebpackPlugin([{
      from: './html/app.html'
    }]),
    new CopyWebpackPlugin([{
      from: './html/controller.html'
    }]),
    new CopyWebpackPlugin([{
      from: './bundle.json'
    }]),
    new CopyWebpackPlugin([{
      from: './img', to: 'img'
    }]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 4000,
    inline: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
