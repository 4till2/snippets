import React, { Component } from 'react'
import Client from './Client'
import Editor from './Editor'
import TagsInput from './TagsInput'
import Placement from './Placement'
import {Col, Row} from 'react-bootstrap'

export default class UpdateSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            <div className="mx-auto px-3">
            <Row className="snippet-title">
            <Col xs={1}><h3>Title:</h3></Col>
            <Col>
                <input 
                    type="text"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    defaultValue={this.props.data.title}
                />
            </Col>
            </Row>
            <Row>
                <Col lg={5}className="snippet-info">
                    <Row className="snippet-tags">
                        <Col xs={2}><h3>Tags:</h3></Col>
                        <Col><TagsInput update={this.updateTags} tags={this.state.tags}/></Col>
                    </Row>
                    <Row className="h-75 snippet-description">
                        <textarea
                        style={textAreaStyle}
                        type="text"
                        onChange={(e) => this.setState({ description: e.target.value })}
                        defaultValue={this.props.data.description}
                        />
                    </Row>
                    <Row className="snippet-meta w-100">
                        <Col className="snippet-placement">
                            <h6>Placement:</h6>
                            <Placement value={this.props.data.placement} handleChange={(e) => this.setState({ placement: e })} />
                        </Col>
                        <Col className="snippet-author">
                            <h6>Author:</h6>
                            <input
                                type="text"
                                onChange={(e) => this.setState({ author: e.target.value })}
                                defaultValue={this.props.data.author}
                            /> 
                        </Col>
                        <Col className="snippet-date">
                        <h6>Updated At:</h6>
                            {new Date(this.props.data.updatedAt).toLocaleString()}
                        </Col>
                    </Row>
                </Col>
                <Col lg={7} className="snippet-code">
                    <h6>Javascript</h6>
                    <Editor
                        update={this.updateCode} 
                        mode='javascript'
                        readOnly={false}
                        value={this.props.data.jscode}
                    />
                    <h6>Css</h6>
                    <Editor 
                        update={this.updateCode}
                        mode='css'
                        readOnly={false}
                        value={this.props.data.csscode}
                    />  
                </Col>
            </Row>
            <button onClick={() => this.props.edit()}>
                CANCEL
            </button>                  
            <button onClick={() => this.submit(this.state)}>
                SUBMIT
            </button>
        </div>
        )
    }
}

const style = {
    border: '2px solid'
}
const textAreaStyle = {
    width: '100%',
    resize: 'none'
}