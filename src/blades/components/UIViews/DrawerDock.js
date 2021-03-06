import React,{Component} from "react";
import {Drawer,List,NavBar} from "antd-mobile";
import CSS from "./css/style.less";
class DrawerDoc extends Component{
	constructor(props){
		super(props);
		this.state={
			docked: false
		}
		this.onDock=this.onDock.bind(this);
	}
	onDock(d) {
		this.setState({
			[d]: !this.state[d],
		});
	}
	render() {
	    const sidebar = (<List>
			{[...Array(20).keys()].map((i, index) => {
				if (index === 0) {
					return (<List.Item key={index}
						thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
						multipleLine
					>分类</List.Item>);
				}
				return (<List.Item key={index}
					thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
				>分类{index}</List.Item>);
			})}
		</List>);

	    const drawerProps = {
	    	docked: this.state.docked,
	    	open: false,
	    	position: 'left',
	    };
	    return (<div style={{ height: '100%' }}>
	    	<NavBar iconName="ellipsis" onLeftClick={() => this.onDock('docked')}>嵌入文档</NavBar>
	    	<Drawer
	        	className="my-drawer"
	        	sidebar={sidebar}
	        	dragHandleStyle={{ display: 'none' }}
	        	sidebarStyle={{ border: '1px solid #ddd' }}
	        	contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
	        	{...drawerProps}
	    	>
	        	请点击左上角图标
	    	</Drawer>
	    </div>);
	}
}
module.exports=DrawerDoc;