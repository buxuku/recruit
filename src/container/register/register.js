import React from 'react';
import Logo from '../../component/logo/logo';
import { WingBlank, WhiteSpace, Radio, Button, InputItem } from 'antd-mobile';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {register} from '../../redux/user.redux';
const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'genius'
        }
    }
    handleChange = (key,v) => {
        this.setState({
            [key]:v
        })
    }
    handleRegister = () => {
        this.props.register(this.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
                <Logo />
                {this.props.msg && <p className="error_msg">{this.props.msg}</p>}
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
                  checked={this.state.type === 'genius'}
                  onChange={()=>this.handleChange('type','genius')}
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