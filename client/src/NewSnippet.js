import React, { Component } from 'react'
import Client from './Client'
import Editor from './Editor'
import TagsInput from './TagsInput'

export default class NewSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            title: null,
            description: null,
            tags: [],
            jscode: null,
            csscode: null,
            placement: null,
            author: null, 
        };
        this.updateCode = this.updateCode.bind(this);
        this.updateTags = this.updateTags.bind(this);
    }
    
    updateCode = (code, update) => {
        this.setState({[code] : update})
    }

    updateTags = (tags) => {
        this.setState({tags: tags})
    }

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
                <TagsInput update={this.updateTags}/>
                <div className="editors" style={{ width:'100%', display: 'inline-flex'}}>
                    <Editor 
                        update={this.updateCode}
                        mode='javascript'
                        readOnly={false}
                        value=''
                    />
                    <Editor 
                        update={this.updateCode}
                        mode='css'
                        readOnly={false}
                        value=''
                    />
                </div>
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
