import React,{Component} from "react";
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';
class MySlider extends Component{
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <div className="am-slider-example">
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <p className="title">单模块</p>
          <Slider defaultValue={26} min={0} max={100} />
        </WingBlank>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <p className="title">不可用状态</p>
          <Slider defaultValue={26} disabled />
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
module.exports=MySlider;