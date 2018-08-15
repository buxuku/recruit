import React from "react";
import io from "socket.io-client";
import { List, InputItem } from "antd-mobile";
import {connect} from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
const socket = io("ws://localhost:9003");
@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      msg: []
    };
  }
  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }
  handleSend = () => {
    const from  = this.props.user._id;
    const to = this.props.match.params.id;
    const content = this.state.text;
    this.props.sendMsg({from,to,content});
    this.setState({ text: ''})
  };
  render() {
    return (
      <div>
        {this.state.msg.map(v => (
          <p key={v}>{v}</p>
        ))}
        <div style={{ position: 'fixed',width: '100%', bottom: 0}}>
        <List>
          <InputItem
            placeholder="please input"
            extra={<span onClick={this.handleSend}>发送</span>}
            value={this.state.text}
            onChange={v => this.setState({ text: v })}
          />
        </List>
        </div>
      </div>
    );
  }
}
export default Chat;
