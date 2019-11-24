import React,{Component} from "react";
import { SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
class MySegment extends Component{
  constructor(props){
  	super(props);
  }
  render(){
  	return(<WingBlank size="lg">
	    <WhiteSpace size="lg" />
	    <SegmentedControl values={['切换一', '切换二']} />
	    <WhiteSpace size="lg" />
	  </WingBlank>);
  }
}
module.exports=MySegment;