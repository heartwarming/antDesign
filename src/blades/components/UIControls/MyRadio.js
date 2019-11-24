import React,{Component} from "react";
import { List, Radio, Flex } from 'antd-mobile';
import Css from "./css/radio.less";
class MyRadio extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  value: 1
  	}
  	this.onChange=this.onChange.bind(this);
  }
  onChange(value) {
    this.setState({
      value,
    });
  }
  render() {
    const RadioItem = Radio.RadioItem;
    const { value } = this.state;
    const data = [
      { value: 0, label: '博士' },
      { value: 1, label: '本科' },
      { value: 2, label: '高中' },
    ];
    return (<div>
      <List renderHeader={() => 'RadioItem 演示'}>
        {data.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </RadioItem>
        ))}
        <RadioItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
          初中<List.Item.Brief>辅助文字内容</List.Item.Brief>
        </RadioItem>
      </List>
      <Flex style={{ padding: '0.3rem' }}>
        <Flex.Item style={{ padding: '0.3rem 0', color: '#888', flex: 'none' }}>Radio 演示</Flex.Item>
        <Flex.Item>
          <Radio className="my-radio">选项一</Radio>
          <Radio className="my-radio" style={{ marginLeft: '0.1rem' }}>选项二</Radio>
        </Flex.Item>
      </Flex>
    </div>);
  }
}
module.exports=MyRadio;