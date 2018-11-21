const webpack = require('webpack');
const path = require('path');
const buildConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 开发模式
buildConfig.mode = 'production';

// 插件配置
buildConfig.plugins.push(
  ...[
    /**
     * 正式构建时删除dist目录文件
     */
    new CleanWebpackPlugin(['dist'])
  ]
)

module.exports = buildConfig;