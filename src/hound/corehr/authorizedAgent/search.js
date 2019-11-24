import React,{Component} from 'react';
import {browserHistory} from 'react-router'
import {NavBar,SearchBar,List,ListView,Popup} from 'antd-mobile';
import GlobalSearch from './globalSearch';
import StaffSearch from './staffSearch';
import SearchModle from './searchModle';

class SearchAuthor extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			flag:true,
			staffFlag:false
		}
		this.onChange = this.onChange.bind(this);
		this.clear = this.clear.bind(this);
		this.linktoIndex = this.linktoIndex.bind(this);
		this.showGlobalPop = this.showGlobalPop.bind(this);
		this.showStaffPop = this.showStaffPop.bind(this);
		this.changeFlag = this.changeFlag.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}
	onChange(e) {
	    this.setState({ value : e });
	}
	clear() {
	    this.setState({ value: '' });
	}
	linktoIndex(){
		Popup.hide();
		// this.setState({flag:true,staffFlag:false})
	}
	showGlobalPop(e){
		this.setState({flag:false,staffFlag:false})
	}
	showStaffPop(){
		this.setState({flag:false,staffFlag:true})
	}
	componentDidMount(){
		let d = document.querySelectorAll('.am-popup')[0];
		d.style.height = '100%';
	}
	//用于子组件与父组件通信
	changeFlag(e){
		this.setState({
			flag:!this.state.flag,
			staffFlag:!this.state.staffFlag
		})
	}
	closePopup(e){
		this.props.getSearchData(e);
		Popup.hide();
	}
	render(){
		var showNavBar = "",
			showStaffBtn = "",
			showStaff="",
			showSearchBar="",
			searchModle="";
        if (this.state.flag) {
            showNavBar = ( 
            	<NavBar leftContent="" 
            	mode="light" 
            	onLeftClick={this.linktoIndex}>
            	选择代理人
            	</NavBar>
        	);
            showStaffBtn = (
            	<List.Item  
            	arrow="horizontal" 
            	onClick={this.showStaffPop}>
            	我的部门
            	</List.Item>
        	);
        }else{
        	
        }
        if(this.state.staffFlag){
        	showStaff = (<StaffSearch closePopup={this.closePopup} changeFlag={this.changeFlag}/>);

        }else{
        	showSearchBar = (
	        	<SearchBar 
	        	value={this.state.value} 
	        	placeholder="搜索" 
	        	onSubmit={(value) => console.log(value, 'onSubmit')} 
	        	onClear={(value) => console.log(value, 'onClear')} 
	        	onFocus={this.showGlobalPop} 
	        	onBlur={()=>{}} 
	        	showCancelButton={false} 
	        	onCancel = {this.linktoIndex} 
	        	onChange={this.onChange}/>
        	)
        	if (!this.state.flag){
        		searchModle = (
        			<SearchModle searchName={this.state.value} closePopup={this.closePopup}/>
        		)
        	}
        }
		return (
			<div>
				{showNavBar}
		        {showSearchBar}
				{showStaffBtn}
				{searchModle}
				{showStaff}
			</div>	      
	    );
	}
}
export default SearchAuthor;