import React, { Component } from 'react'
import axios from 'axios'

export default class UpdateSnippet extends Component {
    state = {
        idToUpdate: null,
        updateToApply: null
    }
    
    // update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.props.data.forEach((dat) => {
        if (dat.id == idToUpdate) {
            objIdToUpdate = dat._id;
        }
        });

        axios.post('/api/updateData', {
            id: objIdToUpdate,
            update: { message: updateToApply },
        });
    };

    render() {
        return (
        <div className="updateSnippet" style={{ padding: '10px' }}>
            <h2>Update Snippet</h2>
            <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
            />
        
            <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
            />
            <button
            onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
            >
            UPDATE
            </button>
        </div>
        )
    }
}
