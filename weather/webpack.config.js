const path = require('path');

module.exports = {
  entry: './js/dev/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' }
    ]
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 900,
    poll: 2000
  }
};
