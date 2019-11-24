import React,{Component} from "react";
import {Modal,Button,WhiteSpace,WingBlank} from "antd-mobile";
const alert=Modal.alert;
function showAlert(){
	alert("删除","确定删除吗？？？",[
		{text:"cancel",onPress:()=>console.log("cancel")},
		{text:"ok",onPress:()=>console.log("ok")}
	]);
}
function showConfirm(){
	alert("删除","确定删除吗？？？",[
		{text:"取消",onPress:()=>console.log("cancel")},
		{text:"确定",onPress:()=>console.log("ok")}
	]);
}
function showMoreBtn(){
	alert("多个按钮情况",<div>这里有多个按钮，你试试</div>,[
		{text:"按钮1",onPress:()=>console.log("第1个按钮被点击了")},
		{text:"按钮2",onPress:()=>console.log("第2个按钮被点击了")},
		{text:"按钮3",onPress:()=>console.log("第3个按钮被点击了")},
		{text:"按钮4",onPress:()=>console.log("第4个按钮被点击了")}
	]);
}
class MyAlert extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div style={{width:'7.5rem',backgroundColor:'#eee'}}>
				<WhiteSpace size="lg"/>
				<WingBlank size="lg">
					<Button type="ghost" onClick={showAlert}>自定义按钮</Button>
				</WingBlank>
				<WhiteSpace size="lg"/>
				<WingBlank size="lg">
					<Button type="ghost" onClick={showConfirm}>确认对话框</Button>
				</WingBlank>
				<WhiteSpace size="lg"/>
				<WingBlank size="lg">
					<Button type="ghost" onClick={showMoreBtn}>弹出多个按钮</Button>
				</WingBlank>
				<WhiteSpace size="lg"/>
			</div>
		);
	}
}
module.exports=MyAlert;