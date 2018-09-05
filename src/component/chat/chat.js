import React from "react";
import io from "socket.io-client";
import { List, InputItem, NavBar,Icon } from "antd-mobile";
import {connect} from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import {getChatId} from '../../util';
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
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  handleSend = () => {
    const from  = this.props.user._id;
    const to = this.props.match.params.id;
    const content = this.state.text;
    this.props.sendMsg({from,to,content});
    this.setState({ text: ''})
  };
  render() {
    const user = this.props.match.params.id;
    const users = this.props.chat.users;
    if(!users[user]){
      return null;
    }
    const Item = List.Item;
    const chatId = getChatId(this.props.user._id, user);
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
    console.log(chatmsg);
    return (
      <div id="chat-page">
        <NavBar
            icon={<Icon type='left' />}
            onLeftClick={() => this.props.history.goBack()}
        >{users[user].name}</NavBar>
        {chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === user ? <List key={v._id}>
            <Item
              thumb={avatar}
            >{v.content}</Item>
            </List> :
            <List key={v._id}>
            <Item
              extra={<img src={avatar} alt=""/>}
              className="chat-me"
            >{v.content}</Item>
            </List>
        })}
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
