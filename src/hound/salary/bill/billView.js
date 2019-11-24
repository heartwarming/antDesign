import React,{Component} from "react";
import { NavBar,Table } from 'antd-mobile';
import Css from "./billView.less";
class BillView extends Component{
	constructor(props){
		super(props);
		this.state={
			date    : "",
			columns : "",
			datas   : ""
		}
		this.getData=this.getData.bind(this);
	}
	getData(){
		let detail = JSON.parse(localStorage.getItem("bill_detail"));
		let bill_year = detail.year;
		let bill_month = detail.month;
		let bill_date = bill_year + "年" + bill_month + "月";
		this.setState({date:bill_date});

		let columns = [
			{title: '标题', dataIndex: 'showtitle', key: 'showtitle'},
			{title: '值', dataIndex: 'showcontent', key: 'showcontent'},
		];
		this.setState({columns:columns});
		let bill_detail = JSON.parse(detail.data);
		let bill_datas = [];
		for( let i=0;i<bill_detail.length;i++ ){
			if( bill_detail[i].showtitle == "部门名称" || bill_detail[i].showtitle == "人员姓名" || bill_detail[i].showtitle == "会计年度" || bill_detail[i].showtitle == "会计期间" ){
				continue;
			}
			bill_datas.push(bill_detail[i]);
		}
		this.setState({datas:bill_datas});
	}
	componentWillMount(){
        this.getData();
    }
    componentDidMount(){
    	let tdArr = document.getElementsByTagName("td");
    	for ( let i=0;i<tdArr.length;i++ ){
    		let text = tdArr[i].lastChild.innerHTML;
    		if( text=="应发合计" || text=="扣款合计" || text=="实发合计" ){
    			tdArr[i].className += " bold";
    			tdArr[i].nextSibling.className += " bold";
    		}
    	}
    }
	render(){
		return(
			<div className="billView">
				<NavBar leftContent="" mode="light" onLeftClick={()=>window.history.back(-1)}>
					薪资详情
				</NavBar>
				<div className="tableTitle">{this.state.date}</div>
				<div className="tableBox">
					<Table
					    direction="horizon"
					    columns={this.state.columns}
					    dataSource={this.state.datas}
					/>
				</div>
			</div>
		);
	}
}
module.exports = BillView;