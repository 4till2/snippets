import './NewSnippet.css'
import React, { Component } from 'react'
import Client from './Client'
import Editor from './Editor'
import TagsInput from './TagsInput'
import Placement from './Placement'
import { Row, Col } from 'react-bootstrap'

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
            author: this.props.username, 
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
              this.props.toggleNew()
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
        <div className="new-snippet mx-auto px-3">
            <h2>New Snippet</h2>
            <Row className="snippet-title">
                <Col xs={1}><h3>Title:</h3></Col>
                <Col>
                    <input
                    type="text"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    placeholder="Short and to the point"
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={5}className="snippet-info">
                    <Row className="snippet-tags">
                        <Col xs={2}><h3>Tags:</h3></Col>
                        <Col><TagsInput update={this.updateTags}/></Col>
                    </Row>
                    <Row className="h-75 snippet-description">
                        <textarea
                        type="text"
                        onChange={(e) => this.setState({ description: e.target.value })}
                        placeholder="This is the description. Here we put lots of nice information about the snippet.&#10;- How to use it.&#10;- When to use it.&#10;- Why to use it.&#10;VARIABLES TO REPLACE:&#10;* variable_a&#10;* variable_b"
                        />
                    </Row>
                    <Row className="snippet-meta w-100">
                        <Col className="snippet-placement">
                            <h6>Placement:</h6>
                            <Placement handleChange={(e) => this.setState({ placement: e })} />
                        </Col>
                        <Col className="snippet-author">
                        <h6>Author:</h6>
                            <span>{this.state.author}</span>
                        </Col>
                    </Row>
                </Col>
                <Col lg={7} className="snippet-code">
                    <h6>Javascript</h6>
                    <Editor
                        update={this.updateCode} 
                        mode='javascript'
                        readOnly={false}
                    />
                    <h6>Css</h6>
                    <Editor 
                        update={this.updateCode}
                        mode='css'
                        readOnly={false}
                    />  
                </Col>
            </Row>
            <button onClick={() => this.props.toggleNew()}>
                CANCEL
            </button>                  
            <button onClick={() => this.submit(this.state)}>
                SUBMIT
            </button>
        </div>
        )
    }
}