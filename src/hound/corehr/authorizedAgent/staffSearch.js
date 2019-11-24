import React,{Component} from 'react'
import { ListView,NavBar } from 'antd-mobile';
import AJAX from '../../../util/ajax';
import SearchModle  from './searchModle'
let index=0;
let dataArr;
let NUM_ROWS=0;
let data = [];
let pageIndex = 0;

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


class MenuExample extends Component{
  constructor(props) {
      super(props);
      const ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state = {
        data:data,
        ds:ds,
        rData : createData(),
        cHeight : null,
        dataSource: ds.cloneWithRows(dataArr),
        isLoading: false
      }
      this.linktoIndex = this.linktoIndex.bind(this);
      this.clickHander = this.clickHander.bind(this);
    }
    componentWillMount() {
        let obj = {
            type: 'GET',
            url: '/corehr/staff/queryMyDeptByUserId',
            data: null,
            flag: true,
            func: (e) => {
                data = JSON.parse(e).data;
                NUM_ROWS = data.length;
                index = NUM_ROWS - 1;
                dataArr = createData();
                this.setState({
                    data: data,
                    dataSource: this.state.ds.cloneWithRows(dataArr)
                })
            }
        };
        AJAX.ajax(obj);
    }
    componentDidMount() {

        this.setState({
            cHeight: document.querySelectorAll('.am-popup.am-popup-slide-down')[0].clientHeight -
                document.querySelectorAll('.am-navbar.am-navbar-light')[0].clientHeight
        })
    }
    componentWillUnmount() {
      dataArr = '';
    }
    linktoIndex() {
        this.props.changeFlag();
    }
    clickHander(e){
      let personInfo = e.currentTarget.children;
      let staffName = personInfo[0].innerHTML;
      let staff_id = personInfo[0].dataset.staffid;
      this.props.closePopup({
        name:staffName,
        id:staff_id
      });
    }
    render() {
      const separator = (sectionID, rowID) => (
        <div key={`${sectionID}-${rowID}`} style={{
          backgroundColor: '#F5F5F9',
          height: 1,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />);
      const row = (rowData, sectionID, rowID) => {
        if (index < 0) {
          index = this.state.data.length - 1;
        }
        const obj = this.state.data[index--];
        let name = obj?obj.name:'小柱子';
        let deptname = obj?obj.deptname:'未知数据';
        let staff_id = obj?obj.user_id:'';
        let staff_job_id = obj?obj.staff_job_id:'';
        return (
          <div key={rowID}
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
            }}
            onClick = {this.clickHander}
          >
            <h3 data-staffid={staff_id} style={{ padding: 2, marginBottom: 8, borderBottom: '1px solid #F6F6F6' }}>
              {name}
            </h3>
            <div data-staffjobid={staff_job_id} style={{ display: '-webkit-box', display: 'flex' }}>
              {deptname}
            </div>
          </div>
        );
      };
      return (<div style={{ margin: '0 auto', width: '100%' }}>
        <NavBar leftContent=""  mode="light" onLeftClick={this.linktoIndex}> 我的部门 </NavBar>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => <span>姓名及部门</span>}
          renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完毕'}
          </div>}
          renderRow={row}
          renderSeparator={separator}
          className="fortest"
          style={{ height: this.state.cHeight, overflow: 'auto', border: '1px solid #ddd', margin: '10px 0', }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
        />
      </div>);
    }
  }
export default MenuExample;