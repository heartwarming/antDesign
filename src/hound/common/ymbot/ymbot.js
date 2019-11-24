/**
 * Created by Administrator on 2016/11/10.
 */
import React,{Component} from 'react';
import Context from '../../../util/context';
import {Popup, NavBar} from 'antd-mobile';
import FeedbackForm from '../feedback/feedbackForm';
import UserInput from './userInput';
import './ymbot.css';


class Ymbot extends Component{
    constructor(props){
        super(props);	
		
    }
	 render() {
    	{Context.init()}
        return (
            <div className='allYmbot'  >		  
			  	<NavBar1 />
			  	<Content />
            </div>
        );
    }
}
class NavBar1 extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
        	<div className='navbar'>
               <NavBar leftContent="" mode="light" onLeftClick={Context.cback}>我要提问</NavBar>
            </div>
        );
    }
}
class Content extends Component{
    constructor(props){
        super(props);
		this.state = {
			dialogs:[],
			url1:'',
			popupDisplay:'none',
			fadetoHrDisplay:'',
		}
		this.changeChatContent= this.changeChatContent.bind(this);
//		this.moreOpt= this.moreOpt.bind(this);
//		this.closeMoreOpt= this.closeMoreOpt.bind(this);
		this.openPopup= this.openPopup.bind(this);
		this.closePopup= this.closePopup.bind(this);
		this.getUserImg= this.getUserImg.bind(this);
		this.feedback= this.feedback.bind(this);
//		this.sendAjaxAgain= this.sendAjaxAgain.bind(this);
		}
    
	//用于子组件和父组件通信
    
	changeChatContent(data,toHrDisplay){
		this.state.dialogs.push(data);
		let newDialogs = this.state.dialogs;
		this.setState({
			dialogs:newDialogs,
			fadetoHrDisplay:toHrDisplay,
			
		})    
	}
	gotoHR() {
		Popup.show(
			<FeedbackForm isShowTitle />   		
		)
    }
	//点击显示更多的弹出层
//	moreOpt(){
//		Popup.show(
//		<div style={{height:'11.6rem'}}>
//     <div style={{height:100,padding:0}}>
//		    <div style={{height:50,margin:0,textAlign:'center'}} onClick={this.closeMoreOpt}> V
//			</div>
//			<div style={{height:50,margin:0}}>办理入职需要哪些材料？
//			</div>
//		  </div>
//		  <div style={{height:250}}>
//		  1<br/>
//		  </div>
//    </div>, { animationType: 'slide-up',},{maskClosable:'true'});
//		
//	}
//	closeMoreOpt() {
// 
//  Popup.hide();
//  }

	//点击新闻列表,把url传给iframe	
	openPopup(listUrl){
		let height1=window.innerHeight;
		Popup.show(
			 <div style={{position:'fixed',display:'',left:0,top:0,height:height1,width:'100%',zIndex:'10',margin:0}}>
			    <div style={{display:'block',height:'0.88rem',position:'fixed',top:0,margin:0,width:'100%',zIndex:'2'}}>
           			<NavBar leftContent="" mode="light" onLeftClick={() => this.closePopup()}
           				rightContent={''}
          				></NavBar>
         		</div>
         		
			    <div className='frame'>   
				    <iframe src={listUrl} width='100%' height='100%' frameBorder="0">								
			   		 </iframe>
		   		</div>
			  </div>
		)
	}
	closePopup(){
		Popup.hide();
	}
	//获取用户头像
	getUserImg(){
		let userContext=Context.getUserinfo();
		let userImg = userContext.u_useravator;
		let username = userContext.u_username;
		username = username.substr(username.length-2, 2);
        let photo = '';
	  	if(userImg&&userImg!=="null"&&userImg!=="undefined") {
	  		photo = (<img src={userImg} alt={''} className="noPhoto"/>);
	  	} 
	  	else {
	  		photo = (<span className="ephoto">{username}</span>);
	  	}
	  	return photo;
	}
	//向hr反馈
	feedback(){
		let feedbackToHr =[];
		if(this.state.dialogs.length>0){ 
		feedbackToHr.push(
			<div className='ahcor'>
				<div style={{display:this.state.fadetoHrDisplay,width:'100%',marginTop:'0.2rem',height:'auto'}} >
					<div className='fadeTohr'> 
	              		<span className='toHrLeft'>没有想要的，</span>
						<span className='toHrRight' onClick={() => this.gotoHR()}>找hr反馈</span>
	        		</div>
		  		</div>
			</div>
		);
       }
		return feedbackToHr;
	}
//知识库匹配到的答案进行再次提问
//	sendAjaxAgain(sendInfoAgain){
//	    let toHrDisplayNone='none';//用于控制向hr反馈按钮的显示与隐藏
//	    let data ={"code":100,"question":sendInfoAgain};
//		this.changeChatContent(data,toHrDisplayNone);
//		window.scrollTo(0,222000); //窗口滚动
//		//待加入超时操作
//		Toast.loading('请稍候...', 10, () => {
//      });                                       
//      let param = {"info":sendInfoAgain,"sys":null};
//	    let func=(data)=>{
//			let toHrDisplay='';
//			this.changeChatContent(data,toHrDisplay);
//			Toast.hide();
//		    window.scrollTo(0,222000); //获取机器人回答后，滚动窗口
//      }
//      AJAX.iget("robot/ask",param,func);
//	}
		
		

    render() {
		let chatItem = [];
		  for (let i =0;i<this.state.dialogs.length;i++){			
			switch(this.state.dialogs[i].code){				
				case 100:{
				  chatItem.push(
					<div key={i}>
				      <div className="userChat">
					  	<div className="userPhoto">
							{this.getUserImg()}
						</div>
						<div className="rtriangle" />
						<div className="userQuestion">
				            {this.state.dialogs[i].question}
						</div>
					  </div>
			        </div>
 				  );
				}window.scrollTo(0,222000); 
				break;
				case 123:{
				  chatItem.push(
					<div key={i}>
				      <div className="ymbotAnswerDiv">
					    <div className="ymbotPhoto">
					    	<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
						</div>
						<div className="ltriangle" />
						<div className="ymbotAnswer">
						  {this.state.dialogs[i].question}
						</div>
				      </div>
			        </div>
				  );
				}
				break;
				case 110000:{
	      			let listItem=[];
		  			for (let j=0;j<this.state.dialogs[i].answers.length;j++){
			 		 listItem.push(
						<div key={j}>
		          			<div className="listItem" onClick={() => this.openPopup(this.state.dialogs[i].answers[j].url)}>
		  			      	<span>{j+1}.</span>	{this.state.dialogs[i].answers[j].question}
				 		 	</div>
						</div>);
			  
		  			}
		 		 	chatItem.pop();
		 		 	chatItem.push(
						<div key={i}>				     		 
		     				<div className="ymbotAnswerDiv">
			    				<div className="ymbotPhoto">
			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
								</div>
								<div className="ltriangle"></div>
								<div className="listTextDiv">
					  				<div className="listText">

					  				</div>
				  					{listItem}
								</div>
		     				</div>
		                </div>
		  			);	
				}
				break;

				case 110001:{
	      			let listItem=[];
		  			for (let j=0;j<this.state.dialogs[i].answers.length;j++){
			 		 listItem.push(
						<div key={j}>
		          			<div className="listItem" onClick={() => this.openPopup(this.state.dialogs[i].answers[j].url)}>
		  			      	<span></span>	{this.state.dialogs[i].answers[j].text}
				 		 	</div>
						</div>);
			  
		  			}
		 		 	chatItem.pop();
		 		 	chatItem.push(
						<div key={i}>				     		 
		     				<div className="ymbotAnswerDiv">
			    				<div className="ymbotPhoto">
			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
								</div>
								<div className="ltriangle"></div>
								<div className="listTextDiv">
					  				<div className="listText">
										{this.state.dialogs[i].answers[0].question}
					  				</div>
					  				<div className="listText">
										{this.state.dialogs[i].answers[0].text}
					  				</div>
		          			<div className="listItem" onClick={() => this.openPopup(this.state.dialogs[i].answers[j].url)}>
		  			      	<span></span>	查看详情
				 		 	</div>
								</div>
		     				</div>
		                </div>
		  			);	
				}
				break;

				case 100000:{
				  chatItem.pop();
				  let fuwenben = this.state.dialogs[i].text;
				  chatItem.push(
					<div key={i}>
				      <div className="ymbotAnswerDiv">
					    <div className="ymbotPhoto">
					    	<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
						</div>
						<div className="ltriangle" />
						<div className="ymbotAnswer">
						  <div dangerouslySetInnerHTML={{__html: fuwenben}} />
						</div>
				      </div>
			        </div>
				  );
				  
				}
				break;
				case 200000:{
						  chatItem.pop();
						  chatItem.push(
							<div key={i}>
								<div className="ymbotAnswerDiv">
								    <div className="ymbotPhoto">
								    	<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
									</div>
									<div className="ltriangle" />
									<div className="listTextDiv">
						  				<div className="listText" onClick={() => this.openPopup(this.state.dialogs[i].url)}>
							 				<span style={{color:'#1baede'}}>{this.state.dialogs[i].text}</span>
						  				</div>
									</div>
						     	</div>
		                    </div>
						  );	
						}
				break;
				case 302000:{
	      			let listItem=[];
		  			for (let j=0;j<this.state.dialogs[i].list.length;j++){
			 		 listItem.push(
						<div key={j}>
		          			<div className="listItem" onClick={() => this.openPopup(this.state.dialogs[i].list[j].detailurl)}>
		  			      	<span>{j+1}.</span>	{this.state.dialogs[i].list[j].article}
				 		 	</div>
						</div>);
			  
		  			}
		 		 	chatItem.pop();
		 		 	chatItem.push(
						<div key={i}>				     		 
		     				<div className="ymbotAnswerDiv">
			    				<div className="ymbotPhoto">
			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
								</div>
								<div className="ltriangle"></div>
								<div className="listTextDiv">
					  				<div className="listText">
						 				{this.state.dialogs[i].text}
					  				</div>
				  					{listItem}
								</div>
		     				</div>
		                </div>
		  			);	
				}
				break;
				case 308000:{
	      			let listItem=[];
		  			for (let j=0;j<this.state.dialogs[i].list.length;j++){
			 		 listItem.push(
						<div key={j}>
		          			<div className="listItem" onClick={() => this.openPopup(this.state.dialogs[i].list[j].detailurl)}>
		  			      	<span>{j+1}.</span>	{this.state.dialogs[i].list[j].info}
				 		 	</div>
						</div>);					  
		  			}
		 		 	chatItem.pop();
		 		 	chatItem.push(
						<div key={i}>				     		 
		     				<div className="ymbotAnswerDiv">
			    				<div className="ymbotPhoto">
			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
								</div>
								<div className="ltriangle" />
								<div className="listTextDiv">
					  				<div className="listText">
						 				{this.state.dialogs[i].text}
					  				</div>
					  				{listItem}
								</div>
		      				</div>
            			</div>
		  			);	
				}
				break;

//				case 309000:{
//	      			let listItem=[];
//		  			for (let j=0;j<this.state.dialogs[i].list.length;j++){
//			 		 listItem.push(
//						<div key={j}>
//		          			<div className="listItem" onClick={() => this.sendAjaxAgain(this.state.dialogs[i].list[j].info)}>
//		  			      	<span>{j+1}.</span>	{this.state.dialogs[i].list[j].info}
//				 		 	</div>
//						</div>);					  
//		  			}
//		 		 	chatItem.push(
//						<div key={i}>				     		 
//		     				<div className="ymbotAnswerDiv">
//			    				<div className="ymbotPhoto">
//			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
//								</div>
//								<div className="ltriangle" />
//								<div className="listTextDiv">
//					  				<div className="listText">
//						 				{this.state.dialogs[i].text}
//					  				</div>
//					  				{listItem}
//								</div>
//		      				</div>
//          			</div>
//		  			);	
//				}
//				break;
	   			default:{
		 			chatItem.pop();
		 			chatItem.push(
						<div key={i}>
		      				<div className="ymbotAnswerDiv">
			    				<div className="ymbotPhoto">
			    					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
								</div>
								<div className="ltriangle" />
								<div className="listTextDiv">
					  				<div className="listText">
						 				......
					  				</div>
								</div>
		     				</div>
	        			</div>
		 			);				  
				}			   			
			}		
		}		
	return (
            <div className="ymbotDiv">
              <div style={{height:'0.88rem'}} />
			  <div className="initYmbotDiv">
				<div className="ymbotPhoto">
					<img src={require('./../../../static/ymbot/bot.png')} alt={''} style={{display:'block',width:'100%'}}/>
				</div>
				<div className="ltriangle"></div>
				<div className="listTextDiv">
	  				<div className="listText">
		 				您好,很高兴为您服务
	  				</div>
				</div>
			  </div>
			   {chatItem}
			   {this.feedback()}
			  <div style={{height:'2.88rem'}}/>
			 <UserInput changeYmbotState={this.changeChatContent} />
			</div>
        );
    
    }
      

}


module.exports = Ymbot;