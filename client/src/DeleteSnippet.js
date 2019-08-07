import React, { Component } from 'react'
import Client from './Client'

export default class DeleteSnippet extends Component {
    confirmDelete(){
       var confirm =   prompt("Enter 'DELETE' to delete!");
       if (confirm == 'DELETE'){
            Client.deleteSnippet(this.props.databaseId)
       }
    }
    render() {
        return (
        <div className="deleteSnippet">
            <button onClick={() => this.confirmDelete() }>
                Delete
            </button>
        </div>
        )
    }
}
