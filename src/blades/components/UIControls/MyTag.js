import React,{Component} from "react";
import { Tag } from 'antd-mobile';
import Css from "./css/tag.less";
function onChange(selected) {
  console.log(`tag selected: ${selected}`);
}
class MyTag extends Component{
  constructor(props){
  	super(props);
  }
  render(){
  	return(<div className="tag-container">
	    <Tag data-seed="logId">通用标签</Tag>
	    <Tag selected>默认选中</Tag>
	    <Tag disabled>失效标签</Tag>
	    <Tag onChange={onChange}>事件回调</Tag>
	    <Tag closable onClose={() => {
	      console.log('onClose');
	    }} afterClose={() => {
	      console.log('afterClose');
	    }}
	    >
	      可关闭标签
	    </Tag>
	    <Tag small>小号标签</Tag>
	  </div>);
  }
}
module.exports=MyTag;