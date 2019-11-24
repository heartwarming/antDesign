import React,{Component} from "react";
import { TabBar } from "antd-mobile";
class MyTab extends Component{
	constructor(props){
		super(props);
		this.state={
			selectedTab:"redTab",
			hidden:false
		}
	}
	render(){
		return(
			<TabBar
				unselectedTintColor="#949494"
				tintColor="#33A3F4"
				barTintColor="white"
				hidden={this.state.hidden}
			>
				<TabBar.Item
					title="生活" key="生活"
					icon={require("./img/life.png")}
					selectedIcon={require("./img/life1.png")}
					selected={this.state.selectedTab==="blueTab"}
					onPress={()=>{this.setState({selectedTab:"blueTab"})}}
					date-seed="logId"
				>
					{this.renderContent("生活")}
				</TabBar.Item>
				<TabBar.Item
					title="口碑" key="口碑"
					icon={require("./img/honor.png")}
					selectedIcon={require("./img/honor1.png")}
					selected={this.state.selectedTab==="redTab"}
					onPress={()=>{this.setState({selectedTab:"redTab"})}}
					date-seed="logId1"
				>
					{this.renderContent("口碑")}
				</TabBar.Item>
				<TabBar.Item
					title="朋友" key="朋友"
					icon={require("./img/friends.png")}
					selectedIcon={require("./img/friends1.png")}
					selected={this.state.selectedTab==="greenTab"}
					onPress={()=>{this.setState({selectedTab:"greenTab"})}}
				>
					{this.renderContent("朋友")}
				</TabBar.Item>
				<TabBar.Item
					title="我的" key="我的"
					icon={require("./img/my.png")}
					selectedIcon={require("./img/my1.png")}
					selected={this.state.selectedTab==="yellowTab"}
					onPress={()=>{this.setState({selectedTab:"yellowTab"})}}
					date-seed="logId"
				>
					{this.renderContent("我的")}
				</TabBar.Item>
			</TabBar>
		);
	}
	renderContent(txt){
		return (
			<div style={{backgroundColor:'white',height:"100%",textAlign:"center"}}>
				<div style={{paddingTop:60}}>你点击了"{txt}"tab,当前展示{txt}信息</div>
				<a style={{display:"block",marginTop:40}}
					onClick={(e)=>{
						e.preventDefault();
						this.setState({
							hidden:!this.state.hidden
						});
					}}
				>
					点击切换 tab-bar 显示/隐藏
				</a>
			</div>
		);
	}
}
module.exports = MyTab;