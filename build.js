const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./build/webpack.prod.conf.js');

webpack(config, function(err, stats){
	if(err){
		throw err;
	} else {
		console.log(stats.toString({
			colors: true,
			chunks: false,
			children: false 
		}));
	}
});

const releaseConfig = merge(config, {
	output: {
		filename: 'Router.min.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				warning: true,
				drop_console: false
			}
		})
	]
});

webpack(releaseConfig, function(err, stats){
	if(err){
		throw err;
	} else {
		console.log(stats.toString({
			colors: true,
			chunks: false,
			children: false 
		}));
	}
});
