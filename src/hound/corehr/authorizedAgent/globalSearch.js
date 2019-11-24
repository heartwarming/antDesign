import React,{Component} from 'react';
import {browserHistory} from 'react-router'
import {NavBar,SearchBar,List,ListView,Popup} from 'antd-mobile';

class GlobalSearch extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value:''
		}
		this.onChange = this.onChange.bind(this);
		this.clear = this.clear.bind(this);
		this.linktoIndex = this.linktoIndex.bind(this);
	}
	onChange(value) {
	    this.setState({ value:'' });
	}
	clear() {
	    this.setState({ value: '' });
	}
	linktoIndex(){
		Popup.hide();
	}
	componentDidMount(){
		let d = document.querySelectorAll('.am-popup')[0];
		d.style.height = '100%';
	}
	render(){
		return (
			<div>
				<SearchBar
				  value={this.state.value}
				  placeholder="请输入姓名\电话\邮箱"
				  onSubmit={(value) => console.log(value, 'onSubmit')}
				  onClear={(value) => console.log(value, 'onClear')}
				  onFocus={() => console.log('onFocus')}
				  onBlur={() => console.log('onBlur')}
				  showCancelButton={false}
				  onCancel = {this.linktoIndex}
				  onChange={this.onChange}
				/>
			</div>	      
	    );
	}
}
export default GlobalSearch;