import React,{Component} from 'react';
import { Accordion, List, NavBar,Popup } from 'antd-mobile';
import Subordinate from './subordinate';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
import CSS from './my.less';
let parentFlag = true;
let cid = '';
class Myorg extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			content: '',
			data: [],
			height: '',
			isNav: false,
            title: 'hhh',
			id: ''
		}
		this.getListData = this.getListData.bind(this);
		this.getList = this.getList.bind(this);
		this.getStaffList = this.getStaffList.bind(this);
		this.getLast = this.getLast.bind(this);
		this.back = this.back.bind(this);
	}

	onChange(key) {
	    console.log(key);
	}
	//返回
	back() {
		history.go(-1);
	}
	//已知有下级，获取下级
	getLast(aid, aname) {
		location.hash=`myteam/org?orgid=${aid}&name=${aname}`;
	}
	//无下级，获取人员列表信息
	getStaffList(aid, aname) {
		location.hash=`myteam/sub?orgid=${aid}&name=${aname}`;
	}
	//获取下级组织信息
	getList(aaid) {
		let	id = aaid;
		let obj = {
			type: 'GET',
			url: '/corehr/myteam/queryOrgInfoByOrgId',
			data: {'orgId': id},
			func:(data) => {
				data = JSON.parse(data).data;
				let newdata = [];
				newdata.push(data);
				this.setState({
					data: newdata
				})

			}
		};
		AJAX.ajax(obj);
	}
	//初始数据
	getListData() {
		let	id = Context.getUserinfo().u_staffid;
		let obj = {
			type: 'GET',
			url: 'corehr/myteam/queryMyOrgByStaffId',
			data: {'staffId': id},
			func:(data) => {
				data = JSON.parse(data).data;
				this.setState({
					data: data,
				})
			}
		};
		AJAX.ajax(obj);
	}
	componentWillMount() {
		let hash = location.hash,
        isfirst = hash.match(/(orgid\=)(.*?)(?=&)/g), 
        orgid, name;
        //首次加载
        if(!isfirst) {
            this.setState({
                isNav: false,
                title: ''
            })
            this.getListData();
        } else {
        	orgid = isfirst[0].split('=')[1];
        	name = hash.match(/(name\=)(.*?)(?=&)/g)[0].split('=')[1]
        	this.setState({
                isNav: true,
                title: name
            })
            this.getList(orgid);
        }
        console.log('我的组织将要插入真实DOM!');
	}
    componentDidMount() {
    	
    	let head1 = 0
        if(document.querySelectorAll('.am-navbar.am-navbar-light')[0]) {
            head1 = document.querySelectorAll('.am-navbar.am-navbar-light')[0].clientHeight;
        }
        let head2 = 0;
        if(document.querySelectorAll('.am-tabs-bar')[0]) {
            head2 = document.querySelectorAll('.am-tabs-bar')[0].clientHeight;
        }
        let h = document.body.clientHeight - head2 - head1;
        this.setState({height: h});
    }
  	componentWillReceiveProps(nextProps) {
        console.log("我的组织在组件接收到一个新的prop时被调用"+nextProps.id+ this.state.id);
    }
	render() {
		
		let arr = this.state.data;
		let newArr = [], nav = '', title =this.state.title;
		if(arr!=[]) {
			arr.forEach((e) => {
				let key = e.id;
				let lowerLevel = e.sublist;
				let lowerArr = [];
				let html = (<div><div className="titleSpan">{e.orgname}</div><div className="markSpan">{e.totlecnt}人</div></div>);
				lowerArr.push(
					<div key={key - 1} className='low'>
						<span className='lowline'></span>
						<List.Item className="superDiv"  onClick={this.getStaffList.bind(this,e.id,e.orgname)}>

							<div className="superOrg">直属成员</div>
							<div className="beizhu">{e.directcnt}人</div>
						</List.Item>
					</div>
				)
				if(e.hassub) {
					lowerLevel.forEach((low) => {
						let key = low.id;
						let isArrow = '';
						if(low.hassub) {
							isArrow = "horizontal";
							lowerArr.push(
								<div key={key} className='low'>
									<span className='lowline'></span>
									<List.Item className="superDiv" arrow={isArrow} onClick={this.getLast.bind(this,low.id,low.orgname)}>
										<div className="superOrg">{low.orgname}</div>
										<div className="beizhu">{low.totlecnt}人</div>
									</List.Item>
								</div>
							)
						} else {
							isArrow = "";
							lowerArr.push(
								<div key={key} className='low'>
									<span className='lowline'></span>
									<List.Item className="superDiv" arrow={isArrow} onClick={this.getStaffList.bind(this,low.id,low.orgname)}>
										<div className="superOrg">{low.orgname}</div>
										<div className="beizhu">{low.totlecnt}人</div>
									</List.Item>
								</div>
							)
						}
						
					})
				}
				newArr.push(
						<Accordion.Panel header={html} className="superTitle" key={key}>
							{lowerArr}
						</Accordion.Panel>
				)
			})
		}
		if (this.state.isNav) {
            nav = (<NavBar mode="light" onLeftClick={this.back}>
                    {title}
                </NavBar>);
        }
    	return (
			<div  className='myorg' style={{ margin: '0 auto', width: '99%', position: 'relative'}}>
				{nav}
				<Accordion defaultActiveKey="0" style={{ height: this.state.height,position: 'relative'}}>
					{newArr}
				</Accordion>
			</div>

    	);
 	}
}
module.exports = Myorg;
//export default Myorg;