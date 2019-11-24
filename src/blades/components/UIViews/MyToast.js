import React,{Component} from "react";
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

function showToast() {
  Toast.info('这是一个 toast 提示!!!');
}

function successToast() {
  Toast.success('加载成功!!!');
}

function failToast() {
  Toast.fail('加载失败!!!', 1);
}

function offline() {
  Toast.offline('网络连接失败!!!');
}

function loadingToast() {
  Toast.loading('加载中...', 1, () => {
    console.log('加载完成!!!');
  });
}

class MyToast extends Component{
  render() {
    return (
      <div className="toast-container">
        <WhiteSpace />
        <WingBlank>
          <Button type="ghost" onClick={showToast}>纯文字 toast</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type="ghost" onClick={successToast}>成功 toast</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type="ghost" onClick={failToast}>失败 toast</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type="ghost" onClick={offline}>网络 toast</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type="ghost" onClick={loadingToast}>加载中 toast</Button>
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }
};
module.exports=MyToast;