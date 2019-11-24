/**
 * [ajax请求]
 * 参数：上下文,自定义回调
 */
import Context from './context';
// console.log(Promise)
let Promise = require('es6-promise').Promise;
// require('es6-promise').polyfill();
// console.log(require('es6-promise'))
// console.log(Context.basepath)
// var Promise = require("native-promise-only");
 // console.log(Promise)
let Response = {
    /**
     * 格式化方法
     * @param data 需要格式化的map
	 * @return {string} a=b&c=d串
     */
    // formatData:data =>!data?null:(Object.entries(data).map(([k, v]) =>`${k}=${v}`).join("&")),
    formatData(data){
        let fData=null;
        if(!data){
            return fData = null;
        }else{
            let arr = [];
            for(let i in data){
                arr.push(`${i}=${data[i]}`)
            }
            return fData = arr.join('&');
        }
    },
    /**
     * 格式化数据
     * @param data Object类型的表单数据
     * @return {FormData} 表单数据
     */
    formData:data =>!data?null:Object.entries(data).reduce((form,[k, v]) => form.append(k,v),new FormData()),


    /**
     * 创建Promise对象
     * @param url 访问的url
     * @param type 访问方法
     * @param data 参数
     * @param dataType 返回数据类型
     * @param contentType 内容类型
     * @param async 是否异步
     * @param headers 请求header
     */
    promise({url,type = 'GET',data={},dataType='json',contentType="application/x-www-form-urlencoded",async=true, headers = {}}={}) {
        return new Promise((resolve, reject)=>{
            function handler() {
                if (this.status === 200) {
                    if(!this.response){
                    	if(this.responseText){
                    		resolve(JSON.parse(this.responseText));
                    	}else{
							resolve(this.responseText)
                    	}              	
                    }else{
                    	if(typeof(this.response)=='string'){
                    		resolve(JSON.parse(this.response));
                    	}else{
                    		resolve(this.response);
                    	} 
                    }
                    
                } else {
                    reject(new Error(this.statusText));
                }
            };
            var request = new XMLHttpRequest();

            //console.log(this.formatData(data))
            let openURL = (type.toLocaleUpperCase()==='GET'&&data!=null)?(`${url}?${this.formatData(data)}`):url;

            request.open(type, openURL,async);
            request.onload = handler;
            request.responseType = dataType;

            // Object.entries(headers).forEach(([k,v]) => request.setRequestHeader(k,v));
            for(let i in headers){
                request.setRequestHeader(i,headers[i])
            }




            if(type.toLocaleUpperCase() == "POST"){
                if(contentType=="application/json"){
                    request.setRequestHeader("Accept", "application/json");
                    request.setRequestHeader("Content-Type","application/json");
				}else if(contentType == "multipart/form-data") {
                	data = this.formData(data);
                }else{
                    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                    data = this.formatData(data);
				}
			}
            if(type.toLocaleUpperCase()==='GET'){
                request.send();
            }else{
                request.send(data);
            }
            
        });
    },

    /**
     * http ajax调用
     * @param params 调用参数
     */
	rpc(params={}){
        let {func,success=(res)=>null,error =error=>console.log(error.message)}=params
    	this.promise(params).then(func||success).catch(error);
	},
    /**
     * 通过get方法访问url
     * @param url 地址
     * @param data 参数
     * @param headers 头
     */
	get(url,data,headers){
        this.rpc({url,data,headers})
	},
    /**
     * 常规的post form方法
     * @param url 地址
     * @param data 参数
     * @param headers 请求头
     */
	post(url,data,contentType="application/x-www-form-urlencoded",headers={}){
        this.rpc({url,data,type:"post",contentType:contentType,headers})
	},
    /**
     * 按application/json方式请求
     * @param url 地址
     * @param data 参数
     * @param headers 头
     */
    postJson(url,data,headers){
        this.rpc({url,data,type:"post",headers})
    },
    /**
     * 带附件请求
     * @param url 地址
     * @param data 参数
     * @param headers 请求头
     */
    postMultipart(url,data,headers){
        this.post(url,data,"multipart/form-data",headers)
    },
    /**
     * 删除请求
     * @param url 地址
     * @param data 参数
     * @param headers 请求header
     */
    delete(url,data,headers){
        this.rpc({url,data,type:"delete",headers})
    },
    /**
     * 内部rpc请求方法
     * @param params 参数对象
     */
	irpc(params={}){
    	let {url,headers={}}=params;
        // params.data = url.data;
        // params.func = url.func;
        let auth = Context.getAuthority();
        if(auth==null&&params.url!=="mlogin")
        {
            location.hash = "#login";
            return;
        }
        params.url=`${Context.basepath}${url}`;
        headers["Authority"]=auth;
        params.headers=headers;
        this.rpc(params);
    },
    /**
     * 内部get请求
     * @param url 地址
     * @param data 参数
     * @param headers 请求头
     */
    iget(url,getData,getFunc,headers){
        let dyData = this.dynamicGetData(arguments);
        let data = dyData.data,
            func = dyData.func;
        this.irpc({url,data,func,headers})
    },
    /**
     * 动态解析数据
     * @return {[type]} [description]
     */
    dynamicGetData(arg){
        let toString = Object.prototype.toString;
        let getData=null,
            func=()=>{},
            data = arg,
            len = arg.length;
        if(len===1){
            return false;
        }else if(len===2){
            let otype = toString.apply(data[1]);
            getData = otype==='[object Object]'?data[1]:null;
            func = otype==='[object Function]'?data[1]:()=>{};
        }else{
            getData = data[1];
            func = data[2];
        }
        return {
            data : getData,
            func : func
        }
    },
    /**
     * 内部post请求
     * @param url 地址
     * @param data 参数 （可选）
     * @param func 回调函数（可选）
     * @param headers 请求头
     */
    ipost(url,getData,getFunc,contentType="application/x-www-form-urlencoded",headers={}){
        let dyData = this.dynamicGetData(arguments);
        let data = dyData.data,
            func = dyData.func;
        this.irpc({url,data,func,type:"post",contentType:contentType,headers})
    },
    /**
     * 按application/json方式内部请求
     * @param url 地址
     * @param data 参数
     * @param headers 头
     */
    ipostJson(url,data,headers){
        this.irpc({url,data,type:"post",headers})
    },
    /**
     * 内部带附件请求
     * @param url 地址
     * @param data 参数
     * @param headers 请求头
     */
    ipostMultipart(url,data,headers){
        this.ipost(url,data,"multipart/form-data",headers)
    },
    /**
     * 内部删除请求
     * @param url 地址
     * @param data 参数
     * @param headers 请求头
     */
    idelete(url,data,headers){
        this.irpc({url,data,type:"delete",headers})
    },

	ajax(params){
		let obj = {type:null,url:null,data:null,func:null}
		obj = params;
		let sendData=this.formatData(obj.data);
		let promise = new Promise((resolve,reject)=>{
	      let request = new XMLHttpRequest();
	      if (obj.type.toLowerCase()=='get') {
	      	if(sendData){
	      		request.open(obj.type,`${Context.basepath}${obj.url}?${sendData}`);
	      	}else{
	      		request.open(obj.type,`${Context.basepath}${obj.url}`);
	      	}
	      	sendData = null;
	      }else{
	      	request.open(obj.type,`${Context.basepath}${obj.url}`);
	      }
	      
		  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	      request.setRequestHeader("Authority", Context.getAuthority());

	      request.onload = function(){
	        if(request.status == 200){
	          resolve(request.response)
	        }else{
	          reject(Error(request.statusText))
	        }
	      };
	      request.onerror = function(){
	        reject(Error('Error fetch data'))
	      };
	      request.send(sendData);
	    });
	    promise.then(obj.func,function(error){
	      console.log(error.message)
	    });
	}
}
export default Response;
