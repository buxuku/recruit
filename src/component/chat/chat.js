import React from "react";
import io from "socket.io-client";
import { List, InputItem } from "antd-mobile";
const socket = io("ws://localhost:9003");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      msg: []
    };
  }
  componentDidMount() {
    socket.on("recvmsg", data => {
      this.setState({
        msg: [...this.state.msg, data.text]
      });
    });
  }
  handleSend = () => {
    socket.emit("sendmsg", { text: this.state.text });
    this.setState({ text: "" });
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
