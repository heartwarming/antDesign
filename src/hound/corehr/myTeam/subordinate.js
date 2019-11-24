import React,{Component} from 'react';
//import province from 'site/data/province';
import { ListView , NavBar } from 'antd-mobile';
import Info from './info';
import CSS from './my.less';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';

window.data = [];
let index = 0;
let NUM_ROWS = 0;
let pageIndex = 0;
let dataArr;
let data = [];
let color= ['#eead10','#f99a2b','#f38134','#6495ed','#3ab1aa','#0abfb5','#06aae1','#00bfff','#96bc53','#00ced1','#89a8e0'];
const dataData = (pIndex = 0) => {
    const dataBlob = {};
    for(let i = 0; i<NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}
dataArr = dataData();
class Subordinate extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(dataArr),
            ds: dataSource,
            rData : dataData(),
            isLoading: false,
            data: data,
            isNav: false,
            title: '',
            height: ''
        };
       this.getInfo = this.getInfo.bind(this);
       this.back = this.back.bind(this);
    }
    getList(arg) {
        let id = arg;
        console.log('重新请求'+arg);
        let obj = {
            type: 'GET',
            url: 'corehr/myteam/queryStaffListByOrgId',
            data: {'orgId': id},
            func:(data)=>{
                data = JSON.parse(data).data;
                if(data){
                    NUM_ROWS = data.length;
                    index = NUM_ROWS - 1;
                    dataArr = dataData();
                }
                this.setState({
                    data:data,
                    dataSource: this.state.ds.cloneWithRows(dataArr)
                });
                // let h = document.querySelectorAll('.am-tabs-content.am-tabs-content-animated')[0].clientHeight;
                // this.setState({height: h});
            }
        };
        AJAX.ajax(obj);
    }
    getListData(staffid) {
        console.log('chucijiazai ');
        let id = staffid;
        if(id == 'undefined' || id == undefined) {
            id = Context.getUserinfo().u_staffid;
        } else {
            id =staffid
        }
        let obj = {
            type: 'GET',
            url: 'corehr/myteam/queryMyJuniorByStaffId',
            data: {'staffId': id},
            func: (data) => {
                data = JSON.parse(data).data;
                if(data){
                    NUM_ROWS = data.length;
                    index = NUM_ROWS - 1;
                    dataArr = dataData();
                    this.setState({
                        data:data,
                        dataSource: this.state.ds.cloneWithRows(dataArr)
                    });
                }
                
                // let h = document.querySelectorAll('.am-tabs-content.am-tabs-content-animated')[0].clientHeight;
                // this.setState({height: h});
            }
        };
        AJAX.ajax(obj);
    }
    getInfo(arg,name) {
        console.log('人员'+arg);
        //将请求个人信息的id和自身id传过去
        //location.hash=`myteam/psninfo?staffid=${arg}&orgid=${this.props.orgid}`;
        let hash = location.hash, names = [];
        //开始压栈
        if(hash.match(/(name\=)(.*?)(?=&)/g)) {
            // let old = hash.match(/(name\=)(.*?)(?=&)/g)[0].split('=')[1];
            // names = names.concat(old);
            // names = names.concat(name);
            location.hash=`myteam/psninfo?staffid=${arg}&name=${name}`
        } else {
            //首次加载
            location.hash=`myteam/psninfo?staffid=${arg}`;
        }
        //this.props.hideSelf(arg);
    }
    back() {
        history.go(-1);
    }
    componentWillMount() {
        console.log('我的下属将要插入真实DOM!');  
        let hash = location.hash,
        isfirst = hash.match(/(staffid\=)(.*?)(?=&)/g), 
        isorg = hash.match(/(orgid\=)(.*?)(?=&)/g), 
        isname = hash.match(/(name\=)(.*?)(?=&)/g),
        staffid, names, orgid;
        //首次加载
        if(!isfirst) {
            if(!isorg) {
                //首次
                this.setState({
                    isNav: false,
                    title: ''
                })
                this.getListData(staffid);
            } else {
                //组织无下级的下属列表
                let name = isname[0].split('=')[1];
                let newname = name.split(',');
                let title = newname[newname.length-1];
                this.setState({
                    isNav: true,
                    title: title
                })
                orgid = isorg[0].split('=')[1];
                this.getList(orgid);
            }
            
        } else {
            //下属的下属列表
            staffid = hash.match(/(staffid\=)(.*?)(?=&)/g)[0].split('=')[1];
            if(isname) {
                let name = isname[0].split('=')[1];
                // let newname = name.split(',');
                // let title = newname[newname.length-1];
                 this.setState({
                    isNav: true,
                    title: `${name}的下属`
                })
            } else {
                 this.setState({
                    isNav: false,
                    title: ''
                })
            }
            this.getListData(staffid);
        }
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
        //console.log('gaodu'+ document.querySelectorAll('.am-tabs-content.am-tabs-content-animated')[0].clientHeight);
    }
    onEndReached(event) {
        //console.log('reach end', event);
    }
    render() {
        //this.getList(this.props.orgid);
        let list = '', nav = '',title = this.state.title;
        let i = 0;
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`}/>
        );
        
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.data.length - 1;
            }
            const obj = this.state.data[i++];
            if(obj) {
                let name = obj?obj.name:'刘依依';
                let deptname = obj?obj.deptname:'未知数据';
                let nameAfter = name.substr(name.length-2, 2);
                let photo;
                if(obj.photo) {
                    photo = (<span className='photo'><img src = {obj.photo}/></span>);
                } else {
                    photo = (<span style={{  backgroundColor: color[0]}} className='photo'>{nameAfter}</span>);
                }
                color.push(color.shift());
                let m = obj.mobile;
                let jname = '';
                if(obj.jobgradename){
                    jname = `(${obj.jobgradename})`;
                }
                list = (<div className='list'>
                            {photo}
                            <div className='right-list'>
                                <div className='discribe' onClick={this.getInfo.bind(this,obj.staff_id,obj.name)}>
                                  <p className='p-name'>{obj.name}</p>
                                  <div className='div-job'>{obj.postname}{jname}</div>
                                </div>
                                <a className='tel' href={"tel:" + obj.mobile}><img src={require('../../../static/common/icon/phone.png')}/></a>
                            </div>
                        </div>);
            }
            return (
                <div key={rowID} 
                  style={{
                    padding: '0 10px',
                    marginTop: '3px',
                    backgroundColor: 'white',
                  }}
                >
                {list}
                </div>
            );
        }
        if (this.state.isNav) {
            nav = (<NavBar mode="light" onLeftClick={this.back}>
                    {title}
                </NavBar>);
        }
        return (<div style={{ margin: '0 auto', width: '99%', position: 'relative'}} className='subordinate'>
          {nav}
          <ListView
            dataSource={this.state.dataSource}

            renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '加载完毕'}
            </div>}
            style = {{height: this.state.height}}
            quickSearchBarStyle={{
              position: 'absolute',
              top: 20,
            }}
            renderRow={row}
            renderSeparator={separator}
            className="am-list"
            
            pageSize={4}
            scrollRenderAheadDistance={500}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            scrollerOptions={{ scrollbars: false }}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={10}
          />
        </div>);
    }
}
module.exports = Subordinate;
//export default Subordinate;