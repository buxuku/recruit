import axios from 'axios';
import {redirectToPath} from '../util';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo:'',
    isAuth: false,
    msg:'',
    user:'',
    pwd: '',
    type:''
}
export default function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state,isAuth:true,redirectTo:redirectToPath(action.payload),msg: '',...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOGIN_SUCCESS:
            return {...state,isAuth:true,redirectTo:redirectToPath(action.payload),msg: '',...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        default:
        return state;
    }
}

function error_msg(msg) {
    return {msg, type: ERROR_MSG}
}

function register_success(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}
function login_success(data) {
    return {type: LOGIN_SUCCESS,payload: data}
}
export function loadData(data) {
    return {type: LOAD_DATA, payload: data}
}
export function login({user,pwd}){
    if(!user || !pwd ){
        return error_msg('用户名或者密码不能为空')
    }
    return dispatc => {
        axios.post('/user/login',{user,pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatc(login_success(res.data.data))
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
                dispatc(register_success({user,pwd,type}))
            }else {
                dispatc(error_msg(res.data.msg))
            }
        })
    }

}