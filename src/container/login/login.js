import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace, Button, InputItem } from 'antd-mobile';
import Form from '../../component/form/form'
@connect(
    state => state.user,
    {login}
)
@Form
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    handleRegister = () => {
        this.props.history.push({pathname: '/register'});
    }
    handleLogin = () => {
        this.props.login(this.props.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
                <Logo />
                {this.props.msg && <p className="error_msg">{this.props.msg}</p>}
                <WingBlank />
                <InputItem
                    onChange={v=>this.props.handleChange('user',v)}
                >用户名</InputItem>
                <WingBlank />
                <InputItem
                    onChange={v=>this.props.handleChange('pwd',v)}
                >密码</InputItem>
                <WhiteSpace />
                <Button onClick={this.handleLogin} type="primary">登录</Button>
                <WhiteSpace />
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Login;