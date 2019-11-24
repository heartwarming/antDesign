import React,{Component} from "react";
import { Progress, Button } from 'antd-mobile';
import Css from "./css/progress.less";
class MyProgress extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  percent: 0,
      per: 45
  	}
  	this.run = this.run.bind(this);
    this.add = this.add.bind(this);
  }
  run() {
    let p = this.state.percent + 1;
    if (this.state.percent >= 100) {
      return false;
    }
    this.setState({ percent: p });
    setTimeout(this.run,30);
  }
  add(){
    let per = this.state.per + 5;
    if(per >= 100){
      per = 0;
    }
    this.setState({per:per});
  }
  componentDidMount(){
    this.run();
  }
  render() {
    return (
      <div className="progress-container">
        <Progress percent={30} position="fixed" />
        <div style={{ height: 36 }} />
        <Progress percent={this.state.per} position="normal" unfilled="hide" />
        <div className="show-info">
          <div className="progress"><Progress percent={this.state.percent} position="normal" /></div>
          <div>{this.state.percent}%</div>
        </div>
        <Button inline style={{ marginTop: 20 }} onClick={this.add}>(+-)10</Button>
      </div>
    );
  }
}
module.exports=MyProgress;