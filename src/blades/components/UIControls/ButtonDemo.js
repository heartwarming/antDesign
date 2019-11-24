import React,{Component} from "react";
import { Button, List } from 'antd-mobile';
class ButtonDemo extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (<List style={{ margin: '10px 0', backgroundColor: 'white' }}>
		    <List.Item
		      extra={<Button type="ghost" size="small" inline>small</Button>}
		      multipleLine
		    >
		      区域经理
		      <List.Item.Brief>可进行收款、退款、折扣管理、查看数据等操作</List.Item.Brief>
		    </List.Item>
		    <List.Item
		      extra={<Button size="small" inline>small</Button>}
		      multipleLine
		    >
		      区域经理
		      <List.Item.Brief>可进行收款、退款、折扣管理、查看数据等操作</List.Item.Brief>
		    </List.Item>
		</List>);
	}
}
module.exports=ButtonDemo;