/**
 * Created by Administrator on 2016/11/10.
 */
import React,{Component} from 'react';
import Context from '../../../util/context';
import { SearchBar,Grid,NavBar, Icon  } from 'antd-mobile';
import AJAX from '../../../util/ajax';
import Css from './welcome.less';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            bardata:null,
            viewdata:null,
            controldata:null,
            otherdata:null,
            studydemodata:null
        }
        this.onMenuClick = this.onMenuClick.bind(this);
    }
    
    componentDidMount() {
        let bardata = [];
        bardata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'NavBar',url:'bar/nav'});
        bardata.push({icon:require('../../../static/common/icon/rzdt.png'),text:'NoticeBar',url:'bar/notice'});
        bardata.push({icon:require('../../../static/common/icon/rzdt.png'),text:'SearchBar',url:'bar/search'});
        bardata.push({icon:require('../../../static/common/icon/cxz.png'),text:'TabBar',url:'bar/tab'});
        this.setState({bardata:bardata});

        let viewdata = [];
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Accordion',url:'view/accordion'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'ActionSheet',url:'view/action'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Card',url:'view/card'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Drawer',url:'view/drawer'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'DockedDrawer',url:'view/drawer/dock'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'List',url:'view/list'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'ListView',url:'view/listview'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Modal',url:'view/modal'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Menu',url:'view/menu'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Popup',url:'view/popup'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'PopOver',url:'view/popove'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Result',url:'view/result'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Table',url:'view/table'});
        viewdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Toast',url:'view/toast'});
        this.setState({viewdata:viewdata});

        let controldata = [];
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'ActivitiIndicator',url:'control/indicator'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Button',url:'control/button'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'ButtonDemo',url:'control/button/demo'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Badge',url:'control/badge'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Carousel',url:'control/carousel'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'CarouselDemo',url:'control/carousel/demo'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Checkbox',url:'control/checkbox'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Datepicker',url:'control/datepicker'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Imagepicker',url:'control/imagepicker'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'InputItem',url:'control/input'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Pagination',url:'control/page'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Picker',url:'control/picker'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Progress',url:'control/progress'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Radio',url:'control/radio'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'RefreshControl',url:'control/refresh'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Slider',url:'control/slider'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Switch',url:'control/switch'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Stepper',url:'control/stepper'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Step',url:'control/step'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'SwipAction',url:'control/swip'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'SegmentControl',url:'control/segment'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Switch',url:'control/switch'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'TextareaItem',url:'control/textarea'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Tabs',url:'control/tab'});
        controldata.push({icon:require('../../../static/common/icon/ymbot.png'),text:'Tag',url:'control/tag'});
        this.setState({controldata:controldata});

        let otherdata=[];
        otherdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:"Flex",url:'others/flex'});
        otherdata.push({icon:require('../../../static/common/icon/ymbot.png'),text:"Grid",url:'others/grid'});
        this.setState({otherdata:otherdata});

        let studydemodata = [] ;
        studydemodata.push({icon:require('../../../static/common/icon/ymbot.png'),text:"dangerouslySetInnerHTMl",url:'studydemo/DangerouslySetInnerHTMl'});
        this.setState({studydemodata:studydemodata});
    }

    onMenuClick(el, index) {
        location.hash = el.url;
    }

    render() {
        let welcome = <p style={{ padding: 10, color: '#999' }}>欢迎你</p>;
        return (
        	<div>
                <NavBar iconName="bars" leftContent="" mode="light" onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[<Icon key="0" type="logout" onClick={this.logout} />]}>
                </NavBar>

                <SearchBar placeholder="搜索" />

                <div><p style={{ padding: 10, color: '#999',margin:0 }}>UIBars</p></div>
                <Grid data={this.state.bardata} onClick={this.onMenuClick}/>

                <div><p style={{ padding: 10, color: '#999',margin:0 }}>UIViews</p></div>
                <Grid data={this.state.viewdata} onClick={this.onMenuClick}/>

                <div><p style={{ padding: 10, color: '#999',margin:0 }}>UIControls</p></div>
                <Grid data={this.state.controldata} onClick={this.onMenuClick}/>   

                <div><p style={{ padding: 10, color: '#999',margin:0 }}>others</p></div>
                <Grid data={this.state.otherdata} onClick={this.onMenuClick}/>   

                <div><p style={{ padding: 10, color: '#999',margin:0 }}>studydemo</p></div>
                <Grid data={this.state.studydemodata} onClick={this.onMenuClick}/>                          
            </div>
        );
    }
}

module.exports = Welcome;
