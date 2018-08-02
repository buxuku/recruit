import React from 'react';
import Logo from '../../component/logo/logo';
import { WingBlank, Button, InputItem, List } from 'antd-mobile';
class Register extends React.Component{
    render(){
        return (
            <div>
                <Logo />
                <WingBlank />
                <InputItem>用户名</InputItem>
                <InputItem>密码</InputItem>
                <Button>登录</Button>
                <Button>注册</Button>
            </div>
        )
    }
}

export default Register;