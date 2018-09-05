import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';

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
        const chatGroupList = Object.values(chatGroup).sort((a,b)=> {
            const a_time = a[a.length-1].create_time;
            const b_time = b[b.length-1].create_time;
            return b_time - a_time;
        });
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
                const unreadNum = v.filter(v=> !v.read && v.to === userid).length;
                return (
                    <List
                      key={lastItem._id}
                    >
                    <List.Item
                        extra={<Badge text={unreadNum} />}
                        thumb={require(`../img/${users[targetId].avatar}.png`)}
                        arrow='horizontal'
                        onClick={()=>this.props.history.push(`/chat/${targetId}`)}
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