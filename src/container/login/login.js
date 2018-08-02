import React from 'react';
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace, Button, InputItem } from 'antd-mobile';
class Login extends React.Component{
    handleRegister = () => {
        console.log(this.props);
        this.props.history.push({pathname: '/register'});
    }
    render(){
        return (
            <div>
                <Logo />
                <WingBlank />
                <InputItem>用户名</InputItem>
                <WingBlank />
                <InputItem>密码</InputItem>
                <WhiteSpace />
                <Button type="primary">登录</Button>
                <WhiteSpace />
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Login;