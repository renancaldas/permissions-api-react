/* eslint no-console: ["error", { allow: ["log"] }] */
import path from 'path';
import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEV_SERVER_URL = 'http://localhost:8080';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

console.log('============================ WhitePrompt ============================');
console.log('Webpack is building for: ', PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT');

const entry = PRODUCTION
    ? './src/index.jsx'
    : { app: [
      './src/index.jsx',
    ] };


const plugins = PRODUCTION
    ? [
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({ template: './index.html' }),
    ]
    : [
      new OpenBrowserPlugin({ url: DEV_SERVER_URL }),
      new HtmlWebpackPlugin({ template: './index.html' }),
    ];

// Injecting global variables into source code
plugins.push(
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION),
    }),
    new ExtractTextPlugin({
      filename: 'bundle-[hash].css',
      disable: false,
      allChunks: true,
    }),
);

module.exports = {
  devtool: 'source-map', // to see the actual es6 code in chrome dev tools
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.[hash:12].min.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader'],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],

    modules: [
      'node_modules',
    ],

    // Whenever someone does import 'react', resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, 'node_modules/react'),
    },
  },
  plugins,
};
