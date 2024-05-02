module.exports = {
	module: {
		entry: path.resolve(__dirname, 'src/index.js'),
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: '[name].[contenthash].js',
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
			},
		},
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	}
}