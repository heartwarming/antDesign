import React,{Component} from "react";
import { Popover, NavBar, Icon } from 'antd-mobile';
const Item = Popover.Item;
class MyPopOver extends Component{
  constructor(props){
	super(props);
	this.state={
		visible:false,
		selected:""
	}
	this.onSelect=this.onSelect.bind(this);
	this.handleVisibleChange=this.handleVisibleChange.bind(this);
  }
  onSelect(opt) {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  }
  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  }
  render() {
    return (<div>
      <NavBar iconName={false} rightContent={
        <Popover
          visible={this.state.visible}
          overlay={[
            (<Item key="4" value="scan" iconName="scan" data-seed="logId">扫一扫</Item>),
            (<Item key="5" value="special" iconName="qrcode" style={{ whiteSpace: 'nowrap' }}>我的二维码</Item>),
            (<Item key="6" value="button ct" iconName="question-circle-o">
              <span style={{ marginRight: 5 }}>帮助</span>
            </Item>),
          ]}
          popupAlign={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-2, 15],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 0.3rem',
            marginRight: '-0.3rem',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      }
      >
        NavBar
      </NavBar>
    </div>);
  }
}
module.exports=MyPopOver;