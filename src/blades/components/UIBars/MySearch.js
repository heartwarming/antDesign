import React,{Component} from 'react';
import { SearchBar } from 'antd-mobile';
class MySearch extends Component{
	constructor(props){
		super(props);
		this.state={
			text:"",
			cancel:""
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(value) {
        this.setState({
        	text: value
        });
        console.log(value);
        if(!value){
        	this.setState({cancel:"取消"});
        }
    }
	render(){
		return (
			<SearchBar
				value={this.state.text}
				placeholder="搜索"
				onSubmit={(value) => console.log(value, 'onSubmit')}
				
				onFocus={() => console.log('onFocus')}
				onBlur={() => console.log('onBlur')}
				cancelText = {this.state.cancel}
				onChange={this.handleChange}
			/>
		);
	}
}
module.exports = MySearch;