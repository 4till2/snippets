import './NewSnippet.css'
import React, { Component } from 'react'
import Client from './Client'
import Editor from './Editor'
import TagsInput from './TagsInput'
import Placement from './Placement'
import { Form, Col, Button } from 'react-bootstrap'

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
    })
    .then(
        (response => {
          if (response.data.success === true){
              console.log("Success");
              this.props.onSubmit()
          }
          else{
              console.log("Failure")
          }
        })
      )
      .catch(error => {
        console.log(error)
      })
}

    render() {
        return (
            <div className="new-snippet">
                <h2>NewSnippet</h2>
                <span>Title: </span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    placeholder="Short and to the point"
                    style={{ width: '200px' }}
                />
                <span>Description: </span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ description: e.target.value })}
                    placeholder="What do we need to know about this snippet? When / How do we use it? Be descriptive."
                    style={{ width: '200px' }}
                /> 
                <span>Tags: </span>
                <TagsInput update={this.updateTags}/>
                <div className="editors" style={{ width:'100%', display: 'inline-flex'}}>
                    <span>JS: </span>
                    <Editor 
                        update={this.updateCode}
                        mode='javascript'
                        readOnly={false}
                        value=''
                    />
                    <span>CSS:</span>
                    <Editor 
                        update={this.updateCode}
                        mode='css'
                        readOnly={false}
                        value=''
                    />
                </div>
                <span>Placement: </span>
                <Placement handleChange={(e) => this.setState({ placement: e })} />
                <span>Author: </span>
                <input
                    type="text"
                    onChange={(e) => this.setState({ author: e.target.value })}
                    placeholder="Who are you?"
                    style={{ width: '200px' }}
                />                   
                <button onClick={() => this.submit(this.state)}>
                    ADD
                </button>
            </div>
        )
    }
}