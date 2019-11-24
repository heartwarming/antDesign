import React,{Component} from 'react';
import { createForm } from 'rc-form';
import { Popup,DatePicker,List,NavBar,ActionSheet, Button, Toast } from 'antd-mobile';
import SearchAuthor from './search';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
let classNames = require('classnames');
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps, clickStatus = false;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class AuthorizedAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clicked: '全部流程',
            startDate: null, //开始日期
            endDate: null, //结束日期
            storeBtnInfo: null,
            btnArr: null,
            btnID: null, //授权范围
            agentID: null, //代理人id
            agent: "必选", //代理人姓名
            sel: '',
            clickStatus: false //保存按钮默认点击状态
        }
        this.showActionSheet = this.showActionSheet.bind(this);
        this.getButtonData = this.getButtonData.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getSearchData = this.getSearchData.bind(this);
        this.linkToSearch = this.linkToSearch.bind(this);
        this.listenClickStatus = this.listenClickStatus.bind(this);
    }
    onClick() {
            Popup.show( 
              <SearchAuthor getSearchData = { this.getSearchData } />
            );
        }
        //获取点击部门或搜索数据
    getSearchData(e) {
        this.setState({
            agentID: e.id, //代理人id
            agent: e.name, //代理人姓名
        });

        this.listenClickStatus();
    }
    onClose(sel) {
        Popup.hide();
    }
    getButtonData() {
        Toast.loading('加载中...', 0, () => {
            console.log('加载完成!!!');
        });
        let obj = {
            type: 'GET',
            url: '/ssc/category/queryByLevel',
            data: {
                "level": 2
            },
            func: (data) => {
                Toast.hide()
                let getData = JSON.parse(data).data;
                let btnarr = [];
                btnarr.push('全部流程')
                getData.forEach(function(v, k) {
                    btnarr.push(v['name']);
                })
                btnarr.push('取消');
                this.setState({
                    storeBtnInfo: getData,
                    btnArr: btnarr
                });
            }
        };
        AJAX.ajax(obj);
    }
    componentDidMount() {
        this.getButtonData();
        if (location.hash.match(/(?:storage=)(.*)&/) && location.hash.match(/(?:storage=)(.*)&/)[1] === 'true') {
            let obj = JSON.parse(localStorage.getItem('agentList'));
            let {
                getFieldProps
            } = this.props.form;
            this.props.form.setFieldsValue({
                date1: moment(obj.createTime.replace(/\//g, '-'))
            });
            if (obj.modifyTime) {
                this.props.form.setFieldsValue({
                    date2: moment(obj.modifyTime.replace(/\//g, '-'))
                });
            }
            this.setState({
                id: obj.id,
                btnID: obj.categoryId,
                clicked: obj.categoryId_name,
                agent: obj.agentUserId_name,
                agentID: obj.agentUserId

            })
        }
    }
    componentWillUpdate(nextProps, nextState) {
        this.listenClickStatus(nextState);
    }
    componentWillUnmount() {
        this.setState({
            clicked: '全部流程',
            startDate: null, //开始日期
            endDate: null, //结束日期
            storeBtnInfo: null,
            btnArr: null,
            btnID: null, //授权范围
            agentID: null, //代理人id
            agent: "必选", //代理人姓名
            sel: '',
            clickStatus: false //保存按钮默认点击状态
        });
    }
    showActionSheet() {
        const BUTTONS = this.state.btnArr;
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                title: '',
                maskClosable: true,
                'data-seed': 'logId',
                // wrapProps,
            },
            (buttonIndex) => {
                if (BUTTONS[buttonIndex] == '取消')
                    return;
                else
                    console.log(buttonIndex)
                let index = buttonIndex - 1;
                this.setState({
                    btnID: index < 0 ? '' : this.state.storeBtnInfo[index]['id'],
                    clicked: BUTTONS[buttonIndex]
                });
                this.listenClickStatus();
            });
    }
    listenClickStatus(nextState) {
        let {
            getFieldProps
        } = this.props.form;
        let startDate = getFieldProps('date1')['value'] || '',
            btnID = this.state.btnID || nextState && nextState.btnID,
            agent = this.state.agent || nextState && nextState.agent,
            agentID = this.state.agentID || nextState && nextState.agentID;
        if (startDate._isValid && agentID) {
            clickStatus = true;
        }
    }
    saveForm() {
        let {
            getFieldProps
        } = this.props.form;
        let startDate, endDate;
        if (getFieldProps('date1')['value'])
            startDate = getFieldProps('date1')['value'].format('YYYY-MM-DD');
        this.setState({
            startDate: startDate
        });
        if (getFieldProps('date2')['value'])
            endDate = getFieldProps('date2')['value'].format('YYYY-MM-DD');
        this.setState({
            endDate: endDate
        });
        let param = {};
        param.startTime = startDate ? new Date(startDate).getTime() : new Date(this.state.startDate).getTime() || '';
        param.endTime = endDate ? new Date(endDate).getTime() : new Date(this.state.endDate).getTime() || '';
        param.categoryId = this.state.btnID;
        param.agentUserId = this.state.agentID; //代理人id
        param.agent = this.state.agent; //代理人名字
        param.name = this.state.agent;
        param.agentUserId_name = this.state.agent;
        param.userId_name = Context.getUserinfo().u_username
        param.userId = Context.getUserinfo().u_usercode; //被代理人id
        let obj;
        Toast.loading('加载中...', 0, () => {
            console.log('加载完成!!!');
        });
        if (location.hash.match(/(?:storage=)(.*)&/) && location.hash.match(/(?:storage=)(.*)&/)[1] === 'true') {
            param.enable = true;
            param.id = this.state.id;
            obj = {
                type: 'POST',
                url: 'ssc/agent/update',
                data: param,
                func: (data) => {
                    Toast.hide()
                        // location.hash=`agent/list?userId=${param.userId}&categoryId=${param.categoryId}&agentUserId=${param.agentUserId}`;
                        // this.context.history.pushState(null, `/agent/list?userId=${param.userId}&categoryId=${param.categoryId}&agentUserId=${param.agentUserId}`)
                    this.context.router.push(`/agent/list`)
                }
            };
        } else {
            obj = {
                type: 'POST',
                url: 'ssc/agent/insert',
                data: param,
                func: (data) => {
                    Toast.hide()
                        // location.hash=`agent/list?userId=${param.userId}&categoryId=${param.categoryId}&agentUserId=${param.agentUserId}`;
                        // this.context.history.pushState(null, `/agent/list?userId=${param.userId}&categoryId=${param.categoryId}&agentUserId=${param.agentUserId}`)
                    this.context.router.push(`/agent/list`)
                }
            };
        }

        AJAX.ajax(obj);

    }
    linkToSearch() {
        this.context.router.goBack();
    }
    render() {
      {Context.init()}
      const { getFieldProps } = this.props.form;
      let click = classNames({ 'disabled':!clickStatus,'enabled':clickStatus  });
      return (
        <div>
          <NavBar leftContent="" mode="light" onLeftClick={Context.cback}>
            授权代理人
          </NavBar>
          <List>
           <List.Item extra={Context.getUserinfo().u_username} arrow="empty">委托人</List.Item>
            <DatePicker
              mode="date" extra="必选"
              {...getFieldProps('date1', {initialValue: '',})}>
             <List.Item arrow="horizontal">开始时间</List.Item>
           </DatePicker>
          <DatePicker mode="date" extra="非必选" {...getFieldProps('date2', {initialValue: '',})}>
            <List.Item arrow="horizontal">结束时间</List.Item>
          </DatePicker>
           <List.Item extra={this.state.agent} arrow="horizontal" onClick={this.onClick}>代理人
           </List.Item>
           <List.Item extra={this.state.clicked} arrow="horizontal" onClick={this.showActionSheet}>授权范围</List.Item>
        </List>
        <div style={{ margin: '0',position:'absolute',width:'100%',bottom:'0' }}>
          <Button className={click} type="primary" onClick={this.saveForm}>保存</Button>
        </div>
        </div>);
      }
  }
AuthorizedAgent.contextTypes = { router: React.PropTypes.object.isRequired }
AuthorizedAgent = createForm()(AuthorizedAgent);
// export default AuthorizedAgent;
module.exports = AuthorizedAgent;
