import React,{Component} from "react";
import { DatePicker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Css from "./css/date.less";

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

const gmtNow = moment().utcOffset(0);
class MyDate extends Component{
  constructor(props){
  	super(props);
  	this.state={
  	  date: zhNow
  	}
  	this.onChange=this.onChange.bind(this);
  }
  onChange(date) {
    // console.log('onChange', date);
    this.setState({
      date:date
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (<div>
      <List
        renderHeader={() => '选择时间'}
        style={{ backgroundColor: 'white' }}
      >
        <DatePicker
          mode="date"
          title="选择日期"
          extra="可选,小于结束日期"
          {...getFieldProps('date1', {
            initialValue: zhNow,
          })}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">日期</List.Item>
        </DatePicker>
        <DatePicker mode="time" {...getFieldProps('time1')}>
          <List.Item arrow="horizontal">时间,不限定上下限</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          {...getFieldProps('time', {
            initialValue: zhNow,
          })}
          minDate={minTime}
          maxDate={maxTime}
        >
          <List.Item arrow="horizontal">时间</List.Item>
        </DatePicker>
        <DatePicker className="forss"
          mode="datetime"
          onChange={this.onChange}
          value={this.state.date}
        >
          <List.Item arrow="horizontal">日期+时间</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          format={val => val.format('HH:mm Z')}
          okText="Ok"
          dismissText="Cancel"
          locale={enUs}
          {...getFieldProps('customformat', {
            initialValue: gmtNow,
          })}
        >
          <List.Item arrow="horizontal">time(en_US)</List.Item>
        </DatePicker>
      </List>
    </div>);
  }
}
MyDate=createForm()(MyDate);
module.exports=MyDate;