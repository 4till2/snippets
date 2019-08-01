import React, { Component } from 'react'
import EditSnippet from './EditSnippet'
import DeleteSnippet from './DeleteSnippet';

export default class Manage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (   
            <div className = "manage" >
                <h5> Manage </h5>
                <DeleteSnippet databaseId={this.props.data._id}/>
                <EditSnippet edit={this.props.edit} />
            </div>
        )
    }
}