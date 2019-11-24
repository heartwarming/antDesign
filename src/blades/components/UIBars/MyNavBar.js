import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
class MyNavBar extends Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
    }
    onClick(){
    	alert(111);
    }
    render() {
        return (
			<div>
				<div style={{ height:8 }}/>
				<NavBar leftContent="" mode="dark" onLeftClick={()=>alert('onLeftClick')}
				rightContent={<span onClick={this.onClick}>管理</span>}
				>NavBar</NavBar>
			</div>
		);
    }
}
module.exports = MyNavBar;