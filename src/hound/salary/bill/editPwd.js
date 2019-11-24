import React,{Component} from "react";
import { createForm } from 'rc-form';
import {NavBar,List,InputItem,Button,Toast} from "antd-mobile";
import AJAX from '../../../util/ajax';
import Css from "./editPwd.less";
class EditPwd extends Component{
	constructor(props){
		super(props);
		this.editPwd = this.editPwd.bind(this);
		this.toggleEye = this.toggleEye.bind(this);
	}
	editPwd(){
		let { getFieldProps } = this.props.form;
		let oldPwd = getFieldProps("oldPwd")['value'];
		let newPwd = getFieldProps("pwd")['value'];
		let repeatPwd = getFieldProps("repeatPwd")['value'];
		if(!oldPwd){
			Toast.info("原密码不能为空");
			return false;
		}
		if(!newPwd){
			Toast.info("新密码不能为空");
			return false;
		}
		if(newPwd!=repeatPwd){
			Toast.info("两次密码不一致");
			return false;
		}
		let param = {
			"oldPwd":oldPwd,
			"newPwd":newPwd
		}
		Toast.loading("设置中...",0);
		let editSuc=(data)=>{
			Toast.hide();
			if(data.statusCode == 200){
				Toast.success("新密码设置成功",3);
				setTimeout(function(){
					window.history.go(-1);
				},3000);
			}else{
				Toast.info(data.message);
			}
		};
		AJAX.ipost("syncwage/profile/modifyPwd",param,editSuc);
	}
	toggleEye(e){
		let eye = e.target;
		let input = eye.previousSibling.lastChild.lastChild;
		let inputType = eye.className;
		inputType = (inputType == "password")?"text":"password";
		eye.className = inputType;
		input.setAttribute("type",inputType);
	}
	render(){
		const Item = List.Item;
		let { getFieldProps } = this.props.form;
		return(
			<div className="editPwd">
				<NavBar leftContent="" mode="light" onLeftClick={()=>window.history.back(-1)}>
					修改密码
				</NavBar>
				<List>
					<Item className="inputItem pwd1">
						<InputItem
					        {...getFieldProps('oldPwd')}
					        type="password"
					        placeholder="必填"
					        direction="rtl"
					    >原密码</InputItem>
					    <i className="password" onClick={(event) => {this.toggleEye(event)}}></i>
					</Item>
					<Item className="inputItem pwd2">
						<InputItem
					        {...getFieldProps('pwd')}
					        type="password"
					        placeholder="必填"
					        direction="rtl"
					    >新密码</InputItem>
					    <i className="password" onClick={(event) => {this.toggleEye(event)}}></i>
					</Item>
					<Item className="inputItem pwd3">
						<InputItem
					        {...getFieldProps('repeatPwd')}
					        type="password"
					        placeholder="必填"
					        direction="rtl"
					    >重复密码</InputItem>
					    <i className="password" onClick={(event) => {this.toggleEye(event)}}></i>
					</Item>
					<Item><p className="s-am-p">请勿使用旧密码作为新密码</p></Item>
					<Item>
						<Button type="primary" onClick={this.editPwd}>确定</Button>
					</Item>
				</List>
			</div>
		);
	}
}
EditPwd=createForm()(EditPwd);
module.exports=EditPwd;