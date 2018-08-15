import axios from 'axios';
import { List, InputItem } from "antd-mobile";
import io from "socket.io-client";
const socket = io("ws://localhost:9003");

const MSG_LIST = 'MSG_LIST';
const RECV_MSG = 'RECV_MSG';
const initData = {
    chatmsg:[],
    unread:0
}

export default function chat(state = initData, action){
    switch(action.type){
        case MSG_LIST:
        return {...state, chatmsg: action.payload,unread: action.payload.filter(v => !v.read).length}
        case RECV_MSG:
        return {...state, chatmsg: [...state.chatmsg, action.payload]}
        default:
        return state
    }
}

function getmsg(data) {
    return {type: MSG_LIST, payload: data}
}
function recvedMsg(data) {
    return {type: RECV_MSG, payload: data}
}
export function recvMsg(){
    return dispatch => {
        socket.on('recvmsg', function(data) {
            dispatch(recvedMsg(data))
        })
    }
}
export function sendMsg({from,to,content}) {
    return dispatch => {
        socket.emit("sendmsg", {from, to, content });
    }
}
export function getMsgList(){
    return dispatch => {
        axios.get('/user/msglist').then(
            res=>{
                if(res.status === 200 && res.data.code === 0){
                    dispatch(getmsg(res.data.msgs))
                }
            }
        )
    }
}