import React,{Component} from "react";
import { Table,List } from 'antd-mobile';
const columns1 = [
  { title: '名字', dataIndex: 'name', key: 'name' },
  { title: '品种', dataIndex: 'type', key: 'type' },
  { title: '属性', dataIndex: 'class', key: 'class' },
];

const data1 = [{
  name: '科多',
  type: '英短',
  class: '猫',
  key: '1',
}, {
  name: '萨满',
  type: '英短',
  class: '猫',
  key: '2',
}, {
  name: '开心',
  type: '约克夏',
  class: '犬',
  key: '3',
}];
const columns2 = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '名字', dataIndex: 'name', key: 'name' },
  { title: '品种', dataIndex: 'type', key: 'type' },
  { title: '属性', dataIndex: 'class', key: 'class' },
];

const data2 = [{
  title: '宠物一',
  name: '科多',
  type: '英短',
  class: '猫',
  key: '1',
}, {
  title: '宠物二',
  name: '萨满',
  type: '英短',
  class: '猫',
  key: '2',
}, {
  title: '宠物三',
  name: '开心',
  type: '约克夏',
  class: '犬',
  key: '3',
}];
const columns3 = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '名字', dataIndex: 'name', key: 'name' },
  { title: '品种', dataIndex: 'type', key: 'type' },
  { title: '属性', dataIndex: 'class', key: 'class' },
];

const data3 = [{
  title: '宠物一',
  name: '科多',
  type: '英短',
  class: '猫',
  key: '1',
}, {
  title: '宠物二',
  name: '萨满',
  type: '英短',
  class: '猫',
  key: '2',
}, {
  title: '宠物三',
  name: '开心',
  type: '约克夏',
  class: '犬',
  key: '3',
}];
const columns4 = [
  { title: '姓名', dataIndex: 'a', key: 'a', width: '1rem' },
  { title: '年龄', dataIndex: 'b', key: 'b', width: '1rem' },
  { title: '身高', dataIndex: 'c', key: 'c', width: '1rem' },
  { title: '体重', dataIndex: 'b', key: 'd', width: '1rem' },
  { title: '爱好', dataIndex: 'b', key: 'e', width: '1rem' },
  { title: '生日', dataIndex: 'b', key: 'f', width: '1rem' },
  { title: '住址', dataIndex: 'b', key: 'g', width: '1rem' },
  { title: '电话', dataIndex: 'b', key: 'h', width: '1rem' },
  { title: '邮编', dataIndex: 'b', key: 'i', width: '1rem' },
  { title: '其他', dataIndex: 'b', key: 'j', width: '1rem' },
];

const data4 = [
  { a: '二哈', b: '32', d: 3, key: '1' },
  { a: '小明', b: '98', d: 3, key: '2' },
  { a: '猪头', c: '16', d: 2, key: '3' },
  { a: '小二', c: '33', d: 2, key: '4' },
];
const columns5 = [
  { title: '标题', dataIndex: 'title', key: 'title', width: '1rem', fixed: 'left' },
  { title: '姓名', dataIndex: 'a', key: 'a', width: '1rem' },
  { title: '年龄', dataIndex: 'b', key: 'b', width: '1rem' },
  { title: '身高', dataIndex: 'c', key: 'c', width: '1rem' },
  { title: '体重', dataIndex: 'b', key: 'd', width: '1rem' },
  { title: '爱好', dataIndex: 'b', key: 'e', width: '1rem' },
  { title: '生日', dataIndex: 'b', key: 'f', width: '1rem' },
  { title: '住址', dataIndex: 'b', key: 'g', width: '1rem' },
  { title: '电话', dataIndex: 'b', key: 'h', width: '1rem' },
  { title: '邮编', dataIndex: 'b', key: 'i', width: '1rem' },
  { title: '其他', dataIndex: 'b', key: 'j', width: '1rem' },
];

const data5 = [
  { title: '人物1', a: '二哈', b: '32', d: 3, key: '1' },
  { title: '人物2', a: '小明', b: '98', d: 3, key: '2' },
  { title: '人物3', a: '猪头', c: '16', d: 2, key: '3' },
  { title: '人物4', a: '小二', c: '33', d: 2, key: '4' },
];
class MyTable extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const Item=List.Item;
		return(
			<div>
				<List>
					<Item><a href={"#a1"}>纵向</a></Item>
					<Item><a href={"#a2"}>横向</a></Item>
					<Item><a href={"#a3"}>混合</a></Item>
					<Item><a href={"#a4"}>横向滚动</a></Item>
					<Item><a href={"#a5"}>锁定标题列</a></Item>
				</List>
				<p><a id="a1" name="a1"></a>纵向</p>
				<Table
				    columns={columns1}
				    dataSource={data1}
				  />
				<p><a id="a2"  name="a2"></a>横向</p>
				<Table
				    direction="horizon"
				    columns={columns2}
				    dataSource={data2}
				  />
				<p><a id="a3" name="a3"></a>混合</p>
				<Table
				    direction="mix"
				    columns={columns3}
				    dataSource={data3}
				  />
				<p><a id="a4" name="a4"></a>横向滚动</p>
				<Table
				    scrollX
				    columns={columns4}
				    dataSource={data4}
				  />
				<p><a id="a5" name="a5"></a>锁定标题列</p>
				<Table
				    titleFixed
				    columns={columns5}
				    dataSource={data5}
				  />
			</div>
		);
	}
}
module.exports=MyTable;