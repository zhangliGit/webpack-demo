const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'production',
  /**
   * 多入口打包
   */
  entry: {
    index: './src/index.js', 
    list: './src/list.js'
  },
  /**
   * 打包输出文件
   */
  output: {
    publicPath: './', // 指定html加载资源的路径
    path: path.resolve(__dirname, 'dist'), // 输入打包文件路径
    filename: 'static/js/[name].[chunkhash:8].js', //  多个入口起点输出
    // chunkFilename: 'static/js/[id].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js', // chunkFilename为按需加载的文件命名
  },
  /**
   * 解析
   */
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
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: "localhost",
    port: "8090",
    open: true, // 开启浏览器
    hot: true   // 开启热更新
  },
  /**
   * loadoer配置
   */
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
          name: 'static/images/[name].[hash:7].[ext]'
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
          name: 'static/media/[name].[hash:7].[ext]'
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
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  optimization:{  //优化
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks:{
        cacheGroups:{//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
          vendors:{//node_modules内的依赖库
              chunks:"all",
              test: /[\\/]node_modules[\\/]/,
              name:"vendor",
              minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
              maxInitialRequests: 5,
              minSize: 0,
              priority:100,
          },
          commons: {// 在多页面中进行配置，再多页面中每个页面间可能会用公用的api，配置文件等
            // initial 设置提取同步代码中的公用代码
            chunks: 'initial',
            // test: 'xxxx', 也可使用 test 选择提取哪些 chunks 里的代码
            name: 'common',
            minSize: 0,
            minChunks: 2
            },
          }
        }
  },
  plugins: [
    /**
     * 正式构建时删除dist目录文件
     */
    new CleanWebpackPlugin(['dist']),
    /**
     * 指定编译的html模板，并把打包后的文件自动的引入
     */
    new HtmlWebpackPlugin({
      chunks:['manifest', 'vendor', 'common', 'index'], //chunks:['index'], //html模板自动添加对应chunk的文件, 也就是entry中的key
      minify:{
        removeAttributeQuotes: true,
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
      hash:true, //向html引入的链接后面增加一段hash值,消除缓存
      filename: 'index.html',
      template: './index.html'
    }),
    new HtmlWebpackPlugin({
      chunks:['manifest', 'vendor', 'common', 'list'],
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
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css'
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