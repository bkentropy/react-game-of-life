var webpack = require('webpack');

module.exports = {
  // should probably turn source map off for prod
  devtool: 'source-map',
  entry: [
    './client/index',
  ],
  output: {
    path: __dirname + '/server/public/',
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    {
      test: /\.js$/,
      include: __dirname + '/client',
      loaders: ['babel'],
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
}
