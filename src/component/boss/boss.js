import React from "react";
import { getUserList } from "../../redux/chatuser.redux";
import { connect } from "react-redux";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList("genius");
  }
  render() {
    const { userList } = this.props;
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        {userList.map(v => (
          <Card>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            />
            <Body>
              <div>{v.desc.split('\n').map(k=> (
                  <div>{k}</div>
              ))}</div>
            </Body>
          </Card>
        ))}
      </WingBlank>
    );
  }
}
export default Boss;
