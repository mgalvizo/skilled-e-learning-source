const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            // Babel setup
            {
                // Along PostCSS Babel can also use the configuration in the .browserslistrc file
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // HTML template for the output HTML file
            template: 'src/template.html',
            filename: 'index.html',
        }),
        // Cleanup after every build
        new CleanWebpackPlugin(),
    ],
};

module.exports = config;
