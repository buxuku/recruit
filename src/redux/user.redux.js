import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    isAuth: false,
    msg:'',
    user:'',
    pwd: '',
    type:''
}
export default function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state,isAuth:true,msg: '',...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg}
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