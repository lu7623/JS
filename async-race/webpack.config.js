const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                             MiniCssExtractPlugin.loader,
                                'css-loader',
                                'postcss-loader',
                                'sass-loader',
                              ],
            },
            {
                        test: /\.(png|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
            },
            { test: /\.ts$/i, use: 'ts-loader' },
                     {
                      test: /\.svg$/,
                        type: 'asset/resource',
                        generator: {
                          filename: path.join('icons', '[name].[contenthash][ext]'),
                      },
                      },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), 
            filename: 'index.html', 
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new MiniCssExtractPlugin({
               filename: '[name].[contenthash].css',
             }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
         port: 9000,
      },
}