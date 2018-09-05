import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';

@connect(
    state=>state
)
class Msg extends React.Component{
    render(){
        const chatGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            chatGroup[v.chatid] = chatGroup[v.chatid] || [];
            chatGroup[v.chatid].push(v);
        })
        const chatGroupList = Object.values(chatGroup);
        const userid = this.props.user._id;
        const users = this.props.chat.users;
        return (
            <div>
            {chatGroupList.map(v => {
                const lastItem = v[v.length - 1];
                const targetId = lastItem.from === userid ? lastItem.to : lastItem.from;
                if(!users[targetId]){
                    return null;
                }
                return (
                    <List
                      key={lastItem._id}
                    >
                    <List.Item
                        thumb={require(`../img/${users[targetId].avatar}.png`)}
                    >
                        {lastItem.content}
                        <List.Item.Brief>{users[targetId].name}</List.Item.Brief>
                    </List.Item>
                    </List>
                )
            })}
            </div>
        )
    }
}

export default Msg;