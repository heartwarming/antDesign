import React,{Component} from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import Css from "./css/flex.less";
const PlaceHolder = (props) => (
  <div style={{
    backgroundColor: '#ebebef',
    color: '#bbb',
    textAlign: 'center',
    height: '0.6rem',
    lineHeight: '0.6rem',
    width: '100%',
  }} {...props}
  >Item</div>
);
class MyFlex extends Component{
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <div className="flex-container">
        <div className="title">基本</div>
        <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />

        <div className="title">wrap 换行</div>
        <Flex wrap="wrap">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
        </Flex>
        <WhiteSpace size="lg" />

        <div className="title">轴对齐方式</div>
        <Flex justify="center">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
        </Flex>
        <WhiteSpace />
        <Flex justify="end">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
        </Flex>
        <WhiteSpace />
        <Flex justify="between">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline" />
        </Flex>

        <WhiteSpace />
        <Flex align="start">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline small" />
          <PlaceHolder className="inline" />
        </Flex>
        <WhiteSpace />
        <Flex align="end">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline small" />
          <PlaceHolder className="inline" />
        </Flex>
        <WhiteSpace />
        <Flex align="baseline">
          <PlaceHolder className="inline" />
          <PlaceHolder className="inline small" />
          <PlaceHolder className="inline" />
        </Flex>
      </div>
    );
  }
}

module.exports=MyFlex;