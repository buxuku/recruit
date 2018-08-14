import React from "react";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";

class UserCard extends React.Component {
  render() {
    const userList = this.props.userList;
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        {userList.map(v => (
          <Card key={v.user}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
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
          </Card>
        ))}
      </WingBlank>
    );
  }
}
export default UserCard;
