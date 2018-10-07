var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'hyperjs';

var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/build.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'amd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-decorators-legacy',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.css$/,
				loader: 'style!css!'
			}
			// {
			// 	test: /(\.jsx|\.js)$/,
			// 	loader: "eslint-loader",
			// 	exclude: /node_modules/
			// }
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
		// alias: {
		// 	'scaleapp/plugins': path.resolve('./node_modules/scaleapp/dist/plugins'),
		// }
	},
	plugins: plugins
};

module.exports = config;