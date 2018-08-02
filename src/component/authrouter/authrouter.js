import React from 'react';
import axios from 'axios';

class AuthRouter extends React.Component{
    componentDidMount(){
        axios.get('/user/info').
          then(res => {
              console.log(res);
          })
    }
    render (){
        return <p>test</p>
    }
}

export default AuthRouter;