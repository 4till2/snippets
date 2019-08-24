import React, { Component } from 'react'
import Editor from './Editor'
import Manage from './Manage'
import UpdateSnippet from './UpdateSnippet';
import {Row, Col} from 'react-bootstrap'
import styled from 'styled-components'

let placements = {
    "account-global": 'Account Global',
    "test-global": "Test Global",
    "variation-custom": "Variation Custom Code",
    "test-targeting": "Test Custom Targeting"
}

let Snip = styled.li `
    box-shadow: 0 2px 10px -1px rgba(176,192,237,.22);
    background-color: rgb(255, 255, 255);
    margin: auto;
    padding: .5rem 2rem;
    margin-bottom: 10px;
    list-style: none;
    border: ${props => props.edit ? '3px solid rgb(255, 196, 196' : ''};
`;

let Title = styled.h1 `
    text-align: left;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`;

let Body = styled.div `
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`
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
        let manage = this.props.username == this.props.data.author
        ?   <Manage data={this.props.data} edit={this.edit}/>
        :   ""
        
        let body = this.state.isHidden
        ?   ""
        :   <Body className={this.state.isHidden && " hidden"}>
                <Col lg={5}className="snippet-info">
                    <Row className="snippet-tags">
                        {this.props.data.tags.map((e) => <span className="snippet-tag">{e.label}</span>)}
                    </Row>
                    <Row className="h-75 snippet-description">
                        <textarea
                        type="text"
                        defaultValue={this.props.data.description}
                        readOnly={true}
                        />
                    </Row>
                    <Row className="snippet-meta w-100">
                        <Col className="snippet-placment">
                            <h6>Placement:</h6>
                            {placements[this.props.data.placement]}
                        </Col>
                        <Col className="snippet-author">
                            <h6>Author:</h6>
                            {this.props.data.author}
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
                        mode='javascript'
                        readOnly={true}
                        value={this.props.data.jscode}
                    />
                    <h6>Css</h6>
                    <Editor 
                        mode='css'
                        readOnly={true}
                        value={this.props.data.csscode}
                    />  
                </Col>
            </Body>
        
        let snippet = this.state.editMode
        ?   <Snip key={this.props.data._id} edit>
                <UpdateSnippet data={this.props.data} edit={this.edit} />
            </Snip>
        :   <Snip key={this.props.data._id}>
                <Title onClick={this.toggleBody}>{this.props.data.title}</Title>
                {body}
                {manage}
            </Snip>

            return (
                snippet
            )
        }
}