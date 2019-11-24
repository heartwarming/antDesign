import React,{Component} from 'react';
import { createForm } from 'rc-form';
import {Toast} from 'antd-mobile';
import AJAX from '../../../util/ajax';
import './userInput.css';
var initButtonDivStyle= {
	float:'left',
	width:'14.13%',
	height:'0.66rem',
	margin:'0.18rem 0.1rem 0.14rem 0.2rem',
	border:'#c0c0c0 solid 0.02rem',
	borderRadius:'0.08rem',
	cursor:'pointer',
	backgroundColor:'#fff',
	}
var buttonDivStyle= {
	float:'left',
	width:'14.13%',
	height:'0.66rem',
	margin:'0.18rem 0.1rem 0.14rem 0.2rem',
	border:'#1baede solid 0.02rem',
	borderRadius:'0.08rem',
	cursor:'pointer',
	backgroundColor:'#fff',
	}
var initDButton = {
	paddingTop:'0.17rem',
	textAlign:'center',
	fontSize:'0.28rem',
	fontFamily:'PingFang SC Medium',
	color:'#a9a9a9',
	}
var dButton={
	paddingTop:'0.17rem',
	textAlign:'center',
	fontSize:'0.28rem',
	fontFamily:'PingFang SC Medium',
	color:'#1baede',
	}
class UserInput extends Component{
    constructor(props){
        super(props);
		this.state={			
			focused:false,
			iptFontColor:'#c0c0c0',
			buttonDiv:initButtonDivStyle,
			dbutton:initDButton,
		};
        this.submitUserQuset=this.submitUserQuset.bind(this);
		this.onClickMeau=this.onClickMeau.bind(this);		
		this.clearInput = this.clearInput.bind(this);	
		this.changeFontColor = this.changeFontColor.bind(this);	
		this.changeStyle = this.changeStyle.bind(this);
    }	
	//输入框提交数据
	submitUserQuset(){
		let { getFieldProps } = this.props.form;
        let question=getFieldProps('userinput')['value'];//读用户输入           
		if(question){
			let data ={"code":100,"question":question};	        
	        this.onClickMeau(question);
			this.clearInput();
		  }
		  else {
		  	Toast.info('请输入您的问题');
		  }   
	}
	//预置问题提交数据
	onClickMeau(question){
	    let toHrDisplayNone='none';//用于控制向hr反馈按钮的显示与隐藏
	    let data ={"code":100,"question":question};
		this.props.changeYmbotState(data,toHrDisplayNone);
		window.scrollTo(0,222000); //窗口滚动
		let data1 ={"code":123,"question":'正在输入...'};
		this.props.changeYmbotState(data1,'');
		window.scrollTo(0,222000); //窗口滚动
		//待加入超时操作
//		Toast.loading('请稍候...', 10, () => {
//      });                                       
        let param = {"info":question,"sys":null};
	    let func=(data)=>{
			let toHrDisplay='';
			this.props.changeYmbotState(data,toHrDisplay);
//			Toast.hide();
		    window.scrollTo(0,222000); //获取机器人回答后，滚动窗口
        }
        AJAX.iget("robot/ask",param,func);
	}
  	//点击发送,清空输入框 
    clearInput(){
    	let { getFieldProps } = this.props.form;
        this.props.form.setFieldsValue({
        userinput: '',});
    }
    //输入内容，改变输入框样式
    changeFontColor(){
    	this.setState({
			iptFontColor:'#343434',
			buttonDiv:buttonDivStyle,
			dbutton:dButton,
		})    
    }
    changeStyle(){
    	this.setState({
			buttonDiv:initButtonDivStyle,
			dbutton:initDButton,
		})  
    }
  	render() {
		const { getFieldProps } = this.props.form;
        return (
            <div className="container">
			  <div className="container-wrap" >
					    <div className="scrollTab">
					      <div 
					      onClick={() => this.onClickMeau('入职报到')}
					      >
					      	<span className="scrollSpan">入职报到</span>
					      </div>
					    </div>
 						<div className="scrollTab">
	 					    <div 
	 					    onClick={() => this.onClickMeau('今天有什么新闻')}
	 					    >
	 					      <span className="scrollSpan">新闻</span>
	 					      </div>
	 					</div>
  						<div className="scrollTab">
  							 <div 
  							 onClick={() => this.onClickMeau('公积金支取')}
  							 >
  							 	<span className="scrollSpan">公积金</span>
	 					</div>
 					    </div>
						<div className="scrollTab">
 					      <div 
 					      onClick={() => this.onClickMeau('开证明')}
 					      >
 					      	<span className="scrollSpan">开证明</span>
 					      </div>
					    </div>
				  </div>

			    <div className="allInput">
				    <div className="inputDiv">
				       <input type='text' style={{height:'0.45rem',paddingLeft:'0.1rem',width:'90%',paddingTop:'0.1rem',border:'none',WebkitAppearance: 'none',fontSize:'0.34rem',fontFamily:'PingFang SC Medium',color:this.state.iptFontColor,backgroundColor:'transparent'}}  ref="theInput" placeholder=" 亲，有什么想要问我的吗？"  
	      					{...getFieldProps('userinput')} 
	      					onKeyDown={() => this.changeFontColor()} 
	      					onBlur={() => this.changeStyle()}
	      				/>
						
				    </div>
				    <div style={this.state.buttonDiv}>
				      <div 
				      onClick={this.submitUserQuset} 
				      style={this.state.dbutton}
				      >
				      	发送
				      </div>
				    </div>
			  	</div>
			</div>
        );
    }
}


UserInput = createForm()(UserInput);
module.exports = UserInput;