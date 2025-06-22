const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: '/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'lana.js',
		clean: true,
	},
	mode: 'development',
	// don't forget to change to production if you are building for production ready outputs

	devServer: {
		static: path.resolve(__dirname, 'build'),
		port: 3000,
		open: true, // Open browser automatically
		historyApiFallback: true, // To work react router dom corectly with browser router
		// don't need if you are using hash router
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},

			{
				test: /\.(jpg|jpeg|png|gif|svg)$/i,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
