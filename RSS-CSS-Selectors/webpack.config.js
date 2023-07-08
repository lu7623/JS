const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslingPlugin = require('eslint-webpack-plugin');


module.exports = {
  entry: [ path.join(__dirname, '/src/index'), path.join(__dirname, '/src/sass/main.scss')],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,  use: 'html-loader'
          },
      { test: /\.ts$/i, use: 'ts-loader' },
       {
         test: /\.(scss|css)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
       },
       { 
        test: /\.(png|jpg|jpeg|gif|sg)$/i,
              type: 'asset/resource',
              },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
},
  plugins: [
    new EslingPlugin({ extensions: 'ts' }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
             filename: '[name].[contenthash].css',
           }),
     new FileManagerPlugin({
                 events: {
                 onStart: {
                delete: ['RSS-CSS-Selectors/dist'],
                  },
                 },
               }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'RSS-CSS-Selectors/src'),
    port: 9000,
  },
};