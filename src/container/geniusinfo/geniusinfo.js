import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import AvatorSelector from '../../component/avatar-selector/avator-selecter.js';
import { connect } from 'react-redux';
import {update} from '../../redux/user.redux';

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    onChange = (type, v) => {
        this.setState({
            [type]: v,
        })
    }
    handleSelect = (v) => {
        this.setState({
            avatar: v,
        })
    }
    handelUpdate =() => {
        this.props.update(this.state);
    }
    render(){
        const path = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div>
                {(redirectTo && redirectTo !== path) && <Redirect to={this.props.redirectTo} />}
                <NavBar >牛人信息完善</NavBar>
                <List>
                    <AvatorSelector onSelect={(v) => this.handleSelect(v)}/>
                    <InputItem onChange={(v) => this.onChange('title',v)}>
                        求职
                    </InputItem>
                    <TextareaItem title='个人简介' rows={3} autoHeight onChange={(v) => this.onChange('desc',v)} />
                    </List>
                    <Button onClick={this.handelUpdate} type="primary">保存</Button>
                </div>
        )
    }
}
export default GeniusInfo;