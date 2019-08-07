import React, { Component } from 'react'
import Editor from './Editor'
import Manage from './Manage'
import UpdateSnippet from './UpdateSnippet';
import {placements} from './global';
import TagsInput from './TagsInput';

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
                <li className="snippet" style={style} key={this.props.data.id}>
                <span> id: </span> {this.props.data.id} <br />
                <span> title: </span> {this.props.data.title} <br />
                <span> description: </span> {this.props.data.description} <br />
                <span>tags: </span>
                <TagsInput readOnly={true} tags={this.props.data.tags}/>
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
                <span> placement: </span>{placements[this.props.data.placement]} <br />
                <span> author: </span> {this.props.data.author} <br />
                <span> date: </span> {this.props.data.updatedAt.toString()} <br />
                <Manage data={this.props.data} edit={this.edit}/>
                </li>
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
    padding: '10px',
    border: '2px solid'
}