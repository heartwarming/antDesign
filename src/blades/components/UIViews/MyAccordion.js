import React,{ Component } from "react";
import {Accordion,List} from "antd-mobile";
import Css from "./css/accordion.less";
class MyAccordion extends Component{
	constructor(props){
		super(props);
		this.onChange=this.onChange.bind(this);
	}
	onChange(key){
		console.log(key);
	}
	render(){
		return(
			<div style={{marginTop:10,marginBottom:10}}>
				<Accordion defaultActiveKey="0" className="my-accordion">
					<Accordion.Panel header="标题一">
						<List>
							<List.Item>子内容一</List.Item>
							<List.Item>子内容二</List.Item>
							<List.Item>子内容三</List.Item>
							<List.Item>子内容四</List.Item>
						</List>
					</Accordion.Panel>
					<Accordion.Panel header="标题二" className="pad">This is panel accordion or other</Accordion.Panel>
					<Accordion.Panel header="标题三" className="pad">
						文本内容文本内容文本内容文本内容文本内容文本内容
					</Accordion.Panel>
				</Accordion>
			</div>
		);
	}
}
module.exports=MyAccordion;