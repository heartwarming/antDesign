import React,{Component} from 'react';
import AJAX from '../../../util/ajax';
import CSS from "./billList.less";
import { createForm } from 'rc-form';
import { NavBar, Carousel, Flex, List, Button, Icon ,Toast } from 'antd-mobile';
let flag = false;
class BillList extends Component{
	constructor(props){
		super(props);
		this.state={
            index:2,             //控制年份的次序
            curYear:0,           //当前年份
			years:null,          //年份数组
			data:null,           //月份薪资数组
            leftClass:"",        //控制左图标置灰
            rightClass:"shallow" //控制右图标置灰
		};
		this.beforeSlide = this.beforeSlide.bind(this);
		this.getData = this.getData.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.linkTo = this.linkTo.bind(this);
	}
    /**
     *滑动年份事件（carousel组件自带方法）
     *@from 滑动之前index
     *@to 滑动之后index (from和to相等没有滑动)
    */
    beforeSlide(from,to){
    	if(from == to){
    		return false;
    	}
        let leftClass = (to == 0)?"shallow":"";
        let rightClass = (to == this.state.years.length - 1)?"shallow":"";
        let slideYear = this.state.years[to];
        this.setState({
            leftClass  : leftClass,
            rightClass : rightClass,
            index      : to
        });
        this.setYearData(slideYear);
    }
    /**
     *点击向前按钮的处理函数
    */
    prevSlide(){
        let index = this.state.index;
        if(index == 0){
            return false;
        }
        index--;
        let slideYear = this.state.years[index];
        let leftClass = (index == 0)?"shallow":"";
        this.setState({
            leftClass : leftClass,
            index     : index
        });
    }
    /**
     *点击向后按钮的处理函数
    */
    nextSlide(){
        let index = this.state.index;
        if(index == this.state.years.length - 1){
            return false;
        }
        index++;
        let slideYear = this.state.years[index];
        let rightClass = (index == (this.state.years.length - 1))?"shallow":"";
        this.setState({
            rightClass : rightClass,
            index      : index
        });
    }
    linkTo(billData,billYear,billMonth){
        let bill_detail = {
            data  : null,
            year  : null,
            month : null
        };
        bill_detail.data = billData;
        bill_detail.year = billYear;
        bill_detail.month = billMonth;
        localStorage.setItem("bill_detail",JSON.stringify(bill_detail));
        location.hash="salary/view";
    }
    setYearData(numYear){
        if( flag ){
            return false;
        }
        flag = true;
        setTimeout(() => {
            flag = false;
        },200);
        Toast.loading("载入中...",0);
        let bill = JSON.parse(localStorage.getItem("bill"));
        let param = {
            "salarypswd":bill.pwd,     //薪资查询密码
            "year":numYear             //年份
        }
        let querySelect=(data)=>{
            Toast.hide();
            this.setState({curYear:numYear});
            if(data.statusCode == 200){
                let returnData = JSON.parse(data.data);
                this.parseData(returnData[0].salarystructlist);
            }else{
                this.setState({"data":[]});
            }
        }
        AJAX.iget('syncwage/salary/getSalary',param,querySelect);
    }
    parseData(monthData){
        let returnList = JSON.parse(monthData);
        let bill_months = [];
        for( let i=0;i<returnList.length;i++ ){
            bill_months[i] = {};
            bill_months[i].detail = returnList[i].salarydetaillist;
            let parseList = JSON.parse(returnList[i].salarydetaillist);
            for( let j=0;j<parseList.length;j++ ){
                if( parseList[j].showtitle == "会计年度" ){
                    bill_months[i].year = parseList[j].showcontent;
                }
                if( parseList[j].showtitle == "会计期间" ){
                    bill_months[i].month = parseList[j].showcontent;
                }
                if( parseList[j].showtitle == "实发合计" ){
                    bill_months[i].salary = parseList[j].showcontent;
                }
            }
        }
        this.setState({"data":bill_months.reverse()});
    }
    getData(){
        let bill = JSON.parse(localStorage.getItem("bill"));
        let years = bill.years.split(",").reverse();
        let index = years.length - 1;
        let year = years[index];
        this.setState({years:years,index:index,curYear:year});
        this.parseData(bill.months);
    }
    componentWillMount(){
        this.getData();
    }
	render(){
		const Item=List.Item;
        const settings={
			dots: false,
			autoplay:false,
			infinite:false,
			selectedIndex: this.state.index,
			beforeChange: this.beforeSlide
		};
		let carouselContent=[];
        for(let i=0;i<this.state.years.length;i++){
            carouselContent.push(<Flex justify="center" key={`carouselitem-${i}`}>
                <div className="slider-box">{this.state.years[i]}年</div>
            </Flex>);
        }
        let monthData=[];
        if( this.state.data.length>0 ){
            monthData.push(<Item arrow="horizontal" className="cell0" key="listitemzero">
                <span className="cell cell1">月</span>
                <span className="cell cell2">实发（元）</span>
            </Item>);
            for(let i=0;i<this.state.data.length;i++){
                let year = this.state.data[i].year;
                let month = this.state.data[i].month;
                let storeData = this.state.data[i].detail;
                monthData.push(<Item arrow="horizontal" key={`listitem-${i}`}
                    onClick={()=>this.linkTo(storeData,year,month)}
                >
                    <span className="cell cell1">{this.state.data[i].month}月</span>
                    <span className="cell cell2">{this.state.data[i].salary}</span>
                </Item>);
            }
        }else{
            monthData.push(<Item key="listitem-0" className="noData">
                <div style={{height:"180px"}}></div>
                <div className="noDataImg"></div>
                <div style={{height:"10px"}}></div>
                <p className="noDesc">{this.state.curYear}年度没有薪资信息</p>
            </Item>);
        }
		return (
			<div className="billList">
				<NavBar leftContent="" mode="light" onLeftClick={()=>window.history.back(-1)}>
					查薪资
				</NavBar>
				<div className="pagination-container">
                    <div className="main-container">
    					<div className="left-box" onClick={this.prevSlide}>
    						<Button disabled = {(this.state.leftClass == "")?false:true}>
                                <Icon className={this.state.leftClass} type="left"/>
                            </Button>
    					</div>
    					<div className="mid-box">
    						<Carousel {...settings}>
    							{carouselContent}
    						</Carousel>
    					</div>
    					<div className="right-box" onClick={this.nextSlide}>
    						<Button disabled = {(this.state.rightClass == "")?false:true}>
                                <Icon className={this.state.rightClass} type="right"/>
                            </Button>
    					</div>
                    </div>
				</div>
				<div className="list-container">
					<List>
						{monthData}
					</List>
				</div>
			</div>
		);
	}
}
BillList = createForm()(BillList);
module.exports = BillList;