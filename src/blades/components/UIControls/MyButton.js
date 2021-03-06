import React,{Component} from "react";
import { Button, Flex } from 'antd-mobile';
import Css from "./css/button.less";
class MyButton extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (<div className="btn-container">
	      <div style={{ margin: '0 0.16rem' }}>
	        <Button className="btn" data-seed="logId" onClick={e => console.log(e)}>default 按钮</Button>
	        <Button className="btn" type="primary">primary 按钮</Button>
	        <Button className="btn" disabled>disabled 按钮</Button>
	        <Button className="btn" loading>loading 按钮</Button>
	        <Button className="btn" type="warning">warning 按钮</Button>

	        <div style={{ height: '0.16rem' }} />
	        <Button className="btn" activeStyle={false}>无点击反馈</Button>
	        <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button>

	        <p style={{ margin: 10, color: '#999' }}>inline / small</p>
	        <Flex style={{ marginBottom: '0.16rem' }}>
	          <Button inline style={{ marginRight: '0.08rem' }}>inline</Button>
	          <Button inline size="small">inline small</Button>
	        </Flex>
	      </div>
	    </div>);
	}
}
module.exports=MyButton;