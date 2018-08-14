import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
@withRouter
class NavLink extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired,
    }
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        const navList = this.props.data.filter(v => !v.hide);
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={v.path === this.props.location.pathname}
                        onPress={() => this.props.history.push(v.path)}
                    ></TabBar.Item>
                ))}
                </TabBar>
        )
    }
}
export default NavLink;