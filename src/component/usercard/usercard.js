import React from "react";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import { withRouter } from 'react-router-dom'
@withRouter
class UserCard extends React.Component {
  handleLink = (v) => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    const userList = this.props.userList;
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        {userList.map(v => (
          v.avatar ?
          <Card key={v.user}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
              onClick={() => this.handleLink(v)}
            />
            <Body>
              <div>
                {v.type === 'boss' && <div>公司：{v.company}</div>}
                {v.desc && v.desc.split("\n").map(k => (
                  <div key={k}>{k}</div>
                ))}
                {v.type === 'boss' && <div>薪资：{v.money}</div>}
              </div>
            </Body>
          </Card> : null
        ))}
      </WingBlank>
    );
  }
}
export default UserCard;