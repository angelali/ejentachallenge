var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',

    output: { path: 'dist', filename: 'bundle.js' },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: ['style', 'css'] },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /(\.jpg|\.png)$/, loaders: ['file-loader?name=img/[name].[ext]'] },
            { test: /\.html$/, loader: 'html' },
        ],

        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
};
