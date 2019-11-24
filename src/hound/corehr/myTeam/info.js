import React,{Component} from 'react';
import { Accordion, List, NavBar } from 'antd-mobile';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
import CSS from './info.less';

let name = '';
class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
            height:''
		}
		this.getListData = this.getListData.bind(this);
        this.getTime = this.getTime.bind(this);
        this.staffJob = this.staffJob.bind(this);
        this.getSub = this.getSub.bind(this);
        this.back = this.back.bind(this);
	}
	//初始数据
	getListData() {
		//let	id = Context.getUserinfo().u_staffid;
       //let id = this.props.staffid;
        let hash = location.hash;
        let id = hash.match(/(staffid\=)(.*?)(?=&)/g)[0].split('=')[1];
		let obj = {
			type: 'GET',
			url: 'corehr/myteam/queryJuniorInfoByJuniorStaffId',
			data: {'staffId': id},
			func:(data) => {
                data = JSON.parse(data).data;
				this.setState({
					data: data
				})
			}
		};
		AJAX.ajax(obj);
        
	}
    // 时间转换
    getTime(date,type) {
        if(date) {
            let newDate = new Date(date);
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            month = (month < 10? `0${month}`: month);
            let day = newDate.getDate();
            day = (day < 10? `0${day}`: day);
            return `${year}/${month}/${day}`;
        } else {
            if(type == 'noknow') {
                return '';
            } else if(type == 'begin') {
                return '未知';
            } else if(type == 'end') {
                return '至今';
            }
        }
        
    }
    //点击 展开合起
    staffJob(e) {
        let traget=e.currentTarget.nextSibling;  
        if(traget.style.display=="none"){  
            traget.style.display="";  
        }else{  
            traget.style.display="none";  
        }  
    }
    /**
     * 返回，返回下属列表。可能是组织下，还可能是 首页(根据是否存在orgid)
     * @return {[type]} [description]
     */
    back() {
        history.go(-1);
        // let hash = location.hash,
        // staffid = hash.match(/(staffid\=)(.*?)(?=&)/g)[0].split('=')[1],
        // isname = hash.match(/(name\=)(.*?)(?=&)/g),names;
        // if(isname){
        //     let old = isname[0].split('=')[1];
        //     names.pop();
        //     if(names.length) {
        //         location.hash = `myteam/sub?staffid=${staffid}&name=${names}`;
        //     } else {
        //         location.hash = `myteam/list?staffid=${staffid}`;
        //     }
            
        // } else {
        //     location.hash = `myteam/list?staffid=${staffid}`;
        // }
        //location.hash = `myteam/list?orgid=${orgid}`;
    }
    /**
     * 获取个人信息里面的下属信息
     * @return {[type]} [description]
     */
    getSub(name) {
        let hash = location.hash,
        staffid = hash.match(/(staffid\=)(.*?)(?=&)/g)[0].split('=')[1],names = [];
        //开始压栈姓名
        // if(hash.match(/(name\=)(.*?)(?=&)/g)) {
        //     let old = hash.match(/(name\=)(.*?)(?=&)/g)[0].split('=')[1];
        //     names = names.concat(old);
        //     names = names.concat(name);
        // } else {
        //     //首次压栈，栈为空。
        //     names = names.concat(name);
        // }
        location.hash = `myteam/sub?staffid=${staffid}&name=${name}`;
        name = name;
    }
    componentDidMount() {
    	this.getListData();

        let head = 0;
        if(document.querySelectorAll('.am-navbar.am-navbar-light')[0]) {
            head = document.querySelectorAll('.am-navbar.am-navbar-light')[0].clientHeight
        }
        let height = document.body.clientHeight - head ;
        this.setState({height: height});
    }
	render() {
        // 基础信息
        let photo = '';
        let staff = this.state.data;
        let newStaff = [];
        let sex = '',afterName = '',number = '',staffname = '';
        if(staff) {
            let name = staff.name;
            if(name) {
                afterName = name.substr(name.length-1, 1);
            }
            if(staff.photo) {
                photo = (<img src = {staff.photo} alt='头像'/>);
            } else {
                photo = (<img src = {require('../../../static/common/icon/user.png')} alt='默认头像'/>);
            }
            if(parseInt(staff.subcount)) {
                number = (`下属 ${staff.subcount}`);
                staffname = (<h1>{staff.name}</h1>);
            } else {
                staffname = (<h1 style={{marginTop: '0.68rem'}}>{staff.name}</h1>);
            }
            newStaff.push(
            <div className = "info-panel">
                <div className = "info-photo">{photo}</div>
                <div className = "info-head">
                    {staffname}
                    <h2 onClick={this.getSub.bind(this, staff.name)}>{number}</h2>
                </div>
                <div></div>
            </div>
            )
            sex = staff.sex == 1? '男':'女'
            newStaff.push(
                <div className = "info-panel" key={staff.user_id}>
                    <div className = "info-title"><i></i><span>基本信息</span></div>
                    <ul>
                        <li><span className = "info-item">姓名</span><span>{staff.name}</span></li>
                        <li><span className = "info-item">性别</span><span>{sex}</span></li>
                        <li><span className = "info-item">出生日期</span><span>{this.getTime(staff.birthdate,'noknow')}</span></li>
                        <li><span className = "info-item">办公电话</span><span>{staff.officetel}</span></li>
                        <li><span className = "info-item">手机号</span><span>{staff.mobile}</span></li>
                        <li><span className = "info-item">工作邮箱</span><span>{staff.email}</span></li>
                        <li><span className = "info-item">参加工作日期</span><span>{this.getTime(staff.joinworkdate,'noknow')}</span></li>
                        <li><span className = "info-item">籍贯</span><span>{staff.origin_showname}</span></li>
                        <li><span className = "info-item">最高学历</span><span>{staff.education_showname}</span></li>
                    </ul>
                </div>
            )
        }

        // 任职信息
        let staffJob;
        if(this.state.data) {
            staffJob = this.state.data.staff_job;
        }
		let newStaffJob = [];
        if(staffJob) {
            staffJob.forEach((e) => {
                newStaffJob.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffJob.push(
                    <ul key={e.id}>
                        <li><span className = "info-item">变动类型</span><span>{e.trnstype_showname}</span></li>
                        <li><span className = "info-item">组织</span><span>{e.org_id_showname}</span></li>
                        <li><span className = "info-item">主管</span><span>{e.rptrel_showname}</span></li>
                        <li><span className = "info-item">人员类别</span><span>{e.psncl_id_showname}</span></li>
                        <li><span className = "info-item">职位</span><span>{e.post_id_showname}</span></li>
                        <li><span className = "info-item">职级</span><span>{e.jobgrade_id_showname}</span></li>
                        <li><span className = "info-item">职等</span><span>{e.jobrank_id_showname}</span></li>
                        <li><span className = "info-item">工作地点</span><span>{e.addr_id_showname}</span></li>
                    </ul>
                )
            })
        }

        // 合同协议1：固定期限，2：无固定期限，3：以完成一定工作任务为期限
        let staffCtrt;
        if(this.state.data) {
            staffCtrt = this.state.data.staff_ctrt;
        }
		let newStaffCtrt = [];
        let ctrt = '';
        if(staffCtrt) {
            staffCtrt.forEach((e) => {
                if(e.termtype == 1){
                    ctrt = '固定期限';
                } else if(e.termtype == 2) {
                    ctrt = '无固定期限';
                } else {
                    ctrt = '以完成一定工作任务为期限';
                }
                newStaffCtrt.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffCtrt.push(
                    <ul key={e.id}>
                        <li><span>{ctrt}</span></li>
                        <li><span>{e.majorcorp_id_showname}</span></li>
                    </ul>
                )
            })
        }

        // 学历信息
        let staffEdu;
        if(this.state.data) {
            staffEdu = this.state.data.staff_edu;
        }
		let newStaffEdu = [];
        if(staffEdu) {
            
            staffEdu.forEach((e) => {
                let isprefs = '';
            if(e.isprefs) {
                isprefs = (<span className="isprefs">最高</span>);
            } else {
                isprefs = '';
            }
                newStaffEdu.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffEdu.push(
                    <ul key={e.id}>
                        <li><span>{e.school}</span></li>
                        <li><span>{e.major}</span></li>
                        <li><span>{e.education_showname}</span>{isprefs}</li>
                        <li><span>{e.degree_showname}</span></li>
                    </ul>
                )
            })
        }

        // 工作履历
        let staffResume;
        if(this.state.data) {
            staffResume = this.state.data.staff_resume;
        }
		let newStaffResume = [];
        if(staffResume) {
            staffResume.forEach((e) => {
                newStaffResume.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffResume.push(
                    <ul key={e.id}>
                        <li><span>{e.workcorp}</span></li>
                        <li><span>{e.workpost}</span></li>
                    </ul>
                )
            })
        }

        // 培训记录
        let staffTrain;
        if(this.state.data) {
            staffTrain = this.state.data.staff_train;
        }
		let newStaffTrain = [];
        if(staffTrain) {
            staffTrain.forEach((e) => {
                newStaffTrain.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffTrain.push(
                    <ul key={e.id}>
                        <li><span>{e.content}</span></li>
                        <li><span>{e.hours}学时</span></li>
                        <li><span>{e.score}</span></li>
                    </ul>
                )
            })
        }

        // 绩效记录
        let staffAss;
        if(this.state.data) {
            staffAss = this.state.data.staff_ass;
        }
		let newStaffAss = [];
        if(staffAss) {
            staffAss.forEach((e) => {
                newStaffAss.push(
                    <div className = "info-date">{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffAss.push(
                    <ul key={e.id}>
                        <li><span>{e.assdoc}</span></li>
                        <li><span>{e.rank_showname}</span></li>
                    </ul>
                )
            })
        }

    	return (
        <div style={{ margin: '0 auto', width: '99%', height: document.body.clientHeight,overflow: 'hidden'}} >
            <NavBar mode="light" onLeftClick={this.back}>
              个人信息
            </NavBar>
            <div className = "info" style={{height: this.state.height}}>
               
                {newStaff}
                <div className = "info-panel">
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>任职信息</span></div>
                    <div style={{display: 'none'}}>{newStaffJob}</div>
                </div>
                <div className = "info-panel">
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>合同协议</span></div>
                    <div style={{display: 'none'}}>{newStaffCtrt}</div>
                </div>
                <div className = "info-panel" >
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>学历信息</span></div>
                    <div style={{display: 'none'}}>{newStaffEdu}</div>
                </div>
                <div className = "info-panel">
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>工作履历</span></div>
                    <div style={{display: 'none'}}>{newStaffResume}</div>
                </div>
                <div className = "info-panel">
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>培训记录</span></div>
                    <div style={{display: 'none'}}>{newStaffTrain}</div>
                </div>
                <div className = "info-panel">
                    <div className = "info-title" onClick={this.staffJob}><i></i><span>绩效记录</span></div>
                    <div style={{display: 'none'}}>{newStaffAss}</div>
                </div>
            </div>
        </div>
    	);
 	}
}
module.exports = Info;
//export default Info;