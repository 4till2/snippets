import React, { Component } from 'react'
import AceEditor from 'react-ace';
import * as editor from '../global/editor'
import Manage from './Manage'
import TagsInput from '../TagsInput'
import Placement from '../Placement'
import {Row, Col} from 'react-bootstrap'
import {SnippetTag, Input} from '../global/styles'
import {Body, Description, DescriptionText, Meta, Snip, Title, placements} from './styles'
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
        this.updateCode = this.updateCode.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    
    updateCode = (code, update) => {
        this.setState({[code] : update})
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
            
            let jsCode =    <AceEditor
                        placeholder="Place Javascript here"
                        mode="javascript"
                        theme={editor.theme}
                        onChange={(e) => this.setState({ jscode: e })}
                        fontSize={editor.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={editor.showGutter}
                        highlightActiveLine={editor.highlightActiveLine}
                        setOptions={editor.setOptions}
                        value={this.state.jscode || ""}
                        readOnly={false}
                        height={editor.height}
                        width={editor.width}
                        />
            let cssCode =    <AceEditor
                        placeholder="Place CSS here"
                        mode="css"
                        theme={editor.theme}
                        onChange={(e) => this.setState({ csscode: e })}
                        fontSize={editor.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={editor.showGutter}
                        highlightActiveLine={editor.highlightActiveLine}
                        setOptions={editor.setOptions}
                        value={this.state.csscode || ""}
                        readOnly={false}
                        height={editor.height}
                        width={editor.width}
                        /> 
            let manage = <Manage data={this.state} cancel={this.props.toggleNew} submit={this.submit} mode={"new"}/>
    
            
            let body =   <Body>
                            <Col lg={5}>
                                <Row> {tags} </Row>
                                <Description> {description} </Description>
                                <Meta>
                                    <Col> <h6>Placement:</h6> {placement} </Col>
                                    <Col> <h6>Author:</h6> {this.props.username} </Col>
                                </Meta>
                            </Col>
                            <Col lg={7}>
                                <h4>Javascript</h4>
                                {jsCode}
                                <h4>Css</h4>
                                {cssCode} 
                            </Col>
                            {manage}
                        </Body>
            
            return(  
            <Snip >
                <span>Title: </span> 
                {title}
                {body}
            </Snip>
            
        )
    }
}