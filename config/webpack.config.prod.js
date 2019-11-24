var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HappyPack = require('happypack');
var config = require('./base');

var definePlugin = new webpack.DefinePlugin({
    RELEASE: JSON.stringify(true)
});
config.plugins = [
    new ExtractTextPlugin("bundle[hash:8].css"),
    definePlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
        except: ['exports', 'require']
    }),
    new HtmlwebpackPlugin({
        template: config.commonPath.indexHTML,
        filename: './index.html'
    }),
    new TransferWebpackPlugin([{
        from: path.join(config.commonPath.staticDir, 'version'),
        to: '../dist/version'
    }, {
        from: path.join(config.commonPath.staticDir, 'yshow'),
        to: '../dist/yshow'
    }, {
        from: path.join(config.commonPath.staticDir, 'js'),
        to: '../dist/js'
    }, {
        from: path.join(config.commonPath.staticDir, 'cordova'),
        to: '../dist/cordova'
    }, {
        from: path.join(config.commonPath.staticDir, 'splash'),
        to: '../dist/splash'
    }], config.commonPath.dist),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons', // 这公共代码的chunk名为'commons'
        filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
        minChunks: 2, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
    }),
    new OpenBrowserPlugin()
];

config.module = {
    noParse: [
        /html2canvas/, /summer/, /cordova/
    ],
    loaders: [{
        test: /\.zip$/,
        loader: "file"
    }, {
        test: /\.html$/,
        loader: "html"
    }, {
        'test': /\.js$/,
        'loader': 'babel',
        'exclude': ['node_modules', config.commonPath.modulePath]
    }, {
        'test': /\.json$/,
        'loader': 'json'
    }, {
        test: /\.css/,
        include: [config.commonPath.modulePath, config.commonPath.srcPath],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
        test: /\.less/,
        include: [config.commonPath.modulePath, config.commonPath.srcPath],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
    }, {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=10000',
    }, {
        test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: "url?limit=10000"
    }]
}
module.exports = config;