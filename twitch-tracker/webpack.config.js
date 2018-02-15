const path = require('path')

module.exports = {
  entry: './js/modules/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' }
    ]
  }
}
