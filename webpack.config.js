const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const PORT = process.env.PORT || 3000

const distRoot = (...paths) => path.join(process.cwd(), 'dist', ...paths)

module.exports = (_env, _argv) => {
  const config = {
    target: 'web',
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : 'cheap-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.sass', '.scss', '.css'],
    },

    entry: ['react-hot-loader/patch', './src'],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[hash].js',
    },

    plugins: [
      new HtmlWebpackPlugin({ filename: 'index.html', template: './public/index.html', minify: false }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['index.html'],
            },
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(js|ts)x$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            'babel-loader',
            '@svgr/webpack',
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
  }

  if (isDev) {
    config.devServer = {
      port: PORT,
      contentBase: 'public',
      hot: true,
      overlay: {
        errors: true,
        warnings: true,
      },
    }
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
    }
    config.resolve.alias = {
      'react-dom': '@hot-loader/react-dom',
    }
  }
  if (isProd) {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
      runtimeChunk: 'multiple',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
      },
    }
    config.plugins.push(
      ...[
        // new CompressionPlugin(),
        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
              ],
            ],
          },
        }),
      ],
    )
  }
  return config
}
