/**
 * Created by weishuping on 2016/12/12.
 */
import React,{Component} from 'react';
import { NavBar, Tabs, WhiteSpace, ListView  } from 'antd-mobile';
import ListComponent from './listComponent.js';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
import CSS from './index.less';

const TabPane = Tabs.TabPane;
class ApproveList extends Component{
    constructor(props){
        super(props);
        this.state = {
        	isTab: true,
        }
    }
    
    render() {
        return (
            <div className='appove-tab' style={{height: document.body.clientHeight, overflow: 'hidden'}}>
	            <NavBar mode="light" onLeftClick={() => console.log('onLeftClick')}>
	            我审批的
	            </NavBar>
	            <TabTitle isTab={this.state.isTab}/>
    		</div>
        );
    }
}

class TabTitle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			tabOne: 1,
			isLoading: 1,
			condition: ''
		}
		this.callback = this.callback.bind(this);
		// this.getTodo = this.getTodo.bind(this);
		// this.search = this.search.bind(this);
		// this.cancelSearch = this.cancelSearch.bind(this);
	}
	callback(tabkey) {
		if(tabkey == 1) {
	    	this.setState({tabOne: 1});
	    } else {
	    	this.setState({tabOne: 2});
	    }
	}
	componentWillMount() {
		
	}
	componentDidMount() {
	 	console.log('我是tab');
	}
	componentWillUpdate(prevProps, prevState) {
        //console.log('我的tab将要更新!'+this.state.tabOne);
    }
    componentDidUpdate(nextProps, nextState) {
       //console.log('我的tab更新完!'+this.state.tabOne);
    }
	
	render() {
		const showTab = this.props.isTab;
		if(showTab) {
			return (
				<div className='tab-title'>
					<Tabs defaultActiveKey="1" onChange={this.callback} style={{overflow: 'auto'}}>
						<TabPane tab="待我审批的" key="1">
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								
							</div>
						</TabPane>
						<TabPane tab="我已审批的" key="2">
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
								
							</div>
						</TabPane>
					</Tabs>
					<ListComponent list={{tab:this.state.tabOne}} />
					<WhiteSpace />
				</div>
			);
		} else {
			return null;
		}
	}
}

module.exports = ApproveList;
