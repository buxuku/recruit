import React from "react";
import { Result, WhiteSpace, List } from "antd-mobile";
import { connect } from "react-redux";
@connect(state => state.user)
class User extends React.Component {
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
                <Item>退出登录</Item>
                </List>
      </div>
    ) : null;
  }
}
export default User;
