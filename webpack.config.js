const path = require('path')

const entry = './src/index.ts'
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = (_env, _argv) => {
  const config = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : '',

    entrty: '',

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  }

  return config
}
