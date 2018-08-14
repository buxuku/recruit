import React from "react";
import { Result, WhiteSpace, List,Modal } from "antd-mobile";
import { connect } from "react-redux";
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import {logout} from '../../redux/user.redux';

function hello (){
    console.log('test');
}
function wraphello(fn){
    return function(){
        console.log('test1');
        fn();
        console.log('test2');
    }

}
hello = wraphello(hello);
hello();
@connect(state => state.user,{logout})
class User extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    logout = () => {
        const alert = Modal.alert;
        alert('退出', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                browserCookie.erase('userid');
                this.props.logout();
            }},
          ])
    }
  render() {
    const { user, avatar, company, money, title, desc } = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return user ? (
      <div>
        <Result
          img={
            <img
              alt=""
              src={require(`../img/${avatar}.png`)}
              style={{ width: 60 }}
            />
          }
          title={user}
          message={company || null}
        />
        <List renderHeader={() => '简介'}>
            <Item multipleLine>
                {title}
                {desc && desc.split('\n').map(v=>(
                    <Brief key={v}>{v}</Brief>
                ))}
                {money && <Brief>{money}</Brief>}
                </Item>
            </List>
            <WhiteSpace />
            <List>
                <Item onClick={this.logout}>退出登录</Item>
                </List>
      </div>
    ) : <Redirect to={this.props.redirectTo} />;
  }
}
export default User;
