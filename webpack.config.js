var webpack = require('webpack');

var config = module.exports = {
	context: __dirname + '/src',
	entry: './index.js',
	output: {
	    filename: 'index.js',
		path: __dirname + '/dist',
		library: 'TillWatch',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: ['transform-class-properties']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ comments: false })
	]
};


var dev = process.argv.indexOf('--watch') > -1;

if (dev) {
	config.devtool = '#inline-source-map';
	config.plugins = [];
}