import React,{Component} from "react";
import { List, Stepper } from 'antd-mobile';
class MyStepper extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  val: 3
  	}
  	this.onChange=this.onChange.bind(this);
  }
  onChange(val) {
    // console.log(val);
    this.setState({ val });
  }
  render() {
    return (
      <List renderHeader={() => '演示'}>
        <List.Item extra={<Stepper showNumber max={10} min={1} value={this.state.val} onChange={this.onChange} />}>
        显示数值
        </List.Item>
        <List.Item extra={<Stepper showNumber max={10} min={1} defaultValue={3} disabled />}>
        禁用
        </List.Item>
      </List>
    );
  }
}
module.exports=MyStepper;