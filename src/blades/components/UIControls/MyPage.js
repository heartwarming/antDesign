import React,{Component} from "react";
import { Pagination, WhiteSpace, Icon, WingBlank } from 'antd-mobile';
import Css from "./css/page.less";
class MyPage extends Component{
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <div className="loading-example">
        <div className="pagination-container" >
          <WhiteSpace size="lg" />
          <WingBlank>
            <p className="title">按钮内带文本</p>
            <Pagination
              total={5}
              current={1}
              prevText="上一步"
              nextText="下一步"
            />
          </WingBlank>
          <WhiteSpace size="lg" />
          <WingBlank>
            <p className="title">带文本和icon</p>
            <Pagination
              total={5}
              current={1}
              prevText={<div><Icon type="left" />上一步</div>}
              nextText={<div>下一步<Icon type="right" /></div>}
            />
          </WingBlank>
          <WhiteSpace size="lg" />
          <WingBlank>
            <p className="title">隐藏数字</p>
            <Pagination
              total={5}
              simple
              current={1}
              prevText="上一步"
              nextText="下一步"
            />
          </WingBlank>
          <WhiteSpace size="lg" />
          <WingBlank>
            <p className="title">只显示数字</p>
            <Pagination
              mode="number"
              total={5}
              current={3}
            />
          </WingBlank>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}
module.exports=MyPage;