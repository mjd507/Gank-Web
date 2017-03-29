/**
 * Created by mjd on 2017/3/28.
 * Description: 页面请求数据时的 toast
 */

import React from "react";
import {render} from 'react-dom';
import '../css/callData.css';
import $ from './Dom.js';

class CallData extends React.Component {

    /**
     * 启动实例
     * CallData.getCallData();
     */
    static getCallData = function () {
        if (!CallData.instance) {
            let dom = $('#callData');
            if (dom === null) {
                dom = document.createElement('div');
                dom.className = 'callData';
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
            setTime: 2000, //默认吐司显示 2s
            display: 'none', //默认不显示
            status: 0, //默认状态为 0
            className: 'callData'
        };
        this.timeOuter = null;
    }

    /**
     * 显示吐司
     */
    open(status) {
        this.setState({
            setTime: 2000,
            display: 'block',
            status: status,
            className: 'callData'
        });
        this.handleTimeout();
    }

    handleTimeout() {
        if (this.state.setTime > 0) {
            if (this.timeOuter) {
                clearTimeout(this.timeOuter);
            }
            this.timeOuter = setTimeout(function () {
                this.close();
            }, this.state.setTime);
        }
    }

    /**
     * 关闭吐司
     */
    close() {
        this.setState({
            setTime: 0,
            display: 'none',
            status: 0,
            className: 'callData'
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