import React,{Component} from "react";
import { Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Css from "./css/style.less";
class MyModal extends Component{
	constructor(props){
		super(props);
		this.state={
			visible: false,
			visible1: false
		}
		this.showModal=this.showModal.bind(this);
		this.onClose=this.onClose.bind(this);
		this.showModal1=this.showModal1.bind(this);
		this.onClose1=this.onClose1.bind(this);
	}
	showModal() {
	    this.setState({
	      visible: true,
	    });
	}
	onClose() {
	    this.setState({
	      visible: false,
	    });
	}
	showModal1(){
		this.setState({
			visible1: true
		});
	}
	onClose1(){
		this.setState({
			visible1: false
		});
	}
	render() {
	    return (
	      <div>
	        <WhiteSpace size="lg" />
	        <WingBlank>
	          <Button type="ghost" onClick={this.showModal}>
	            可关闭对话框
	          </Button>
	          <Modal
	            title="这是 title"
	            closable
	            maskClosable
	            transparent
	            onClose={this.onClose}
	            visible={this.state.visible}
	          >
	            这是内容...<br />
	            这是内容...<br />
	          </Modal>
	        </WingBlank>
	        <WhiteSpace size="lg" />
	        <WingBlank>
	          <Button type="ghost" onClick={this.showModal1}>
	            自定义对话框
	          </Button>
	          <Modal
	            onClose={this.onClose1}
	            transparent
	            visible={this.state.visible1}
	            footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose1(); } }]}
	          >
	            <div className="modal-demo-content">
	              <div className="demo-image">图片</div>
	              <div className="demo-title">标题文字标题文字</div>
	              <div className="demo-content">
	                辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字<br />
	                辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字<br />
	                辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字辅助说明文字<br />
	              </div>
	            </div>
	          </Modal>
	        </WingBlank>
	        <WhiteSpace size="lg" />
	        
	      </div>
	    );
	}
}
module.exports=MyModal;