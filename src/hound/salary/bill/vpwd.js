import React,{Component} from 'react';
import { createForm } from 'rc-form';
import {Link,browserHistory} from 'react-router'
import { NavBar,List,SearchBar,Button,Toast,Modal } from 'antd-mobile';
import AJAX from '../../../util/ajax';
import Css from './vpwd.less';
import Context from '../../../util/context';
class Vpwd extends Component{
	constructor(props){
		super(props);
		this.state={
			headImg:require('../../../static/common/icon/user.png'),
			clientH:0,
			inputType:"password",
			number:0,
			name:"",
			color:""
		}
		this.resetPwd = this.resetPwd.bind(this);
		this.vpwd = this.vpwd.bind(this);
		this.toggleEye = this.toggleEye.bind(this);
	}
	componentDidMount(){
		//获取图片头像
		Context.init();
		let userinfo = Context.getUserinfo();
		let u_useravator = userinfo.u_useravator;
		if( u_useravator && u_useravator!=="null"){
			this.setState({"headImg":u_useravator,"number":1});
		}

		//获取名字头像
		let u_name = userinfo.u_username.slice(-2);
		this.setState({"name":u_name});
		let color = ['#eead10','#f99a2b','#f38134','#6495ed','#3ab1aa','#0abfb5','#06aae1','#00bfff','#96bc53','#00ced1','#89a8e0'];
		let len = color.length-1;
		let rand = Math.round(Math.random()*len);
		this.setState({"color":color[rand]});
		this.setState({"display":"none"});

		//说明文字底部定位
		let H = document.documentElement.clientHeight;
		this.setState({"clientH":H});
	}
	resetPwd(){
		Modal.alert("重置密码","确定重置密码吗？",[
			{text:"取消",onPress:null},
			{text:"确定",onPress:()=>{
				Toast.loading("重置中...",0);
				let rstPwdSuc=(data)=>{
					Toast.hide();
					if(data.statusCode==200){
						let text = JSON.parse(data.data).des;
						Modal.alert(text,"",[{text:"确定",onPress:null}]);
					}else{
						Toast.info(data.message);
					}
				}
				AJAX.ipost('syncwage/profile/resetPwd',null,rstPwdSuc);
			}}
		])
	}
	vpwd(){
		let { getFieldProps } = this.props.form;
		let pwd = getFieldProps("password")['value'];
		if(!pwd){
			Toast.info("查询密码不能为空");
			return;
		}
		Toast.loading("载入中...",0);
		let bill = {
			years:null,
			months:null,
			pwd:""
		};
	    let periodSuc=(data)=>{
	    	Toast.hide();
            if(data.statusCode==200){
            	bill.years = data.yearArray.join(",");
            	let json = JSON.parse(data.data);
            	let param = {
				    "salarypswd":pwd,     //薪资查询密码
				    "year":json.year //年份
			    }
			    let querySelect=(data)=>{
			    	if(data.statusCode == 200){
			    		let returnData = JSON.parse(data.data);
			    		if( !returnData || returnData.length == 0 ){
			    			Toast.info("暂无你的薪资记录");
			    			return false;
			    		}
			    		let returnParam = returnData[0].salarystructlist;
			    		bill.months = returnParam;
			    		bill.pwd = pwd;
			    		localStorage.setItem("bill",JSON.stringify(bill));
						location.hash="/salary/list";
					}else{
						Toast.info(data.message);
					}
				}
				AJAX.iget('syncwage/salary/getSalary',param,querySelect);
            }else{
                Toast.info(data.message);
            }
        }
        AJAX.iget('syncwage/salary/period',null,periodSuc);
	}
	linkTo(){
		location.hash="/salary/editPwd";
	}
	toggleEye(){
		let inputType = this.state.inputType;
		if( inputType == "password" ){
			inputType = "text";
		}else if( inputType == "text" ){
			inputType = "password";
		}
		this.setState({"inputType":inputType});
	}
	render(){
		const { getFieldProps } = this.props.form;
		const Item = List.Item;
		const headArr = ['none','block'];
		const nameArr = ['block','none'];
		return (
			<div className="billLogin">
				<NavBar leftContent="" mode="light" onLeftClick={Context.cback} >
					查薪资
				</NavBar>
				<div className="headBox">
					<div style={{height:'0.7rem'}}></div>
					<div className="headImg">
						<div style={{display:nameArr[this.state.number],backgroundColor:this.state.color}}>
							{this.state.name}
						</div>
						<div style={{display:headArr[this.state.number]}}><img src = {this.state.headImg}/></div>
					</div>
					<div className="welcome">欢迎使用薪资查询</div>
					<div style={{height:'0.3rem'}}></div>
				</div>
				<List>
					<Item>
						<div className="s-am-search">
							<input type={this.state.inputType}
						        {...getFieldProps('password')}
						        placeholder="请输入查询密码"
						    />
						    <i className={this.state.inputType} onClick={this.toggleEye}></i>
					    </div>
	        		</Item>
	        		<Item className="btnBox">
	        			<Button type="primary" onClick={this.vpwd}>查询</Button>
	        		</Item>
	        		<Item>
	        			<div className="links">
							<a onClick={this.resetPwd}>重置密码</a>
							<a onClick={this.linkTo}>修改密码</a>
						</div>
	        		</Item>
				</List>
				<div className="desc" style={{top:this.state.clientH}}>注：首次使用请先重置密码！</div>
			</div>
		);
	}
}
Vpwd = createForm()(Vpwd);
module.exports=Vpwd;