import React,{Component} from "react";
import { ActivityIndicator, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Css from "./css/style.less";
class MyAcitivity extends Component{
  constructor(props){
	  super(props);
	  this.state={
		  animating:false
	  }
    this.showToast=this.showToast.bind(this);
  }
  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }
  showToast() {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 2000);
  }
  render() {
    return (
      <div>
        <WingBlank>
          <div className="loading-container">
            <WhiteSpace size="xl" />
            <div className="loading-example">
              <p className="title">icon无文案</p>
              <ActivityIndicator animating />
            </div>
            <WhiteSpace size="xl" />
            <div className="loading-example">
              <p className="title">icon带文案</p>
              <ActivityIndicator
                text="加载中..."
              />
            </div>
            <WhiteSpace size="xl" />
            <div className="loading-example white">
              <p className="title">深色背景</p>
              <div className="darkBg">
                <ActivityIndicator color="white" />
              </div>
            </div>
            <WhiteSpace size="xl" />
            <div className="loading-example">
              <p className="title">大号icon</p>
              <ActivityIndicator
                size="large"
              />
            </div>
            <WhiteSpace size="xl" />
            <Button type="ghost" onClick={this.showToast}>点击显示 Toast</Button>
            <div className="toast-example">
              <ActivityIndicator
                toast
                text="正在加载"
                animating={this.state.animating}
              />
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}
module.exports=MyAcitivity;