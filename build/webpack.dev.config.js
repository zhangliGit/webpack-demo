const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    host: "localhost",
    port: "8090",
    open: true, // 开启浏览器
    hot: true,   // 开启热更新
    publicPath: '/'
  },
  /**
   * loadoer配置
   */
  module: {
    rules: [
      {
        test: /\.(css|less|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 指定编译的html模板，并把打包后的文件自动的引入
     */
    new HtmlWebpackPlugin({
      chunks: ['index'],
      minify:{
        removeAttributeQuotes: true,
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
      hash:true, //向html引入的链接后面增加一段hash值,消除缓存
      filename: 'index.html',
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['list'],
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      },
      hash:true, //向html引入的src链接后面增加一段hash值,消除缓存
      filename: 'list.html',
      template: 'index.html'
    }),
  ]
});

module.exports = devConfig;