var path = require('path')
var webpack = require('webpack')
var VuePlugin = require('vue-loader/lib/plugin');
var HtmlPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var MiniCssPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		style: './assets/main.scss',
		index: './src/index.ts'
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					esModule: true,
					loaders: {
						'css': 'vue-style-loader!css-loader',
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/],
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.scss$/,
				use: [{
						loader: MiniCssPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}

		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					enforce: true,
					chunks: 'all'
				}
			}
		}
	},
	devtool: '#source-map',
	watchOptions: {
		ignored: /node_modules/
	},
	plugins: [
		new MiniCssPlugin(),
		new VuePlugin(),
		new HtmlPlugin({
			inject: false,
			filename: 'index.html',
			template: 'src/index.html',
			chunksSortMode: 'dependency'
		}),
		new CopyPlugin([{
			from: 'static',
			to: './',
			test: /.*\.(png|jpg|jpeg|gif|svg|json)$/
		}]),
	]
}