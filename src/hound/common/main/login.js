/**
 * Created by Administrator on 2016/11/10.
 */
import React,{Component} from 'react';
import { createForm } from 'rc-form';
import {Link,browserHistory} from 'react-router'
import { InputItem,Popup,List, Button, Toast } from 'antd-mobile';
//import './css/login.css';
import AJAX from '../../../util/ajax';
import Common from '../../../util/common';
import './login.less';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps,clickStatus=false;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Login extends Component{
    constructor(props){
        super(props);
		this.submitLogin = this.submitLogin.bind(this);
    }
    render() {
		const { getFieldProps } = this.props.form;
        return (

<div>
          <List>
          <InputItem
            {...getFieldProps('username')}
            clear
            placeholder="请输入手机号码"
          >手机</InputItem>


          <InputItem
                  {...getFieldProps('password')}
                  type="password"
                  placeholder=""
                >密码</InputItem>

        </List>

        <div style={{ margin: '0',position:'absolute',width:'100%',bottom:'0' }}>
          <Button id="submit" type="primary" onClick={this.submitLogin}>登录</Button>
          <div style={{ height: 8 }} />
        </div>
</div>



        );
    }
    componentDidMount() {
    	//Font.font(document,window);
    	// let userinfo=localStorage.getItem("userinfo");
    	// if(userinfo){
    	// 	location.hash ='';
    	// 	return false;
    	// }
    	// let domClose=document.getElementById("eyeClose");
    	// let domOpen=document.getElementById("eyeOpen");
      //
    	// domClose.addEventListener("click",function(e){
    	// 	toggleEye("open");
    	// },false);
    	// domOpen.addEventListener("click",function(e){
    	// 	toggleEye("close");
    	// },false);
    }

	submitLogin(){
		let { getFieldProps } = this.props.form;
		let username=getFieldProps('username')['value'];
		let password=getFieldProps('password')['value'];
		if(!username){
			Toast.info('用户名不能为空');
			return false;
		}
		if(!password){
			Toast.info('密码不能为空');
			return false;
		}
		let shaPwd=Common.SHA1(password);
    //		sendData= "username=15555555513&password=19485e369c691fa8ece1fabc8a6ceabfb5666b79";
		// let param = "username="+username+"&password="+shaPwd;
    let param = {"username":username,"password":shaPwd};

    let func=(data)=>{
          // data = JSON.parse(data);
          if(data.flag == "success"){
            let u_useravator = "";
            if(data.userAvator!=="undefined")
            {
              u_useravator = data.userAvator;
            }
            let userinfo = `{"u_logints":${data.u_logints},"u_usercode":"${data.u_usercode}","u_username":"${data.userName}","u_usermobile":"","u_useravator":"${u_useravator}","u_staffid":"","tenantid":"${data.tenantid}","token":"${data.token}"}`;
            localStorage.setItem("userinfo",userinfo);


              let funcagin=(staffdata)=>{
                    // staffdata = JSON.parse(staffdata);
                    if(staffdata.statusCode==200&&staffdata.data){
                        let u_staffid = staffdata.data.staff_id;
                        let u_usermobile = staffdata.data.mobile;

                        userinfo = `{"u_logints":${data.u_logints},"u_usercode":"${data.u_usercode}","u_username":"${data.userName}","u_usermobile":"${u_usermobile}","u_useravator":"${u_useravator}","u_staffid":"${u_staffid}","tenantid":"${data.tenantid}","token":"${data.token}"}`;
                        localStorage.setItem("userinfo",userinfo);
                        Toast.info('登录成功');
                        location.hash ='/';
                    }
                };

              AJAX.iget("corehr/staff/queryMyInfoByUserId",null,funcagin);
          }else {
            Toast.info(data.msg);
          }
        };

	    AJAX.ipost("mlogin",param,func);
    }

}
function toggleEye(str){
	// var domClose=document.getElementById("eyeClose");
	// var domOpen=document.getElementById("eyeOpen");
	// var pwd=document.getElementById("pwd");
	// if(str=="open"){
	// 	domClose.style.display="none";
	// 	domOpen.style.display="block";
	// 	pwd.setAttribute("type","text");
	// }else if(str=="close"){
	// 	domClose.style.display="block";
	// 	domOpen.style.display="none";
	// 	pwd.setAttribute("type","password");
	// }
}
Login = createForm()(Login);
module.exports=Login;
