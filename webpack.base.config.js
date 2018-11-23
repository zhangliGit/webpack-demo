const path = require('path');
const webpack = require('webpack');
module.exports = {
  /**
   * 多入口打包
   */
  entry: {
    index: path.resolve(__dirname, '..', './src/index'), 
    list:  path.resolve(__dirname, '..', './src/list'), 
  },
  /**
   * 打包输出文件
   */
  output: {
    publicPath: './', // 指定html加载资源的路径
    path: path.resolve(__dirname, '..', 'dist'), // 输入打包文件路径
    filename: 'static/js/[name].js', //  多个入口起点输出
    // chunkFilename: 'static/js/[id].[chunkhash:8].js',
   // chunkFilename: 'static/js/[name].[chunkhash:8].js', // chunkFilename为按需加载的文件命名 // 「附加分块(additional chunk)」的文件名模板
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
};