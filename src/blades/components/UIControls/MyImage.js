import React,{Component} from "react";
import { ImagePicker, Button } from 'antd-mobile';
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
class MyImage extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  files:[]
  	}
    this.onChange=this.onChange.bind(this);
    this.onAddImageClick=this.onAddImageClick.bind(this);
    this.sw=this.sw.bind(this);
  }
  onChange(files, type, index) {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onAddImageClick() {
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  }
  sw() {
    this.setState({
      custom: !this.state.custom,
    });
  }
  render() {
    const { files, custom } = this.state;
    return (<div>
      <Button inline style={{ margin: 10 }} onClick={this.sw}>{custom ? '自定义' : '常用的'}选择图片的方法</Button>
      {custom ? <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        onAddImageClick={this.onAddImageClick}
        selectable={files.length < 5}
      /> : <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 5}
      />}
    </div>);
  }
}
module.exports=MyImage;