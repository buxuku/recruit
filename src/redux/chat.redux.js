import axios from 'axios';
import io from "socket.io-client";
const socket = io("ws://localhost:9003");

const MSG_LIST = 'MSG_LIST';
const RECV_MSG = 'RECV_MSG';
const READ_MSG = 'READ_MSG';
const initData = {
    chatmsg:[],
    users:{},
    unread:0
}

export default function chat(state = initData, action){
    switch(action.type){
        case MSG_LIST:
        return {...state,users:action.payload.users, chatmsg: action.payload.data,unread: action.payload.data.filter(v => !v.read && v.to === action.userId).length}
        case RECV_MSG:
        const n = action.payload.to === action.userId ? 1 : 0;
        return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+n}
        case READ_MSG:
        const {from,num} = action.payload;
        return {...state, chatmsg:state.chatmsg.map(v => ({...v,read:from === v.from ? true: v.read})),unread: state.unread-num}
        default:
        return state
    }
}

function getmsg(data,users,userId) {
    return {type: MSG_LIST, payload:{data,users},userId}
}
function recvedMsg(data,userId) {
    return {type: RECV_MSG, payload: data,userId}
}
function msgRead(from,userId,num){
    return {type:READ_MSG,payload:{from,userId,num}}
}
export function readMsg(from){
    return (dispatch,getState) => {
        axios.post('/user/readmsg',{from}).then(
            res=>{
                if(res.status === 200 && res.data.code === 0){
                    const userId = getState().user._id;
                    dispatch(msgRead(from,userId,res.data.num))
                }
            }
        )
    }
}
export function recvMsg(){
    return (dispatch,getState) => {
        socket.on('recvmsg', function(data) {
            const userId = getState().user._id;
            dispatch(recvedMsg(data,userId))
        })
    }
}
export function sendMsg({from,to,content}) {
    console.log("sendMsg");
    return dispatch => {
        socket.emit("sendmsg", {from, to, content });
    }
}
export function getMsgList(){
    return (dispatch, getState) => {
        axios.get('/user/msglist').then(
            res=>{
                if(res.status === 200 && res.data.code === 0){
                    const userId = getState().user._id;
                    dispatch(getmsg(res.data.msgs,res.data.users,userId))
                }
            }
        )
    }
}