console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfig = {
	resolve: {//重定向路径
		mainFiles: ['index.web','index'],
		modules: ['node_modules'],
		extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss'],
		alias: {}
	},
	entry: {
		main: path.resolve(__dirname, 'example/main.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash:8].js',
		/**
		 * html引用路径
		 */
		publicPath: '/'
	},
	module: {
		exprContextCritical: false,
		rules: [
			{
				test: /\.jsx?$/,
				exclude:[
					path.resolve(__dirname,'node_modules'),
				],
				use: ['babel-loader']
			}, 
			{
				test: /\.(css|scss)$/,
				use: ['style-loader','css-loader','postcss-loader','sass-loader'],
			},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader','postcss-loader','less-loader'],
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/, 
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}
		]
	}
};
const defaultConfig = {
	devtool: process.env.NODE_ENV != 'development' ? undefined : 'source-map',
	output: {
		filename: '[name].[hash:8].bundle.js',
		sourceMapFilename: '[name].[hash:8].bundle.map',
		chunkFilename: '[id].[hash:8].chunk.js'
	},
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		contentBase: './',
		port: process.env.NODE_ENV != 'development'?9090:8080,
		inline: true,
		stats: 'errors-only',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 500
		}
	},
	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		Buffer: false,
		clearImmediate: false,
		setImmediate: false
	}
};
module.exports = {
	commonConfig: webpackMerge(
		webpackConfig,
		defaultConfig
	)
};