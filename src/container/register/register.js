import React from 'react';
import Logo from '../../component/logo/logo';
import { WingBlank, WhiteSpace, Radio, Button, InputItem } from 'antd-mobile';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {register} from '../../redux/user.redux';
import Form from '../../component/form/form'
const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {register}
)
@Form
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'genius'
        }
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleRegister = () => {
        this.props.register(this.props.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
                <Logo />
                {this.props.msg && <p className="error_msg">{this.props.msg}</p>}
                <WingBlank />
                <InputItem
                    onChange={v=>this.props.handleChange('user',v)}
                >用户名</InputItem>
                <WingBlank />
                <InputItem
                    type="password"
                    onChange={v=>this.props.handleChange('pwd',v)}
                >密码</InputItem>
                <InputItem
                    type="password"
                    onChange={v=>this.props.handleChange('repeatpwd',v)}
                >确认密码</InputItem>
                <RadioItem
                  checked={this.props.state.type === 'genius'}
                  onChange={()=>this.props.handleChange('type','genius')}
                >牛人</RadioItem>
                <RadioItem
                    checked={this.props.state.type === 'boss'}
                    onChange={()=>this.props.handleChange('type','boss')}
                >Boss</RadioItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register;