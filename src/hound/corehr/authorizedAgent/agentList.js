import React,{Component} from 'react';
// import { PropTypes } from 'react-router'
import {ListView, NavBar, Icon,List,Toast } from 'antd-mobile';
import AJAX from '../../../util/ajax';
import './index.less';
import Context from '../../../util/context';
let classNames = require('classnames');
const Item = List.Item;
const Brief = Item.Brief;

let index = 0;
let dataArr;
let NUM_ROWS = 0;
let data = [];
let pageIndex = 0;
let start = 0;
let total = 0;

//创建数据
const createData = (pIndex = 0) => {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}
dataArr = createData();

class AgentList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            content: '',
            data: data,
            ds: ds,
            rData: createData(),
            cHeight: null,
            dataSource: ds.cloneWithRows(dataArr),
            isLoading: 1
        }
        this.addAgent = this.addAgent.bind(this);
        this.goBack = this.goBack.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.clickHander = this.clickHander.bind(this);
        this.getHiddenInput = this.getHiddenInput.bind(this);
        this.getListData = this.getListData.bind(this);
        this.onEndReach = this.onEndReach.bind(this);
    }
    componentDidMount() {
        this.getListData();
    }
    getListData(){
      Toast.loading('加载中...', 0, () => {
          console.log('加载完成!!!');
      });
      let obj = {
          type: 'GET',
          url: 'ssc/agent/getAgentsByCondition',
          data: {
              "start": start,
              "size":10,
              "userId": Context.getUserinfo().u_usercode
                  // "categoryId":categoryId,
                  // "agentUserId":agentUserId
          },
          func: (dataarr) => {
                Toast.hide();
                if(!JSON.parse(dataarr).data){console.error('无数据');return;}
                data = data.concat(JSON.parse(dataarr).data.data);
                total = JSON.parse(dataarr).data.total;
                console.log('data',data.length)
                NUM_ROWS = data.length;
                index = NUM_ROWS - 1;

                if (NUM_ROWS) {
                    index = NUM_ROWS - 1;
                    dataArr = createData();
                    if (start == (total - total % 10)) {
                        start += 10;
                        this.setState({
                            data: data,
                            isLoading: 0,
                            dataSource: this.state.ds.cloneWithRows(dataArr),
                            content: data,
                            cHeight: document.body.clientHeight -
                                document.querySelectorAll('.am-navbar.am-navbar-light')[0].offsetHeight
                        })
                    } else {
                        start += 10;
                        this.setState({
                            data: data,
                            isLoading: 1,
                            dataSource: this.state.ds.cloneWithRows(dataArr),
                            content: data,
                            cHeight: document.body.clientHeight -
                                document.querySelectorAll('.am-navbar.am-navbar-light')[0].offsetHeight
                        })
                    }
                } else {
                    data = data.concat(data);
                    this.setState({
                        data: data,
                        isLoading: 2,
                        dataSource: this.state.ds.cloneWithRows(dataArr),
                        content: data,
                        cHeight: document.body.clientHeight -
                            document.querySelectorAll('.am-navbar.am-navbar-light')[0].offsetHeight
                    })
                }
            }
        };
        if (start <= (total - total%10)){
            AJAX.ajax(obj);
        }
    }
    componentWillUnmount() {
        dataArr = '';
        //请求结束 清空
        start = 0;
        data = [];
        total = 0;
    }
    goBack(e) {
        // e.stopPropagation();
        this.context.router.goBack();
    }
    getHiddenInput(parent) {
        let hiddenInput = parent.getElementsByTagName('input')[0];
        return hiddenInput;
    }
    clickHander(e) {
        if (new RegExp(/enabled/g).test(e.currentTarget.children[0].className)) return;
        let data = this.getHiddenInput(e.currentTarget);
        let id = data.dataset.id;
        let agentUserId = data.dataset.agentuserid;
        let agentUserId_name = data.dataset.agentuserid_name;
        let categoryId = data.dataset.categoryid;
        let categoryId_name = data.dataset.categoryid_name;
        let userId = data.dataset.userid;
        let userId_name = data.dataset.userid_name;
        let createTime = data.dataset.createtime;
        let modifyTime = data.dataset.modifytime;

        let obj = `{"id":"${id}","agentUserId":"${agentUserId}",
                  "agentUserId_name":"${agentUserId_name}",
                  "categoryId":"${categoryId}",
                  "categoryId_name":"${categoryId_name}",
                  "userId":"${userId}",
                  "userId_name":"${userId_name}",
                  "modifyTime":"${modifyTime}",
                  "createTime":"${createTime}"}`;
        localStorage.setItem('agentList', obj)
        location.hash = `agent/edit?storage=true`;
    }
    addAgent() {
        //根据是否为localstorage读取本地数据
        location.hash = `agent/edit?storage=false`
            //TODO:bug
            // this.context.router.push('/agent/edit')
    }
    formatDate(date) {
        let y = new Date(date).getFullYear(),
            m = new Date(date).getMonth() + 1,
            d = new Date(date).getDate();
        return `${y}/${m}/${d}`;
    }
    onEndReach(event){
      if(start<=total-total%10){
        if(event && event.type == 'touchend'){
            this.getListData();
        }
      }else{
        return;
      }
    }
    render(){
        {Context.init()}
        const separator = (sectionID, rowID) => (
          <div key={`${sectionID}-${rowID}`} style={{
            backgroundColor: '#F5F5F9',
            height: 0,
            borderTop: '0',
            borderBottom: '0',
          }}
        />);
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = this.state.data.length - 1;
          }
          // const obj = this.state.data[index--];
          let cont = this.state.data[index--];
           const contItem = [];
           if(cont){
              let categoryId_name = cont.categoryId_name||'全部流程';
              let userId_name = cont.userId_name||Context.getUserinfo().u_username;
              let agentUserId_name = cont.agentUserId_name||cont.name;
              let createTime = this.formatDate(cont.startTime);
              let modifyTime = cont.endTime?('-'+this.formatDate(cont.endTime)):'';
              let now = new Date().getTime();
              let enable = classNames({ 'enabled': (now - new Date(modifyTime).getTime() > 0 ) })
              contItem.push(
                  <Item className={enable}  key={index} extra={categoryId_name} multipleLine>{userId_name}→{agentUserId_name}<Brief>{createTime}{modifyTime}</Brief>
                    <input className="hiddenInput" type="hidden" 
                            data-id={cont.id} 
                            data-agentuserid = {cont.agentUserId}
                            data-agentuserid_name = {cont.agentUserId_name}
                            data-categoryid = {cont.categoryId}
                            data-categoryid_name = {categoryId_name}
                            data-userid = {cont.userId}
                            data-userid_name = {userId_name}
                            data-createtime = {createTime}
                            data-modifytime = {modifyTime}
                    />
                  </Item>
              );
          }

          return (
            <div key={rowID}
              style={{
                // padding: '1px 16px',
                backgroundColor: 'white',
              }}
              onClick = {this.clickHander}
            >
              {contItem}
            </div>
          );
        };
        
        return (
          <div className="agentList">

            <NavBar leftContent="" mode="light" onLeftClick={Context.cback} rightContent="新增" onClick={this.addAgent}>授权记录</NavBar>
            <ListView
              dataSource={this.state.dataSource}
              renderHeader={() => {}}
              renderFooter={() => <div style={{ padding: 6, textAlign: 'center' }}>
                {(this.state.isLoading == 1) ? '上拉加载...' : (this.state.isLoading == 0) ? '加载完成' : '无相应记录'}
              </div>}
              renderRow={row}
              renderSeparator={separator}
              className="fortest"
              style={{ height: this.state.cHeight, overflow: 'auto', border: '1px solid #ddd',  }}
              onScroll={() => { console.log('scroll'); }}
              pageSize={4}
              scrollRenderAheadDistance={500}
              scrollEventThrottle={20}
              onEndReached={this.onEndReach}
              onEndReachedThreshold={10}
            />
          </div>);
    }
}
AgentList.contextTypes = { 
  // history: PropTypes.history,
  router: React.PropTypes.object.isRequired
}

module.exports = AgentList;