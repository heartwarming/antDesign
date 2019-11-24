import React,{Component} from 'react';
class DangerouslySetInnerHTML extends Component{
    constructor(props){
        super(props);
        this.state={
            html: '我想让它换行显示<br />,我想让它换行显示<br />'
        };
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.html}} ></div>
		);
    }
}
module.exports = DangerouslySetInnerHTML;
