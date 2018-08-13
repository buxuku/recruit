import axios from 'axios';
import {redirectToPath} from '../util';
const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    pwd: '',
    type:''
}
export default function user(state = initState, action) {
    switch (action.type) {
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case AUTH_SUCCESS:
            return {...state,redirectTo:redirectToPath(action.payload),msg: '',...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
        return state;
    }
}

function error_msg(msg) {
    return {msg, type: ERROR_MSG}
}

function auth_success(data) {
    return {type: AUTH_SUCCESS,payload: data}
}
export function loadData(data) {
    return {type: LOAD_DATA, payload: data}
}

export function update(date) {
    return dispatc => {
        axios.post('/user/update',date).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatc(auth_success(res.data.data))
            }else {
                dispatc(error_msg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user || !pwd ){
        return error_msg('用户名或者密码不能为空')
    }
    return dispatc => {
        axios.post('/user/login',{user,pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatc(auth_success(res.data.data))
            }else {
                dispatc(error_msg(res.data.msg))
            }
        })
    }
}
export function register({user,pwd,repeatpwd,type}){
    if(!user || !pwd || !repeatpwd ){
        return error_msg('用户名或者密码不能为空')
    }
    if(pwd !== repeatpwd) {
        return error_msg ('两次密码不一致')
    }
    return dispatc => {
        axios.post('/user/register',{user,pwd,type}).
        then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatc(auth_success({user,pwd,type}))
            }else {
                dispatc(error_msg(res.data.msg))
            }
        })
    }

}