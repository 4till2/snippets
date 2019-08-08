import React, { Component } from 'react'
import EditSnippet from './EditSnippet'
import Client from './Client'
export default class Manage extends Component {
    constructor(props){
        super(props);
    }
    confirmDelete(){
        var confirm = prompt("Enter the super secret passcode to delete!");
        if (confirm == 'iamagod'){
             Client.deleteSnippet(this.props.data._id)
        }
    }
    confirmEdit(){
        var confirm = prompt("Enter the passcode to edit");
        if (confirm == 'iamahuman'){
            this.props.edit()
        }
    }
    render() {
        return (   
            <div className = "manage" style={style}>
                <button onClick={() => this.confirmDelete() }>DELETE</button>
                <button onClick={() => this.confirmEdit()}>EDIT</button>
            </div>
        )
    }
}

const style = {
    display: 'inline-flex'
}