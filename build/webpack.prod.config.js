const path = require('path');

module.exports = {
	// 入口
	entry: ['../src/Router.js'],
	// 出口
	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '/',
		filename: 'Router.js',
		library: 'Router',
		libraryTarget: 'umd'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	}
}