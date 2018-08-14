import axios from 'axios';
const USER_LIST = "USER_LIST";

const initData = {
  userList: []
};

export default function chatuser(state = initData, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userList: action.payload };
    default:
      return state;
  }
}
function userList(data) {
    return {type: USER_LIST, payload: data}
}
export function getUserList(type) {
    return dispatc => {
        axios.get(`/user/list?type=${type}`).then(res => {
            if(res.data.code === 0) {
                dispatc(userList(res.data.data));
            }
        })
    }
}