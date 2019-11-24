import React,{Component} from "react";
import { Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';

import district from './data/district';
import province from './data/province';
const data = [
  { "value": "bj", "label": "北京市", "children":null},
  { "value": "zj", "label": "浙江省", "children":null},
  { "value": "gd", "label": "广东省", "children":null},
  { "value": "hn", "label": "海南省", "children":null},
  { "value": "cq", "label": "重庆市", "children":null},
  { "value": "sc", "label": "四川省", "children":null}
];
class MyPicker extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  data: data,
      cols: 1
  	}
  	this.onPickerChange=this.onPickerChange.bind(this);
  }
  onPickerChange(val) {
    console.log(val);
    let colNum = 1;
    const d = [...this.state.data];
    if (val[0] === 'zj') {
      d.forEach(i => {
        if (i.value === 'zj') {
          colNum = 2;
          if (!i.children) {
            i.children = [{
              value: 'zj-nb',
              label: '宁波',
            }, {
              value: 'zj-hz',
              label: '杭州',
            }];
          } else if (val[1] === 'zj-hz') {
            i.children.forEach(j => {
              if (j.value === 'zj-hz') {
                j.children = [{
                  value: 'zj-hz-xh',
                  label: '西湖区',
                }];
              }
            });
            colNum = 3;
          }
        }
      });
    } else {
      colNum = 1;
    }
    this.setState({
      data: d,
      cols: colNum,
    });
  }
  // setVal() {
  //   this.props.form.setFieldsValue({
  //     district: ['340000', '340800', '340822'],
  //   });
  // },
  render() {
    const { getFieldProps } = this.props.form;
    return (<div>
      <List style={{ backgroundColor: 'white' }}>
        <Picker extra="请选择(可选)" data={district} title="选择地区" {...getFieldProps('district', {
          initialValue: ['340000', '340800', '340824'],
        })}
        >
          <List.Item arrow="horizontal">省市区选择</List.Item>
        </Picker>
        <Picker data={this.state.data} cols={this.state.cols}
          {...getFieldProps('district2')}
          onPickerChange={this.onPickerChange}
        >
          <List.Item arrow="horizontal">省市选择(异步加载)</List.Item>
        </Picker>
        <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
          <List.Item arrow="horizontal">选择省份</List.Item>
        </Picker>
      </List>
    </div>);
  }
}
MyPicker = createForm()(MyPicker);
module.exports=MyPicker;