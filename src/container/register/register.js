import React from 'react';
import Logo from '../../component/logo/logo';
import { WingBlank, WhiteSpace, Radio, Button, InputItem } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'geniu'
        }
    }
    render(){
        return (
            <div>
                <Logo />
                <WingBlank />
                <InputItem>用户名</InputItem>
                <WingBlank />
                <InputItem>密码</InputItem>
                <InputItem>确认密码</InputItem>
                <RadioItem checked={this.state.type === 'geniu'}>牛人</RadioItem>
                <RadioItem checked={this.state.type === 'boss'}>Boss</RadioItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register;