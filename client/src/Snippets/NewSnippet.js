import React, { Component } from 'react'

import Editor from '../global/editor'
import Manage from './Manage'
import TagsInput from '../TagsInput'
import Placement from '../Placement'
import {Row, Col} from 'react-bootstrap'
import {Input} from '../global/styles'
import {Body, Description, DescriptionText, Meta, Snip} from './styles'
import Client from '../global/client'

export default class NewSnippet extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            description: "",
            tags: [],
            jscode: "",
            csscode: "",
            placement: "",
            author: this.props.username, 
        };
        this.updateState = this.updateState.bind(this);
    }

    updateState = (target, value) => {
        this.setState({[target]: value})
    }

    submit = () => {
        const snip = this.state
        Client.addSnippet({
            title: snip.title || "",
            description: snip.description || "",
            tags: snip.tags || "",
            jscode: snip.jscode || "", 
            csscode: snip.csscode || "",
            placement: snip.placement || "",
            author: snip.author || ""
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
            let title =  <Input onChange={(e) => this.setState({ title: e.target.value })} placeholder="Short and to the point"/>

            let tags = <TagsInput update={this.updateState}/>
            
            let description =   <DescriptionText
                                type="text"
                                onChange={(e) => this.setState({ description: e.target.value })}
                                placeholder="This is the description. Here we put lots of nice information about the snippet.&#10;- How to use it.&#10;- When to use it.&#10;- Why to use it.&#10;VARIABLES TO REPLACE:&#10;* variable_a&#10;* variable_b"
                                readOnly={false}
                                />
            
            
            let placement = <Placement handleChange={(e) => this.setState({ placement: e })} />
            
            let manage = <Manage data={this.state} cancel={this.props.toggleNew} submit={this.submit} mode={"new"}/>
    
            
            let body =   <Body>
                            <Col lg={6}>
                                <Row> {tags} </Row>
                                <Description> {description} </Description>
                                <Meta>
                                    <Col> <h6>Placement:</h6> {placement} </Col>
                                    <Col> <h6>Author:</h6> {this.props.username} </Col>
                                </Meta>
                            </Col>
                            <Col lg={6}>
                                <h4>Javascript</h4>
                                <Editor
                                    id={"jsCode-new"}
                                    placeholder="Place Javascript code here"
                                    mode="javascript"
                                    handleChange={this.updateState}
                                    value={this.state.jscode || ""}
                                    readOnly={false}
                                />
                                <h4>Css</h4>
                                <Editor
                                    id={"cssCode-new"}
                                    placeholder="Place Css here"
                                    mode="css"
                                    handleChange={this.updateState}
                                    value={this.state.csscode || ""}
                                    readOnly={false}
                                />
                            </Col>
                            {manage}
                        </Body>
            
            return(  
            <Snip mode="new">
                <span>Title: </span> 
                {title}
                {body}
            </Snip>
            
        )
    }
}