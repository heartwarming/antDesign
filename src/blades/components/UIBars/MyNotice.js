import React,{Component} from 'react';
import { NoticeBar,WhiteSpace } from "antd-mobile";
function linkClick(){
	alert("跳转操作");
}
class MyNotice extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<WhiteSpace size="lg"/>
				<NoticeBar mode="link" onClick={linkClick}>尊敬的联通4G用户，您的流量加油包已到账</NoticeBar>
				<WhiteSpace size="lg"/>
				<NoticeBar type="info" mode="closable">绑定微信号码，关注中国联通公众号，缴费查询更方便</NoticeBar>
				<WhiteSpace size="lg"/>
				<NoticeBar type="warn">您的手机号已注销，请到中国联通营业厅重新激活</NoticeBar>
				<WhiteSpace size="lg"/>
				<NoticeBar type="error">您的服务账号输入有误，请重新输入</NoticeBar>
				<WhiteSpace size="lg"/>
			</div>
		)
	}
}
module.exports = MyNotice;