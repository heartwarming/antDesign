import React,{Component} from "react";
import {ActionSheet,Button,Toast} from "antd-mobile";
import Css from "./css/style.less";
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
	wrapProps = {
		onTouchStart: e => e.preventDefault(),
	};
}
const ICONS=[
	{iconName:'mail',title:'发邮件'},
	{iconName:'message',title:'发短信'},
	{iconName:'team',title:'发送到群'},
	{iconName:'download',title:'下载'},
	{iconName:'delete',title:'删除'},
	{iconName:'ellipsis',title:'更多'}
];
class MyAction extends Component{
	constructor(props){
		super(props);
		this.state={
			clicked:"none",
			clicked1:"none",
			clicked2:"none"
		}
		this.showActionSheet=this.showActionSheet.bind(this);
		this.showShareActionSheet=this.showShareActionSheet.bind(this);
		this.showShareActionSheetMultipleLine=this.showShareActionSheetMultipleLine.bind(this);
	}
	showActionSheet(){
		const BUTTONS=["操作一","操作二","操作三","删除","取消"];
		ActionSheet.showActionSheetWithOptions({
			options:BUTTONS,
			cancelButtonIndex:BUTTONS.length-1,
			destructiveButtonIndex:BUTTONS.length-2,
			//title:"标题",
			message:"我是描述我是描述",
			maskClosable:true,
			'data-seed':'logId',
			wrapProps,
		},(buttonIndex)=>{
			this.setState({clicked:BUTTONS[buttonIndex]});
		});
	}
	showShareActionSheet(){
		const icons=[...ICONS];
		icons.length=4;
		ActionSheet.showShareActionSheetWithOptions({
			options:icons,
			title:"标题",
			message:"我是描述我是描述",
		},(buttonIndex)=>{
			this.setState({clicked1:buttonIndex>-1?icons[buttonIndex].title:"cancel"});
			return new Promise((resolve)=>{
				Toast.info("1000ms 后关闭");
				setTimeout(resolve,1000);
			});
		});
	}
	showShareActionSheetMultipleLine(){
		const icons=[...ICONS,...ICONS];
		ActionSheet.showShareActionSheetWithOptions({
			options:icons,
			title:"标题",
			message:"我是描述我是描述",
		},(buttonIndex,rowIndex)=>{
			this.setState({clicked2:buttonIndex>-1?icon[rowIndex][buttonIndex].title:"cancel"});
		});
	}
	render(){
		return (
			<div style={{margin:"0 15px"}}>
				<div style={{margin:"15px 0"}}>
					<Button onClick={this.showActionSheet}>默认状态</Button>
				</div>
				<div style={{margin:"15px 0"}}>
					<Button onClick={this.showShareActionSheet}>分享功能</Button>
				</div>
				<div style={{margin:"15px 0"}}>
					<Button onClick={this.showShareActionSheetMultipleLine}>带多行按钮的分享功能</Button>
				</div>
			</div>
		);
	}
}
module.exports=MyAction;