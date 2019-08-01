import React, { Component } from 'react'

export default class EditSnippet extends Component {
    render() {
        return (
            <div>
                <h6>Edit snippet</h6>
                <button onClick={this.props.edit}>Edit Snippet</button>
            </div>
        )
    }
}
