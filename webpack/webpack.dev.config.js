const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config');

// You can override webpack.common.config options here
module.exports = merge(common, {
    entry: './src/js/index-dev.js',
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
    // Better performance source-map for development
    devtool: 'eval-source-map',
    devServer: {
        port: 9000,
        static: {
            // Directory that will serve static files
            directory: path.resolve(__dirname, '../dist'),
            // Do NOT watch dist files
            watch: false,
        },
        // Enable livereload
        liveReload: true,
        // Livereload only for the HTML template changes
        watchFiles: ['src/**/*.html'],
        // Enable hot module replacement for JS and CSS
        hot: true,
        open: true,
        devMiddleware: {
            index: 'index.html',
            // Generate files into the disk
            writeToDisk: true,
        },
        client: {
            // Show an overlay in case of errors when compiling
            overlay: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                exclude: /\.(module)\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Support CSS modules
                test: /\.(css)$/,
                include: /\.(module)\.(css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                // Configure generated class names to be readable
                                // It will contain the original class name and a hash
                                localIdentName: '[local]--[md4:hash:7]',
                            },
                        },
                    },
                ],
            },
            {
                // Support LESS
                test: /\.(less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                // Support SASS
                test: /\.(scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // Support images letting webpack decide between data url or file
            {
                test: /\.(png|jpg|svg|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 10 kb condition
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: '[name][ext]',
                },
            },
        ],
    },
    // Support tree shaking to remove unused exports from external libraries
    optimization: {
        usedExports: true,
    },
});
