import React,{Component} from "react";
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
class MyBlank extends Component{
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <div className="button-container">
        <WhiteSpace />
        <WingBlank>
          <Button type="primary">两翼留白lg(默认)</Button>
        </WingBlank>
        <WhiteSpace />
        <div style={{ borderTop: '1px solid #108ee9' }} />
        <WhiteSpace />
        <WingBlank size="md">
          <Button type="primary">两翼留白md</Button>
        </WingBlank>
        <WhiteSpace />
        <div style={{ borderTop: '1px solid #108ee9' }} />
        <WhiteSpace />
        <WingBlank size="sm">
          <Button type="primary">两翼留白sm</Button>
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }
}
module.exports=MyBlank;