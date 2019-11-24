
import AJAX from './ajax';

//定义变量前缀
const mockConfig = require('../../mock.config.js');
const path = RELEASE?mockConfig.prefix:mockConfig.prefix;
const host = mockConfig.hosts.split(':')[0];
const summer = window.summer || window.s;
//debugger;

let Context = {
  /**
   * 上下文根路径
   */
  basepath:path,
  rf:"wap",



  /**
   * 上下文初始化,app调用wap应用url时，需传递参数userinfo信息用于身份认证
   */
  init() {
    let hash = location.hash;
    if(!hash.match(/(ycode\=)(.*?)(?=&)/g)){
      return false;
    }


    //用户信息
    let ycode = hash.match(/(ycode\=)(.*?)(?=&)/g)[0].split('=')[1];


    // let reg = new RegExp("(^|&)ycode=([^&]*)(&|$)", "i");
    //   console.log("hash = "+window.location.hash.substr(1))

    // let ycode = window.location.hash.substr(1).match(reg);
    console.log("ycode = "+ycode)
    // let ycode = this.getQueryString1("ycode");
    if(ycode){
        // let unycode=unescape(ycode);
        // let unycode=decodeURI(ycode);
        let unycode=decodeURIComponent(ycode);
        
        // console.log("unycode="+unycode);
        // console.log("unycode stringify="+JSON.stringify(unycode));
        localStorage.setItem("userinfo",unycode);
        let prf = JSON.parse(unycode).rf;
        if(prf)
        {
          Context.rf = prf;
        }
    }
  },


  cback() {

    console.log(Context.rf);
    if(Context.rf=="wap")
    {
      history.go(-1);
    }
    else if(Context.rf=="yapp")
    {
      //
      summer.closeWin();
    }
    else
    {
      history.go(-1); 
    }


  },

  /**
   * 获取上下文的用户信息
   */
  getUserinfo() {
    let userinfo =  localStorage.getItem("userinfo");
    if(userinfo&&userinfo!="null")
    {
      //console.log("getUserinfo userinfo="+userinfo);
      // let userObj = JSON.parse(userinfo);
      return JSON.parse(userinfo);
    }
    else
    {
      return null;
    }
    // else {
    //   //开发环境默认用户
    //   let u_logints = 1479208130639;
    //   let u_usercode = "c05cfd2d-e7c6-448e-9e4e-76d7a4466994";
    //   let u_username = "贾军";
    //   let u_usermobile = "15555555513";
    //   let u_useravator = "";
    //   let u_staffid  ="8b4b5fad-27f0-41db-b637-6ea8dfcde46b";
    //   let tenantid = "nlcj2iz8";
    //   let token = "bWEsLTEsZ0hvbVQxcVRlZldBUXNjQXNXR2J5NGVySmlwVVp0S2VHV1pmMnVrZnh1eEVDMExqYURSNExpVjhQcnVEbGIvcVVnUjdXSmU1b2JaWXkrZnNxMGJwbkE9PQ";
    //   if(host=="123.103.9.205"){
    //     //测试环境默认用户
    //       u_logints = 1479208130639;
    //       u_usercode = "79332063-ac71-44f1-9b05-ceb1d3facb61";
    //       u_username = "刘永强-测试";
    //       u_usermobile = "18888888890";
    //       u_useravator = "";
    //       u_staffid  ="3964f03b-3759-4a3c-9dc1-a608f34cbb89";
    //       tenantid = "v0o0x7bd";
    //       token = "bWEsLTEsb3ZwaENJSXN2cG1EV25Fa3B1RklqeGpyR21GREhIRm4wR21vV0x6K1dqMytoa2lJZnhZelFEUFFTTGk4YVZlTXdKNzRKVTh1MjgxN0J0b2NxN1E1bGc9PQ";
    //   }
    //   let userinfo = `{"u_logints":${u_logints},"u_usercode":"${u_usercode}","u_username":"${u_username}","u_usermobile":"${u_usermobile}","u_useravator":"${u_useravator}","u_staffid":"${u_staffid}","tenantid":"${tenantid}","token":"${token}"}`;
    //   return JSON.parse(userinfo);
    // }

  },


  /**
   * 使用上下文的用户信息拼接认证信息，在发起API调用时，需要构造Header信息request.setRequestHeader("Authority", auth);
   */
  getAuthority() {
        let userinfo = this.getUserinfo();
        if(userinfo==null)return null;
        let {u_logints,u_usercode,tenantid,token}=userinfo;
        let auth = `u_logints=${u_logints};u_usercode=${u_usercode};token=${token};tenantid=${tenantid}`;
        //console.log("auth="+auth);
        return auth;
  },

  /**
   * 截取url参数
   */
  getQueryString1(argname='ycode') {
    var reg = new RegExp("(^|&)" + argname + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  }
}

export default Context;
