process.env.NODE_ENV = 'development';
const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.config.common').commonConfig;

let webpackConfig = {
	plugins: [
		/**
		 * 输出html
		 */
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'static/index.tpl.html'),
			inject: 'body',
			filename: 'index.html'
		}),
		/**
		 * 开发环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * 优化
		 * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main']
		}),
		/**
		 * 报错继续运行2.0弃用NoErrorsPlugin，改用NoEmitOnErrorsPlugin
		 */
		new webpack.NoEmitOnErrorsPlugin(),
	]
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);