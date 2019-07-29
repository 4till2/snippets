import React, { Component } from 'react'
import Client from './Client'

export default class DeleteSnippet extends Component {
    render() {
        return (
        <div className="deleteSnippet" style={{ padding: '10px' }}>
            <h6>Delete Snippet</h6>
            <button onClick={() => Client.deleteSnippet(this.props.databaseId)}>
                DELETE
            </button>
        </div>
        )
    }
}
