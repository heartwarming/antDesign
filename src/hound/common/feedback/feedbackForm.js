/*!
 * fuhaiqiu v 0.0.1
 * time 2016-12-08
 */
/*!
 *  组件使用说明
 * 属性：
 *   isShowTitle:是否显示title
 */
import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {Popup, NavBar, Icon, List, TextareaItem, ImagePicker, Button, Toast } from 'antd-mobile';
import CSS from "./feedbackForm.css";
// form 提交 和 ajax 引入
import AJAX from '../../../util/ajax';
import Common from '../../../util/common';

// 创建控制标题显隐的两个变量
let titleStyleShow = {
    fontSize: "0.34rem",
    width: '100%',
    height: '50px',
    textAlign: 'center',
    background: '#eee',
    color: '#343434',
}
let titleStyleHidden = {
    display: 'none',
}

class Myquestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sel: '',
            isShow: true,
             
            files: data, 
            custom: false,
            number: 0 ,
            clientH:0
      
        }
        this.onClose = this.onClose.bind(this);
        this.isShowTitleFun = this.isShowTitleFun.bind(this);
        this.submitfeedback = this.submitfeedback.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onAddImageClick = this.onAddImageClick.bind(this);
    }
    onClose(sel) {
        this.setState({
            sel
        });
        Popup.hide();
    }
    isShowTitleFun() {
        if (this.props.isShowTitle) {
            return titleStyleShow;
        } else {
            return titleStyleHidden;
        }
    }

    onChange(files, type, index) {
        console.log(files, type, index);
        this.setState({
          files,
          number : files.length ,
        });
        console.log(files.length );
        console.log(this.state.number);
    };

    onAddImageClick() {
        this.setState({
          files: this.state.files.concat({
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '3',
          }),
        });
    };

    componentDidMount(){
        let H = document.documentElement.clientHeight ;
        this.setState({"clientH":H});
    }

    submitfeedback(){
        let { getFieldProps } = this.props.form;
        let count = getFieldProps('count')['value'];
        if(!count){
            Toast.info('问题不能为空');
            return false;
        } 
        let param = {"question" : count , "filepath" : ''} ;
        let func = (data) =>{
            if(data.statusCode == 200){
                console.log(data);
                Toast.info('提交成功');
            }       
        }
        AJAX.ipost("ssc/qa/question/insert",param,func);
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { files, custom } = this.state;
        return ( 
            < div className = "feedbackForm" >
                <NavBar mode="dark" style={this.isShowTitleFun()} onLeftClick={()=>this.onClose('cancel')}>HR反馈</NavBar>
                <List>
                    <TextareaItem className = "addborder" 
                        {...getFieldProps('count')}
                        placeholder = "亲, 请输入需要解决的问题(必填)"
                        rows={5}
                        count={200}
                    />
                    <div>
                        <Button inline style={{ marginLeft : 10 }}>问题截图(非必填)</Button>
                          {custom ? <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            onAddImageClick={this.onAddImageClick}
                            selectable={files.length < 4}
                          /> : <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 4}
                          />}
                    </div>  
                    <p className="title showBox"><span className="picShow">{4-this.state.number}</span></p>     
                </List>
                <div className="rmvclick"></div>
                < div  >
                    < Button className = "btn"   style = {{ top: this.state.clientH}} activeStyle = {{backgroundColor: '#12789b'}} onClick = {this.submitfeedback} > 提交 < /Button>   
                < /div >
            </div>
        );
    }
   
}

Myquestion = createForm()(Myquestion);

module.exports = Myquestion;
// export default Myquestion;