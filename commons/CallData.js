/**
 * Created by mjd on 2017/3/28.
 * Description: 页面请求数据时的 toast
 */

import React from "react";
import {render} from 'react-dom';
import  '../css/callData.css';
import $ from './Dom.js';

class CallData extends React.Component {

    static getCallData() {
        if (!CallData.instance) {
            let dom = $('#calldata');
            if (!dom) {
                dom = document.createElement('div');
                dom.id = 'calldata';
                document.body.appendChild(dom);
            }
            CallData.instance = render(<CallData />, dom);
        }
        return CallData.instance;
    }


    constructor(props) {
        super(props);
        this.status = ['数据请求中...', '', '网络异常'];
        this.state = {
            setTime: 2000,
            display: 'none',
            status: 0,
            className: 'callData'
        };
        this.timeOuter = null;
    }


    handleOpen(status) {
        this.setState({
            display: 'block',
            status: status,
        });
        this.handleTimeout();
    }

    handleTimeout() {
        if (this.state.setTime > 0) {
            if (this.timeOuter) {
                clearTimeout(this.timeOuter);
            }
            this.timeOuter = setTimeout(()=>{
                this.handleClose();
            }, this.state.setTime);
        }
    }


    handleClose() {
        this.setState({
            display: 'none',
        });
    }

    render() {
        const style = {
            display: this.state.display
        };
        return (
            <div style={style}>
                <div className={this.state.className}>{this.status[this.state.status]}</div>
            </div>
        );
    }

}

export default CallData;