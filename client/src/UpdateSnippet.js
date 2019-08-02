import React, { Component } from 'react'
import Client from './Client'

export default class UpdateSnippet extends Component {
    state = {
        objid: this.props.data._id,
        id: this.props.data.id,
        title: this.props.data.title,
        description: this.props.data.description,
        tags: this.props.data.tags,
        jscode: this.props.data.jscode,
        csscode: this.props.data.csscode,
        placement: this.props.data.placement,
        author: this.props.data.author, 
      };
    
    // in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries
      submit = (snip) => {
        Client.updateSnippet({
            objid: snip.objid,
            title: snip.title,
            description: snip.description,
            tags: snip.tags,
            jscode: snip.jscode,
            csscode: snip.csscode,
            placement: snip.placement,
            author: snip.author 
        });
        this.props.edit()
    }

    render() {
        return (
        <div className="updateSnippet" style={{ padding: '10px' }}>
            <h2>Update Snippet</h2>
            <input
                    type="text"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    defaultValue={this.props.data.title} 
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ description: e.target.value })}
                    defaultValue={this.props.data.description} 
                    style={{ width: '200px' }}
                /> 
                <input
                    type="text"
                    onChange={(e) => this.setState({ tags: e.target.value })}
                    defaultValue={this.props.data.tags} 
                    style={{ width: '200px' }}
                /> 
                <input
                    type="text"
                    onChange={(e) => this.setState({ jscode: e.target.value })}
                    defaultValue={this.props.data.jscode} 
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ csscode: e.target.value })}
                    defaultValue={this.props.data.csscode}
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ placement: e.target.value })}
                    defaultValue={this.props.data.placement}
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ author: e.target.value })}
                    defaultValue={this.props.data.author}
                    style={{ width: '200px' }}
                />                   
                <button onClick={() => this.submit(this.state)}>
                    UPDATE
                </button>
        </div>
        )
    }
}
