const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const WebpackDevServerOutput = require('webpack-dev-server-output');

// 开发模式
baseConfig.mode = 'development';

// 打包文件在内存中的输出路径，可以通过http://localhost:8080/dist/访问
baseConfig.output.publicPath = './';

// 方便追踪源代码中的错误
baseConfig.devtool = 'source-map';

// 服务配置
baseConfig.devServer = {
  contentBase: path.join(__dirname, "dist"),
  host: 'localhost',
  port: '8080',
  hot: true,
  open: true,
}

// 插件配置s
baseConfig.plugins.push(
  ...[
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WebpackDevServerOutput({
      path: "./dist"
    })
  ]
)

module.exports = baseConfig;