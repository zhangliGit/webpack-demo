const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    main: './index.js', //单个文件入口
    vendors: './vendors.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输入打包文件路径
    filename: './static/js/[name].[chunkhash:8].js' //  多个入口起点输出
  },
  resolve: {
    /**
     * 自动补全后缀，在导入依赖文件的时候可以不用写后缀
     */
    extensions: ['.css', '.js', '.json', '.scss', '.less'],
    /**
     * 配置别名，引入文件时可以使用别名替代，方便引用路径长的文件
     */
    alias: {
      CSS: './assets/css'
    }
  },
  module: {
    rules: [
      /**
       * 编译less，sass
       */
      {
        test: /\.(css|less|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 使用mini-css-extract-plugin提取css样式到单独的文件
          },
          'css-loader',
          'less-loader',
          'sass-loader'
        ]
      }
      /**
       * 处理图片
       */
      {
        
      }
    ]
  },
  plugins: [
    /**
     * 指定编译的html模板，并把打包后的文件自动的引入
     */
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    /**
     * 提取CSS样式到指定的文件目录
     */
    new MiniCssExtractPlugin({
      filename: './static/css/[name].[contenthash:8].css',
      chunkFilename: '[id].css'
    }),
    /**
     * 压缩CSS代码以及结构，且可以去掉重复的css样式
     */
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
};