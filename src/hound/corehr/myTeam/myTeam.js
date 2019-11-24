import React,{Component} from 'react';
import { Tabs, WhiteSpace, NavBar, Popup } from 'antd-mobile';
import Subordinate from './subordinate';
import Myorg from './myorg';
import Info from './info';
import CSS from './my.less';
import Context from '../../../util/context';
import AJAX from '../../../util/ajax';
const TabPane = Tabs.TabPane;
let key = '1';
class Myteam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 'left'
		};
		this.callback = this.callback.bind(this);
	}
	callback(tabkey) {
	    if(tabkey == 1) {
	    	key = '1';
	    } else {
	    	key = '2';
	    
	    }
	}
  	render() {
 		//console.log(Context.rf);

        {Context.init()}

    return (
		<div className='myteam' style={{height: document.body.clientHeight, overflow: 'hidden'}} >
			<NavBar mode="light" onLeftClick={Context.cback} iconName={this.state.left}>
			  我的团队
			</NavBar>
			<Tabs defaultActiveKey={key} onChange={this.callback} swipeable={false}>
        		<TabPane tab="我的下属" key="1">
	          		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
	            		<Subordinate />
	          		</div>
	        	</TabPane>
		        <TabPane tab="我的组织" key="2">
			        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			            <Myorg />
			        </div>
		        </TabPane>
      		</Tabs>
			<WhiteSpace />
		</div>
    );
  }
}

module.exports = Myteam;