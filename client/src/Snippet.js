import React, { Component } from 'react'
import Editor from './Editor'
import Manage from './Manage'
import UpdateSnippet from './UpdateSnippet';

export default class Snippet extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false
        };
        this.edit = this.edit.bind(this);
    }

    edit(){
        this.setState((state) => ({ 
            editMode: !state.editMode
        }))
    }

    render() {
        if (!this.state.editMode) {
            this.tags = this.props.data.tags 
            return (
                <div className="snippet">
                    <h4>Snippet</h4>
                    <li style={style} key={this.props.data.id}>
                    <span style={{ color: 'gray' }}> id: </span> {this.props.data.id} <br />
                    <span style={{ color: 'gray' }}> title: </span> {this.props.data.title} <br />
                    <span style={{ color: 'gray' }}> description: </span> {this.props.data.description} <br />
                    <span style={{ color: 'gray' }}> tags: </span> <span class="tags">{this.props.data.tags.map((tag) => tag.label + ',')}</span> <br />
                    <div className="editors" style={{ width:'100%', display: 'inline-flex'}}>
                        <Editor 
                            mode='javascript'
                            readOnly={true}
                            value={this.props.data.jscode}
                        />
                        <Editor 
                            mode='css'
                            readOnly={true}
                            value={this.props.data.csscode}
                        />  
                    </div>
                    <span style={{ color: 'gray' }}> placement: </span> {this.props.data.placement} <br />
                    <span style={{ color: 'gray' }}> author: </span> {this.props.data.author} <br />
                    <span style={{ color: 'gray' }}> date: </span> {this.props.data.updatedAt.toString()} <br />
                    </li>
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