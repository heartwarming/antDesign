import React,{Component} from "react";
import { Popup, List, Button } from 'antd-mobile';
let wrapProps;
class MyPop extends Component{
	constructor(props){
		super(props);
		this.state={
			sel:""
		}
		this.onClick=this.onClick.bind(this);
		this.onClick1=this.onClick1.bind(this);
		this.onClose=this.onClose.bind(this);
	}
	onClick() {
	    Popup.show(
	      <List
	        renderHeader={() => '账户总览 (已绑定3个）'}
	      >
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
	          onClick={() => { this.onClose('cancel'); }}
	        >东吴证券 (5728）</List.Item>
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
	          onClick={() => { this.onClose('cancel'); }}
	        >东吴证券 (5728）</List.Item>
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
	          arrow="horizontal"
	          onClick={() => { this.onClose('opt 1'); }}
	        >更多</List.Item>
	      </List>
	    );
	}
	onClick1() {
		Popup.show(
		  <List
	        renderHeader={() => '账户总览 (已绑定3个）'}
	      >
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
	          onClick={() => { this.onClose('cancel'); }}
	        >东吴证券 (5728）</List.Item>
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
	          onClick={() => { this.onClose('cancel'); }}
	        >东吴证券 (5728）</List.Item>
	        <List.Item
	          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
	          arrow="horizontal"
	          onClick={() => { this.onClose('opt 1'); }}
	        >更多</List.Item>
	      </List>,
	      { animationType: 'slide-up', wrapProps, maskClosable: false }
		)
	}
	onClose(sel) {
	    this.setState({ sel });
	    Popup.hide();
 	}
	render(){
		return (<div style={{ padding: '15px' }}>
			<List>
		    	<List.Item><Button type="ghost" onClick={this.onClick}>显示</Button></List.Item>
		    	<List.Item><Button type="ghost" onClick={this.onClick1}>显示</Button></List.Item>
		    </List>
	    </div>);
	}
}
module.exports=MyPop;