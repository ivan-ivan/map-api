const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './client/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};