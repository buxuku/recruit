import React from 'react';
import { Grid, List } from 'antd-mobile';

class AvatorSelector extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    handleSelect = (elm) => {
        this.setState(elm);
        this.props.onSelect(elm.text);
    }
    render(){
        const avatorList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v => ({
                                icon: require(`../img/${v}.png`),
                                text: v,
                            }));
        const header = this.state.icon ? (<div><span>已选择头像</span><img alt='' src={this.state.icon} /></div>) : (<div>请选择头像</div>)
        return (
            <div>
                <List renderHeader={() => header}>
                <Grid
                  columnNum={5}
                  onClick={elm => this.handleSelect(elm)}
                  data={avatorList} />
                </List>
            </div>
        )
    }
}

export default AvatorSelector;
