const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const pluginsCommon = ['babel-plugin-styled-components', 'react-hot-loader/babel']
const pluginsDev = []
const pluginsProd = [
  'lodash',
  '@babel/plugin-transform-react-inline-elements',
  '@babel/plugin-transform-react-constant-elements',
]
const presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']

const plugins = pluginsCommon
if (isDev) {
  plugins.push(...pluginsDev)
}
if (isProd) {
  plugins.push(...pluginsProd)
}

module.exports = {
  presets,
  plugins,
}
