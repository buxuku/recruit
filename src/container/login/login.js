import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace, Button, InputItem } from 'antd-mobile';

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd: ''
        }
    }
    handleRegister = () => {
        console.log(this.props);
        this.props.history.push({pathname: '/register'});
    }
    handleChange = (type,value) => {
        this.setState({
            [type]:value
        })
    }
    handleLogin = () => {
        this.props.login(this.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
                <Logo />
                {this.props.msg && <p className="error_msg">{this.props.msg}</p>}
                <WingBlank />
                <InputItem
                    onChange={v=>this.handleChange('user',v)}
                >用户名</InputItem>
                <WingBlank />
                <InputItem
                    onChange={v=>this.handleChange('pwd',v)}
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