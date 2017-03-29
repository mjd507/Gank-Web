/**
 * Created by mjd on 2017/3/27.
 */

import React from 'react';
import CallData from  '../../commons/CallData.js';

export default class App extends React.Component {

    handleClick () {
        CallData.getCallData().open(0);
    }


    render() {
        return (
            <div >
                <div style={{background: '#ff0000', height: '300px'}} onClick={this.handleClick}>test</div>
            </div>

        );
    };
}
