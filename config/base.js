// 'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var pxtorem = require('postcss-pxtorem');

var rootPath = path.resolve(__dirname, '..');     // 项目根目录
var srcPath = path.join(rootPath, 'src');         // 开发源码目录
// var env = process.env.NODE_ENV.trim();            // 当前环境

var commonPath = {
  rootPath: rootPath,
  srcPath: srcPath,
  modulePath:path.join(rootPath,'node_modules'),  //node_module目录
  dist: path.join(rootPath, 'dist'),              // build 后输出目录
  indexHTML: path.join(srcPath, 'index.html'),        // 入口模板页面
  staticDir: path.join(srcPath, 'static')        // 不需编译的静态资源
};
//入口文件
let pageArr = [
	'index'
];
let configEntry = {};
pageArr.forEach((page)=>{
	configEntry[page] = path.join(srcPath,page)
});

module.exports = {
	commonPath:commonPath,
	entry:configEntry,
	output:{
		filename:'[name][hash:8].js',
	    // publicPath: './',
	    path: commonPath.dist,
	    // publicPath: "http://cdn.example.com/dist/"
	},
	externals: {    // 指定采用外部 CDN 依赖的资源，不被webpack打包
        "react": "React",
        "react-dom": "ReactDOM",
         moment: true,
         "lodash":"_"
    },
	postcss:[
		pxtorem({
		    rootValue: 100,
		    propWhiteList: [],
		    selectorBlackList: [/^html$/,/\.px$/, /^\.ant-/, /^\.github-/, /^\.gh-/]
		})
	],
	resolve: {
		root: commonPath.srcPath,
	    modulesDirectories: ['node_modules', path.join(commonPath.rootPath, 'node_modules')],
		extensions: ['', '.web.js', '.js', '.json'],
	    // 提高webpack搜索的速度
	    alias: {
	    }
	},
	module:{},
	plugins:{}
}












