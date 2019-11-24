import React,{Component} from 'react'
import { ListView,NavBar } from 'antd-mobile';
import AJAX from '../../../util/ajax';
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


class SearchModle extends Component{
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
        isLoading: false,
        name:this.props.searchName
      }
      this.linktoIndex = this.linktoIndex.bind(this);
      this.clickHander = this.clickHander.bind(this);
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        this.setState({
            cHeight: document.querySelectorAll('.am-popup.am-popup-slide-down')[0].clientHeight -
                document.querySelectorAll('.am-navbar.am-navbar-light')[0].clientHeight
        })
    }
    componentWillUnmount() {
      dataArr='';
    }
    componentWillReceiveProps(nextProps) {
       if(nextProps.searchName!=this.state.name){
        this.setState({name:nextProps.searchName});
        let obj = {
            type: 'GET',
            url: '/search/highlight/staff',
            data: {
                "keyword":nextProps.searchName,
                "pageSize":5,
                "pageNum":1,
                "sord":"desc"
            },
            flag: true,
            func: (e) => {
                data = JSON.parse(e).data.content;
                NUM_ROWS = data.length;
                index = NUM_ROWS - 1;
                dataArr = createData();
                this.setState({
                    data: data,
                    dataSource: this.state.ds.cloneWithRows(dataArr)
                })
            }
        };
        console.log(obj)
        AJAX.ajax(obj);
      }
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
        let name = (obj&&obj.entity)?obj.entity.name:'';
        let deptname = (obj&&obj.entity)?obj.entity.orgname:'';
        let staff_id = (obj&&obj.entity)?obj.entity.id:'';
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
            <div style={{ display: '-webkit-box', display: 'flex' }}>
              {deptname}
            </div>
          </div>
        );
      };
      return (<div style={{ margin: '0 auto', width: '96%' }}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => <span>姓名及部门</span>}
          renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : ''}
          </div>}
          renderRow={row}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: this.state.cHeight,
            overflow: 'auto',
            border: '1px solid #ddd',
            margin: '10px 0',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
        />
      </div>);
    }
  }
export default SearchModle;