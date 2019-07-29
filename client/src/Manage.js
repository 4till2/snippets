import React, { Component } from 'react'
import Delete from './Delete'
import EditSnippet from './EditSnippet'
import DeleteSnippet from './DeleteSnippet';

export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e) {
        this.props.onClickEdit()
    }

    render() {
        return (
            <div className="manage">
                <h5>Manage</h5>
                <DeleteSnippet databaseId={this.props.data._id} />
                {/* <button onClick={this.handleEdit}>Edit Snippet</button>  */}
            </div>
        )
    }
}
