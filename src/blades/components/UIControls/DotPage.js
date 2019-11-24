import React,{Component} from "react";
import { Pagination, WhiteSpace, WingBlank } from 'antd-mobile';
import Css from "./css/dotPage.less";
class DotPage extends Component{
  constructor(props){
  	super(props);
  }
  render() {
    return (
      <div>
        <div className="pagination-container" >
          <WhiteSpace size="lg" />
          <WingBlank>
            <p className="title">点状</p>
            <div style={{ marginBottom: '32px' }}>
              <Pagination
                mode="pointer"
                total={5}
                current={2}
              />
            </div>
          </WingBlank>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}
module.exports=DotPage;