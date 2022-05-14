const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: 'eval-source-map',
    devServer: {
      static: './dist',
      watchFiles: ['src/index.html'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Starter App',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin()
    ],
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
              ],
            },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    }
}

module.exports = (env, argv) => {
    if(argv.mode === 'production') {
        config.mode = 'production';
        config.devtool = false;
    }

    return config;
}