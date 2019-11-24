import React,{Component} from "react";
import { Menu } from 'antd-mobile';
const data = [
  {
    label: '中餐',
    value: '21',
  }, {
    label: '未生效',
    value: '22',
    disabled: true,
  }, {
    label: '火锅',
    value: '23',
  }, {
    label: '自助餐',
    value: '24',
  }, {
    label: '快餐',
    value: '25',
  },
];
class MyMenu extends Component{
	constructor(props){
		super(props);
		this.onChange=this.onChange.bind(this);
	}
	onChange(value) {
	    let label = '';
	    data.forEach((el) => {
	      if (el.value === value[0]) {
	        label = el.label;
	      }
	    });
	    console.log(`选中了 ${label}`);
 	}
	render(){
		return <Menu data={data} level={1} onChange={this.onChange} height={Math.round(document.documentElement.clientHeight / 3)} />;
	}
}
module.exports=MyMenu;