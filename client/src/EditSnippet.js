import React, { Component } from 'react'

export default class EditSnippet extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.edit}>Edit Snippet</button>
            </div>
        )
    }
}
