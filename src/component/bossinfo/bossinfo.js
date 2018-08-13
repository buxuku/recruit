import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button } from 'antd-mobile';
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    onChange = (type, v) => {
        this.setState({
            [type]: v,
        })
    }
    render(){
        return (
            <div>
                <NavBar >BOSS信息完善</NavBar>
                <List>
                    <InputItem onChange={(v) => this.onChange('title',v)}>
                        职位名称
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('company',v)}>
                        公司名字
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('money',v)}>
                        薪资范围
                    </InputItem>
                    <TextareaItem title='职位要求' rows={3} autoHeight onChange={(v) => this.onChange('desc',v)} />
                    </List>
                    <Button type="primary">保存</Button>
                </div>
        )
    }
}
export default BossInfo;