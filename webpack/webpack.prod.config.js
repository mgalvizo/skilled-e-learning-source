const path = require('path');
const glob = require('glob');
const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// You can override webpack.common.config options here
module.exports = merge(common, {
    entry: './src/js/index.js',
    output: {
        // Creates directory and puts the file inside
        filename: 'js/[name].[contenthash].js',
    },
    mode: 'production',
    // No source maps in production so we do NOT expose our code structure to other people
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css)$/,
                // Exclude CSS modules
                exclude: /\.(module)\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                // Support CSS modules
                test: /\.(css)$/,
                include: /\.(module)\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                // Configure generated class names to be unreadable
                                localIdentName: '[hash:base64]',
                            },
                        },
                    },
                ],
            },
            {
                // Support LESS
                test: /\.(less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                // Support SASS
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // Support images letting webpack decide between data url or file
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 10 kb condition
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: './images/[name].[contenthash][ext]',
                },
            },
        ],
    },
    // CSS, JS and Images optimizations and support for tree shaking
    optimization: {
        minimize: true,
        minimizer: [
            `...`, // Keeps the Terser configuration for JS
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            jpeg: {
                                // https://sharp.pixelplumbing.com/api-output#jpeg
                                quality: 90,
                            },
                            webp: {
                                // https://sharp.pixelplumbing.com/api-output#webp
                                quality: 90,
                                lossless: true,
                            },
                            avif: {
                                // https://sharp.pixelplumbing.com/api-output#avif
                                lossless: true,
                            },
                            // png by default sets the quality to 100%, which is same as lossless
                            // https://sharp.pixelplumbing.com/api-output#png
                            png: {
                                quality: 90,
                            },
                            // gif does not support lossless compression at all
                            // https://sharp.pixelplumbing.com/api-output#gif
                            gif: {},
                        },
                    },
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                        encodeOptions: {
                            // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                            multipass: true,
                            plugins: [
                                // set of built-in plugins enabled by default
                                // see: https://github.com/svg/svgo#default-preset
                                'preset-default',
                            ],
                        },
                    },
                },
            }),
        ],
        usedExports: true,
        // Adding code splitting
        splitChunks: {
            // initial and async chunks
            chunks: 'all',
            // specified in bytes
            maxSize: 140000,
            minSize: 50000,
            name(module, chunks, cacheGroupKey) {
                const filePathAsArray = module.identifier().split('/');
                return filePathAsArray[filePathAsArray.length - 1];
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Creates directory and puts the file inside
            filename: 'css/[name].[contenthash].css',
        }),
        // Removes Unused CSS from the bundle e.g. when installing tailwind, bootstrap, etc...
        new PurgeCSSPlugin({
            // glob is an npm package that matches a specific pattern
            paths: glob.sync(
                // All files located in the src folder
                `${path.join(__dirname, '../src')}/**/*`,
                // do NOT match directories only files
                { nodir: true }
            ),
        }),
        // Enable gzip compression for legacy browser support
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
        }),
    ],
});
