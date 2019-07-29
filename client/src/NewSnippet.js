import React, { Component } from 'react'
import Client from './Client';

export default class NewSnippet extends Component {
    state = {
        id: 0,
        title: null,
        description: null,
        tags: [],
        jscode: null,
        csscode: null,
        placement: null,
        date: new Date(),
        author: null, 
      };
      
      submit = (snip) => {
        let currentIds = this.props.currentIds;
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
    
        Client.addSnippet({
            id: idToBeAdded,
            title: snip.title,
            description: snip.description,
            tags: snip.tags,
            jscode: snip.jscode,
            csscode: snip.csscode,
            placement: snip.placement,
            date: snip.date,
            author: snip.author 
        });
    }

    render() {
        return (
            <div className="newSnippet" style={{ padding: '10px' }}>
                <h2>NewSnippet</h2>
                <input
                    type="text"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    placeholder="Title"
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ description: e.target.value })}
                    placeholder="Description"
                    style={{ width: '200px' }}
                /> 
                <input
                    type="text"
                    onChange={(e) => this.setState({ tags: e.target.value })}
                    placeholder="Tags"
                    style={{ width: '200px' }}
                /> 
                <input
                    type="text"
                    onChange={(e) => this.setState({ jscode: e.target.value })}
                    placeholder="Javascript Code"
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ csscode: e.target.value })}
                    placeholder="Css Code"
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ placement: e.target.value })}
                    placeholder="Placement"
                    style={{ width: '200px' }}
                />
                <input
                    type="text"
                    onChange={(e) => this.setState({ author: e.target.value })}
                    placeholder="Author"
                    style={{ width: '200px' }}
                />                   
                <button onClick={() => this.submit(this.state)}>
                    ADD
                </button>
            </div>
        )
    }
}
