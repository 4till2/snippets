import React, { Component } from 'react'
import Header from './Header'
import Code from './Code'
import Info from './Info'
import Manage from './Manage'
import UpdateSnippet from './UpdateSnippet';

export default class Snippet extends Component {
    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
        this.state = {
            editMode: false
        };
    }

    edit(){
        this.setState((state) => ({ 
            editMode: !state.editMode
        }))
        console.log(this.state.editMode)
    }

    render() {
        if (!this.state.editMode) { 
            return (
                <div className="snippet">
                    <h4>Snippet</h4>
                    <li style={style} key={this.props.data.id}>
                    <span style={{ color: 'gray' }}> id: </span> {this.props.data.id} <br />
                    <span style={{ color: 'gray' }}> title: </span> {this.props.data.title} <br />
                    <span style={{ color: 'gray' }}> description: </span> {this.props.data.description} <br />
                    <span style={{ color: 'gray' }}> tags: </span> {this.props.data.tags} <br />
                    <span style={{ color: 'gray' }}> jscode: </span> {this.props.data.jscode} <br />
                    <span style={{ color: 'gray' }}> csscode: </span> {this.props.data.csscode} <br />
                    <span style={{ color: 'gray' }}> placement: </span> {this.props.data.placement} <br />
                    <span style={{ color: 'gray' }}> author: </span> {this.props.data.author} <br />
                    <span style={{ color: 'gray' }}> date: </span> {this.props.data.updatedAt.toString()} <br />
                    </li>
                    {/* <Header/>
                    <Code/>
                    <Info/> */}
                    <Manage data={this.props.data} edit={this.edit}/>
                </div>
            )   
        }else{  
            return (
                <UpdateSnippet data={this.props.data} edit={this.edit} />
            )
        }
    }
}

const style = {
    listStyle: 'none',
    padding: '10px'
}