const path = require('path')

module.exports = (env = {}) => {
  return {
    entry: './js/modules/index.js',
    devServer: {
      contentBase: './public'
    },
    module: {
      rules: [
        { test: /\.js$/,
          exclude: /node_modules/ }
      ]
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/js')
    }
  }
}
