import React from 'react';

export default function Form(Comp) {
    return class WrapForm extends React.Component{
        constructor(props){
            super(props);
            this.state={}
        }
        handleChange = (type,value) => {
            this.setState({
                [type]:value
            })
        }
        render(){
            return <Comp handleChange={this.handleChange} {...this.props} state={this.state} />
        }
    }
}