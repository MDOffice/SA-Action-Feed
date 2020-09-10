const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = {
    entry: './src/index.js',

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    optimization: {
        minimizer: [
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),*/
            //new OptimizeCSSAssetsPlugin({})
        ]
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        //  new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: [
            path.join(__dirname, 'examples'),
            path.join(__dirname, 'lib'),
            path.join(__dirname, 'dist')
        ],
        compress: true
    }
};

module.exports = [
    merge(common, {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.umd.js',
            library: 'SAActionFeed',
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    }),
    merge(common, {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            library: 'SAActionFeed'
        }
    })
];
