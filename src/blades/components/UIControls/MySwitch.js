import React,{Component} from "react";
import { List, Switch } from 'antd-mobile';
import { createForm } from "rc-form";
class MySwitch extends Component{
	constructor(props){
		super(props);
	}
	onClick(){
		console.log(this.props.form.getFieldsValue());
	}
	render(){
		const { getFieldProps } = this.props.form;
		return (
        	<List
        		renderHeader={() => '表单开关项'}
      		>
	        	<List.Item
	          		extra={<Switch
		            	{...getFieldProps('Switch1', {
			              	initialValue: true,
			              	valuePropName: 'checked',
		            	})}
		          	/>}
	        	>默认开</List.Item>
	        	<List.Item
	          		extra={<Switch
	            		{...getFieldProps('Switch2', {
	              			initialValue: false,
	              			valuePropName: 'checked',
	            		})}
	          		/>}
	        	>默认关</List.Item>
	        	<List.Item
	          		extra={<Switch
	            		{...getFieldProps('Switch3', {
	              			initialValue: false,
	              			valuePropName: 'checked',
	            		})}
	            		disabled
	          		/>}
	        	>默认关不可修改</List.Item>
	        	<List.Item
	          		extra={<Switch
	            		{...getFieldProps('Switch4', {
	              			initialValue: true,
	              			valuePropName: 'checked',
	            		})}
	            		disabled
	          		/>}
	        	>默认开不可修改</List.Item>
      		</List>
    	);
	}
}
MySwitch = createForm()(MySwitch);
module.exports = MySwitch;