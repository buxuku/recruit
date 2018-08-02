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
    handleChange = (key,v) => {
        this.setState({
            [key]:v
        })
    }
    handleRegister = () => {
        console.log(this.state);
    }
    render(){
        return (
            <div>
                <Logo />
                <WingBlank />
                <InputItem
                    onChange={v=>this.handleChange('user',v)}
                >用户名</InputItem>
                <WingBlank />
                <InputItem
                    type="password"
                    onChange={v=>this.handleChange('pwd',v)}
                >密码</InputItem>
                <InputItem
                    type="password"
                    onChange={v=>this.handleChange('repeatpwd',v)}
                >确认密码</InputItem>
                <RadioItem
                  checked={this.state.type === 'geniu'}
                  onChange={()=>this.handleChange('type','geniu')}
                >牛人</RadioItem>
                <RadioItem
                    checked={this.state.type === 'boss'}
                    onChange={()=>this.handleChange('type','boss')}
                >Boss</RadioItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register;