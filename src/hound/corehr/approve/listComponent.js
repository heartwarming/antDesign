import React,{Component} from 'react';
import { ListView, SearchBar, RefreshControl } from 'antd-mobile';
import CSS from './index.less';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
//设置空的数据源。否则初次循环list为空会报错
window.data = [];
let index = 0;
let NUM_ROWS = 0;
let dataArr;
let data0 = [];
//发送请求，存储的关键字段
let start = 0;
let arr = [];
let total = 0;
let condition = '';
let taskFlag = 'todo';
//存储 可视敞口高度
let client = document.body.clientHeight;
const dataData = (pIndex = 0) => {
    const dataBlob = {};
    for(let i = 0; i<NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}
dataArr = dataData();
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});
class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataSource.cloneWithRows(dataArr),
            ds: dataSource,
            rData : dataData(),
            isLoading: '',
            data: data0,
            height: '',
            isSearch: false,
            refreshing: false,
        };
        this.formatTime = this.formatTime.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.search = this.search.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getList = this.getList.bind(this);
        this.getHeight = this.getHeight.bind(this);
       // this.toIcon = this.toIcon.bind(this);
    }
    
    componentWillMount() {
       // console.log('我的下属将要插入真实DOM!');  
    }
    componentDidMount() {
        //每次进来。比如说 路由
        start = 0;
        arr = [];
        total = 0;
        condition = '';
        taskFlag = 'todo';
        this.getList(true);
        console.log('我的下属已经插入真实DOM!');
        //console.log('gaodu'+ document.querySelectorAll('.am-tabs-content.am-tabs-content-animated')[0].clientHeight);
    }
    componentWillUpdate(prevProps, prevState) {
        //console.log('我的下属将要更新!');
    }
    componentDidUpdate(prevProps, prevState) {
       //console.log('我的下属更新完!'+this.state.height);
    }
    componentWillReceiveProps(nextProps) {
        //tab切换引起
        if(nextProps.list){
           
            start = 0;
            arr = [];
            total = 0;
            condition = '';
            if(nextProps.list.tab == 1){
                taskFlag = 'todo';
            } else {
                taskFlag = 'his';
            }
            //模拟初次进来的样子，否则拉长页面之后再进来，还是在下面区域
            index = 0
            NUM_ROWS = 0;
            //清空 data
            this.setState({
                data: [],
                height: '',
                dataSource: dataSource.cloneWithRows(dataArr),
                ds: dataSource,
                rData : dataData(),
                isSearch: false});
            this.getList(true);
        }
    }
    // componentWillUnmount() {
    //     console.log('我的下属将要移除');
    // }
    /**
     * 上拉加载
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    onEndReached(event) {
        //console.log('reach end', event);
        if(event && event.type == 'touchend'){
            this.getList(false);
        }
    }
    /**
     * 下拉出现搜索框
     * @return {[type]} [description]
     */
    onRefresh() {
        this.setState({ refreshing: true });
        setTimeout(() => {
          //this.initData = [`ref${pageIndex++}`, ...this.initData];
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr),
            refreshing: false,
            isSearch: true
          });
        }, 500);
    }
    /**
     * 发请求；取全局参数。和tab状态是 父组件传来的props:todo还是his
     */
    getList(arg) {
        console.log('此时tab状态'+taskFlag+'起始长度'+start);
        
        let obj = {
            type: 'GET',
            url: 'ssc/task/queryTasks',
            data: {'start': start,
                    'size': 10,
                    'taskFlag': taskFlag,
                    'condition': condition
                    },
            func:(data)=>{
                data = JSON.parse(data).data;
                if(data){
                    total = data.total;
                    let length = data.data.length;
                    if(length) {
                        
                        arr = arr.concat(data.data);
                        NUM_ROWS = arr.length;
                        index = NUM_ROWS - 1;
                        dataArr = dataData();
                        if(start == (total - total%10)) {
                            start += 10;
                            this.setState({
                                data: arr,
                                isLoading: '加载完成',
                                dataSource: this.state.ds.cloneWithRows(dataArr),
                                height: this.getHeight()
                            });
                            //请求结束 清空
                            
                        } else if(start < (total - total%10)) {
                            start += 10;
                            this.setState({
                                data: arr,
                                isLoading: '上拉加载...',
                                dataSource: this.state.ds.cloneWithRows(dataArr),
                                height: this.getHeight()
                            });
                        } 
                    } else {
                        arr = arr.concat(data.data);
                        this.setState({
                            data: arr,
                            isLoading: '无相应记录',
                            dataSource: this.state.ds.cloneWithRows(dataArr),
                            height: this.getHeight()
                        });
                    }
                    this.hideLoading(); 
                    //让listview 回到顶部。去掉了外层div高度。给listview加上了 overflow； auto
                    if(arg) {
                        //在tab切换，搜索，取消搜索。回到top为0 的状态。但是 上拉下载不回
                        document.querySelectorAll('.am-list.am-list-view-scrollview')[0].scrollTop = 0;
                    } 
                } else {
                    //300
                    this.hideLoading();
                    this.setState({
                        data: [],
                        isLoading: '请稍后重试...',
                        dataSource: this.state.ds.cloneWithRows(dataArr),
                        height: this.getHeight()
                    });
                }
            }
        };    
          
        if (start <= (total - total%10)){
            this.showLoading(); 
            AJAX.ajax(obj);
        } 
    }
    /**
     * 根据输入框 focus 改变的值 传给父组件。不为空的情况下请求
     * @param  {[type]} searchValue [description]
     * @return {[type]}             [description]
     */
    search(searchValue) {
        console.log(searchValue);
        //清空原本的。并且不为空
        if(searchValue.trim()){
            start = 0;
            arr = [];
            total = 0;
            condition = searchValue;
            this.getList(true);
        }
        
    }
    /**
     * 取消搜索，此时value为空，重新刷新页面。10条数据来填充
     * @return {[type]} [description]
     */
    cancel() {
        start = 0;
        arr = [];
        total = 0;
        condition = '';
        this.getList(true);
    }
    /**
     * 将时间转为 YYYY-MM -DD
     * @param  {[type]} date [description]
     * @return {[type]}      [description]
     */
    formatTime(date) {
        if(date) {
            let newDate = new Date(date);
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            month = (month < 10? `0${month}`: month);
            let day = newDate.getDate();
            day = (day < 10? `0${day}`: day);
            return `${year}-${month}-${day}`;
        } else {
            return '';
        }
        
    }
    /**
     * 先获取可是高度，减去navbar 和 tab 切换的高度
     * @return {[type]} [description]
     */
    getHeight() {
        //高度
        let head1 = 0
        if(document.querySelectorAll('.am-navbar.am-navbar-light')[0]) {
            head1 = document.querySelectorAll('.am-navbar.am-navbar-light')[0].clientHeight;
        }
        let head2 = 0;
        if(document.querySelectorAll('.am-tabs-bar')[0]) {
            head2 = document.querySelectorAll('.am-tabs-bar')[0].clientHeight;
        }
        let head3 = 0;
        if(document.querySelectorAll('.am-search')[0]) {
            head3 = document.querySelectorAll('.am-search')[0].clientHeight;
        }
        let h = client - head2 - head1 - head3;
        return h;
    }
    /**
     * ajax 加载动画
     * @return {[type]} [description]
     */
    showLoading() {
        let htmlStr = `<div class="waiting"><img src=${require('../../../static/myteam/loading.gif')} /><span>正在加载...</span></div>`;
        document.body.appendChild(this.makeDom(htmlStr));

        htmlStr = `<div class="backdrop"></div>`;
        document.body.appendChild(this.makeDom(htmlStr));
    }
    /**
     * 生成一个div
     * @return {[type]} [description]
     */
    makeDom(html) {
        let div = document.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }
    /**
     * 加载成功隐藏
     * @return {[type]} [description]
     */
    hideLoading() {
        let divs = document.querySelectorAll('.waiting,.backdrop');
        for(let i=0,len=divs.length; i<len; i++) {
            document.body.removeChild(divs[i]);
        }
    }
    /**
     * 根据流程
     * @param  {[type]} arg [流程id后8位]
     * @return {[type]}     [description]
     */
    toIcon(arg) {
        let icon,cid;
        if(arg) {
            cid = arg.slice(8)
            switch(cid){
                case '032000010501':
                case '032000010502':
                    icon='dimission';
                    break;
                case '032000010101':
                case '032000010102':
                case '032000010103':
                    icon='entry';
                    break;
                case '032000000301':
                    icon='kzm';
                    break;
                case '032000000302':
                    icon='qa';
                    break;
                case '032000000401':
                    icon='leave';
                    break;
                case '032000000402':
                    icon='attend';
                    break;
                case '032000000403':
                    icon='attendout';
                    break;
                default:
                    icon='message';
            }
        } else {
            icon='message';
        }
        return require(`../../../static/common/icon/${icon}.png`);
    }
    /**
     * 输出组件
     * @return {[type]} [description]
     */
    render() {
        console.log(this.state.data);
        console.log(this.props.list.tab);
        let list = '';
        let i = 0;
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`}/>
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                //index = this.state.data.length - 1;
            }
            const obj = this.state.data[i++];
            console.log('index'+i);
            if(obj) {
                let cname = (obj.processInstanceName)?(obj.processInstanceName).split("_")[0]:"";
                let procename = obj.getProcessStateName ? obj.getProcessStateName : '审批中';
                list = (<div className='list'>
                            <span className='icon'><img src={this.toIcon(obj.categoryID)}/></span>
                            <div className='right-list'>
                                  <p className='p-name'>{cname}的{obj.categoryName}
                                    <a className='tel'>{this.formatTime(obj.startTime)}</a>
                                  </p>
                                  <div className='div-job' style={{color: taskFlag=='todo'?'#FCA609': '#A9A9A9'}}>
                                    {taskFlag=='todo'? '待审批':`审批完成(${procename})`}
                                  </div>
                            </div>
                        </div>);
            } else {
                console.log('no');
            }
            return (
                <div key={rowID} 
                  style={{
                    padding: '0 15px',
                    marginTop: '3px',
                    backgroundColor: 'white',
                  }}
                >
                {list}
                </div>
            );
        }

        return (<div style={{ margin: '0 auto', width: '99%', overflow: 'auto'}} className='listCom'>
          <Search isSearch={this.state.isSearch} search={this.search} cancel={this.cancel}/>
          <ListView
            dataSource={this.state.dataSource}

            renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading}
             { /*{(this.state.isLoading == 1) ? '上拉加载...' : (this.state.isLoading == 0) ? '加载完成' : '无相应记录'}*/}
            </div>}
            style = {{height: this.state.height}}
            renderRow={row}
            renderSeparator={separator}
            className="am-list"
            
            pageSize={4}
            scrollRenderAheadDistance={500}
            scrollEventThrottle={20}
            onScroll={() => { }}
            
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={10}
            refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />}

          />
        </div>);
    }
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            value: ''
        }
        this.onChange = this.onChange.bind(this);
        this.clear = this.clear.bind(this);
       // this.toSearch = this.toSearch.bind(this);
    }
    onChange(value) {
        this.setState({ value: value });
        this.props.search(value);
    }

    clear() {
        this.setState({ value: '' });
        this.props.cancel();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isSearch: nextProps.isSearch
        });
    }
    render() {
        if(this.state.isSearch) {
            return (<div>
                <SearchBar
                    value={this.state.value}
                    placeholder="搜索"
                    onSubmit={(value) => console.log(value, 'onSubmit')}
                    onClear={this.clear}
                    onFocus={this.toSearch}
                    onBlur={() => console.log('onBlur')}
                    showCancelButton
                    onChange={this.onChange}
                />
            </div>);
        } else {
            return null;
        }
    }
}
export default ListComponent;