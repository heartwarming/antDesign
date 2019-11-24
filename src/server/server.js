const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");
const mockConfig = require('../../mock.config.js');
const config = require('../../config/webpack.config.js');
const prefix = mockConfig.mock?'':mockConfig.prefix;
const mine = require('./mimes').types;
const host = mockConfig.hosts.split(':')[0],
	  port = Number(mockConfig.hosts.split(':')[1]),
	  mock = mockConfig.mock;
//mock服务
if(mock){
	let server = http.createServer(function(req,res){
		let method = req.method;
		let params = null;
		if(method.toLowerCase()==='get'){
			params = url.parse(req.url).query;
		}
		req.on('data',function(data){
			params = (decodeURIComponent(data));
		})
		req.on('end',function(){
			console.log((`[mockServer] 当前请求:${method}方式`));
		});

		let pathname = url.parse(req.url).pathname;
		let realPath = path.join(__dirname,'/../../mock/'+pathname);
		let ext =  path.extname(realPath);
		ext = ext ? ext.slice(1) : 'js';
		realPath = realPath+'.'+ext;
		fs.exists(realPath,function(exists){
			if(!exists){
				res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(`This request URL ${pathname} was not found on this server.`);
                res.end();
			}else{
				 if (realPath.indexOf('.') !== -1) {
                    fs.readFile(realPath, "binary", function(err, file) {
                        if (err) {
                            res.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            res.end(err);
                        } else {
                            var contentType = mine[ext] || "text/plain";
                            res.writeHead(200, {
                                'Content-Type': contentType
                            });
                            res.write(file, "binary");
                            res.end();
                        }
                    });
                } else {
                    res.write(`This request URL ${pathname} was not found on this server.`);
                    res.end();
                }
			}
		})
	});
	server.listen(port,host,function(){
		console.log(`mockserver 已经开启 本地端口：${port}`)
	});
}
//启动webapckDEVServer
var compiler = webpack(config);
var webpackServer = new webpackDevServer(compiler, {
    quiet: false,
    hot:true,
    inline:true,
    // noInfo: true,
    historyApiFallback: true,
	stats: { colors: true },
	// proxy: {
	//     "**": `http://${mockConfig.hosts}`
 //  	}
  	proxy: [
	  {
	    context: [`${prefix}**`],
	    target: `http://${mockConfig.hosts}`,
	    secure: false
	  }
	]
});
webpackServer.listen(8080, () => {
    console.info(`webpackDevServer服务开启成功! http://localhost:8080`);
});