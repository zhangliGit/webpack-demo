const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  /**
   * 多入口打包
   */
  entry: {
    index: './index.js', 
    list: './list.js'
  },
  /**
   * 打包输出文件
   */
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'), // 输入打包文件路径
    filename: './static/js/[name].[hash:8].js' //  多个入口起点输出
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
       * babel编译js,react(jsx) 配置在.babelrc中
       */
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        // 过滤哪些文件用babel编译
        exclude: [
          path.resolve(__dirname, 'node_module')
        ]
      },
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
      },
      /**
       * 处理图片
       * limit 为限制处理的文件大小
       * 当小于limit时 使用url-loader处理文件 转化为 base64编码引用
       * 当大于limit时 使用file-loader处理文件，使用路径引用
       */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: './static/images/[name].[hash:7].[ext]'
        }
      },
      /**
       * 处理音频视频
       */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: './static/media/[name].[hash:7].[ext]'
        }
      },
      /**
       * 处理文字图库
       */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: './static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    /**
     * 指定编译的html模板，并把打包后的文件自动的引入
     */
    new HtmlWebpackPlugin({
      chunks:['index'], //chunks:['index'], //html模板自动添加对应chunk的文件, 也就是entry中的key
      minify:{
        removeAttributeQuotes: true,
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
      hash:true, //向html引入的链接后面增加一段hash值,消除缓存
      filename: 'index.html',
      template: './index.html'
    }),
    new HtmlWebpackPlugin({
      chunks:['list'],
      minify:{
        collapseWhitespace:true //折叠空白区域 也就是压缩代码
      },
      hash:true, //向html引入的src链接后面增加一段hash值,消除缓存
      filename: 'list.html',
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
    }),
    /**
     * 
     */
    new webpack.HashedModuleIdsPlugin()
  ],
};