import React from "react";
import io from "socket.io-client";
import { List, InputItem, NavBar,Icon,Grid } from "antd-mobile";
import {connect} from 'react-redux'
import { getMsgList, sendMsg, recvMsg,readMsg } from '../../redux/chat.redux';
import {getChatId} from '../../util';
@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg,readMsg}
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
  componentWillUnmount(){
    const to = this.props.match.params.id;
    this.props.readMsg(to);
  }
  fixCarousel = () => {
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'));
    },0)
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
    const emoj = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍⚕️ 👩‍⚕️ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️ 👨‍🌾 👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧 👩‍🔧 👨‍🏭 👩‍🏭 👨‍💼 👩‍💼 👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨‍🎤 👩‍🎤 👨‍🎨 👩‍🎨 👨‍✈️ 👩‍✈️ 👨‍🚀 👩‍🚀 👨‍🚒 👩‍🚒 👮 👮‍ 👮‍ 🕵 🕵️‍ 🕵️‍ 💂 💂‍ 💂‍ 👷 👷‍ 👷‍ 🤴 👸 👳 👳‍ 👳‍ 👲 🧕 🧔 👱 👱‍ 👱‍ 🤵 👰 🤰 🤱 👼 🎅 🤶 🧙‍ 🧙‍ 🧚‍ 🧚‍ 🧛‍ 🧛‍ 🧜‍ 🧜‍ 🧝‍ 🧝‍ 🧞‍ 🧞‍ 🧟‍ 🧟‍ 🙍 🙍‍ 🙍‍ 🙎 🙎‍ 🙎‍ 🙅 🙅‍ 🙅‍ 🙆 🙆‍ 🙆‍ 💁 💁‍ 💁‍ 🙋 🙋‍ 🙋‍ 🙇 🙇‍ 🙇‍ 🤦 🤦‍ 🤦‍ 🤷 🤷‍ 🤷‍ 💆 💆‍ 💆‍ 💇 💇‍ 💇‍ 🚶 🚶‍ 🚶‍ 🏃 🏃‍ 🏃‍ 💃 🕺 👯 👯‍ 👯‍ 🧖‍ 🧖‍ 🕴 🗣 👤 👥 👫 👬 👭 💏 👨‍❤️‍💋‍👨 👩‍❤️‍💋‍👩 💑 👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👦 👨‍👦‍👦 👨‍👧 👨‍👧‍👦 👨‍👧‍👧 👩‍👦 👩‍👦‍👦 👩‍👧 👩‍👧‍👦 👩‍👧‍👧 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 ✊ 👊 🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 ☂ 💼'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({
                    text: v
                  }))
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
            extra={
            <div>
              <span onClick={()=>{
                this.setState({showEmoj: !this.state.showEmoj});
                this.fixCarousel();
              } }>😀</span>
            <span onClick={this.handleSend}>发送</span>
            </div>}
            value={this.state.text}
            onChange={v => this.setState({ text: v })}
          />
        </List>
        {this.state.showEmoj &&
        <Grid
          data={emoj}
          columnNum={9}
          carouselMaxRow={4}
          isCarousel
          onClick={(el)=>this.setState({
            text: this.state.text + el.text
          })}
        />}
        </div>
      </div>
    );
  }
}
export default Chat;
