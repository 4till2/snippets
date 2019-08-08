import './Snippet.css'
import React, { Component } from 'react'
import Editor from './Editor'
import Manage from './Manage'
import UpdateSnippet from './UpdateSnippet';
import {placements} from './global';
import {Row, Col} from 'react-bootstrap'

export default class Snippet extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            isHidden: true
        };
        this.edit = this.edit.bind(this);
        this.toggleBody = this.toggleBody.bind(this)
    }
    toggleBody(){
        this.setState((state) => ({ 
            isHidden: !state.isHidden
        }))
    }
    edit(){
        this.setState((state) => ({ 
            editMode: !state.editMode
        }))
    }

    render() {
        if (!this.state.editMode) {
            this.tags = this.props.data.tags 
            return ( 
                <li className="snippet" key={this.props.data.id}>
                <div className="mx-auto px-3">
                    <Row className="snippet-title" onClick={this.toggleBody}>
                    <h1> {this.props.data.title} </h1>
                    </Row>
                    <Row className={this.state.isHidden && " hidden"}>
                        <Col lg={5}className="snippet-info">
                            <Row className="snippet-tags">
                                {this.props.data.tags.map((e) => <span className="snippet-tag">{e.label}</span>)}
                            </Row>
                            <Row className="h-75 snippet-description">
                                <p> {this.props.data.description} </p>
                            </Row>
                            <Row className="snippet-meta w-100">
                                <Col className="snippet-placment">
                                    {placements[this.props.data.placement]}
                                </Col>
                                <Col className="snippet-author">
                                    {this.props.data.author}
                                </Col>
                                <Col className="snippet-date">
                                    {new Date(this.props.data.updatedAt).toLocaleString()}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={7} className="snippet-code">
                            <span>Javascript</span>
                            <Editor 
                                mode='javascript'
                                readOnly={true}
                                value={this.props.data.jscode}
                            />
                            <span>Css</span>
                            <Editor 
                                mode='css'
                                readOnly={true}
                                value={this.props.data.csscode}
                            />  
                        </Col>
                    </Row>
                    <Manage data={this.props.data} edit={this.edit}/>
                    </div>
                </li>
            )   
        }else{  
            return (
                <UpdateSnippet data={this.props.data} edit={this.edit} />
            )
        }
    }
}