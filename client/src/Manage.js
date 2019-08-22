import React, { Component } from 'react'
import Client from './global/client'
export default class Manage extends Component {
    constructor(props){
        super(props);
    }
    confirmDelete(){
        var confirm = prompt("Enter DELETE to delete!");
        if (confirm == 'DELETE'){
             Client.deleteSnippet(this.props.data._id)
        }
    }

    render() {
        return (   
            <div className = "manage" style={style}>
                <button class="warning" onClick={() => this.confirmDelete() }>DELETE</button>
                <button onClick={() => this.props.edit()}>EDIT</button>
            </div>
        )
    }
}

const style = {
    display: 'inline-flex'
}