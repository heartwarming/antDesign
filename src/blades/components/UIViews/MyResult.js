import React,{Component} from "react";
import { Result } from 'antd-mobile';
class MyResult extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/yRUDxcBPvzZTDHK.png"
				    title="支付成功"
				    message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>998.00</div><del>1098元</del></div>}
				/>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png"
				    title="验证成功"
				    message="所提交内容已成功完成验证"
				/>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
				    title="支付失败"
				    message="所选银行卡余额不足"
				    buttonText="点击重试"
				    buttonType="primary"
				    buttonClick={() => alert('点击了按钮')}
				/>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png"
				    title="等待处理"
				    message="已提交申请，等待银行处理"
				/>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
				    title="无法完成操作"
				    message="由于你的支付宝账户还未绑定淘宝账户请登请登录www.taobao.com"
				/>
				<Result
				    imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
				    title="无法完成操作"
				    message="由于你的支付宝账户还未绑定淘宝账户请登请登录www.taobao.com"
				/>
				<Result
			      imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
			      title="内容为空"
			      message="可各业务自定义文案"
			      buttonText="重新尝试"
			      buttonType="primary"
			      buttonClick={() => alert('点击了按钮')}
			    />
			    <Result
			      imgUrl="https://os.alipayobjects.com/rmsportal/hcEPreZxgZWxhVw.png"
			      title="警示"
			      message="可各业务自定义文案"
			      buttonText="重新加载"
			      buttonType="primary"
			      buttonClick={() => alert('点击了按钮')}
			    />
			    <Result
			      imgUrl="https://zos.alipayobjects.com/rmsportal/TCIJgoBIvJjfbqo.png"
			      title="提示信息"
			      message="辅助说明信息"
			    />
			    <Result
			      imgUrl="https://os.alipayobjects.com/rmsportal/QGxGZRxaqMRKnjS.png"
			      title="网络不给力"
			      message="请查看网络连接或稍后重试"
			      buttonText="重新尝试"
			      buttonType="primary"
			      buttonClick={() => alert('点击了按钮')}
			    />
			</div>
		);
	}
}
module.exports=MyResult;