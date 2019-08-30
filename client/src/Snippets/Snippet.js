import React, { Component } from 'react'
import Editor from '../global/editor'
import Manage from './Manage'
import TagsInput from '../TagsInput'
import Placement from '../Placement'
import {Row, Col} from 'react-bootstrap'
import {SnippetTag, Input} from '../global/styles'
import {copyStringToClipboard} from '../global/helpers'
import styled from 'styled-components'
import {Body, Description, DescriptionText, Meta, Snip, Title, placements} from './styles'
import Client from '../global/client'


const Copy = styled.a `
    margin-left: 10px;
    &::after{
        content: "\\1F4CB";
    }
    &:editMode{
        border: solid red 1px;
    }

`
export default class Snippet extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHidden: true,
            data: {
                editMode: false,
                objid: this.props.data._id,
                title: this.props.data.title,
                description: this.props.data.description,
                tags: this.props.data.tags,
                jscode: this.props.data.jscode || "",
                csscode: this.props.data.csscode || "",
                placement: this.props.data.placement,
                author: this.props.data.author, 
            }
        }
        this.updateData = this.updateData.bind(this);
        this.edit = this.edit.bind(this);
        this.toggleBody = this.toggleBody.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    updateData = (set, value) => {
        let data = {...this.state.data}
        data[set] = value;
        this.setState({data: data})
    }

    toggleBody(){
        this.setState((state) => ({ 
            isHidden: !state.isHidden
        }))
    }
    edit(){
        this.setState((state) => ({ 
            data: !state.data
        }))
    }
    update = () => {
        const snip  = this.state.data;
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
        this.updateData('editMode', false);
    }
    confirmDelete(){
        const id = this.props.data._id;
        var confirm = prompt("Enter DELETE to delete!");
        if (confirm === 'DELETE'){
             Client.deleteSnippet(id)
        }
    }
   
    render() {

        let title = this.state.data.editMode
            ?   <Input onChange={(e) => this.updateData('title', e.target.value)} defaultValue={this.props.data.title}/>
            :   <Title onClick={this.toggleBody}>{this.props.data.title}</Title>

        let tags = this.state.data.editMode
            ? <TagsInput update={this.updateData} tags={this.props.data.tags}/>
            : this.props.data.tags.map((e) => <SnippetTag key={e._id} data-value={e.value}>{e.label}</SnippetTag>)

        let description = this.state.data.editMode
            ?   <DescriptionText
                type="text"
                defaultValue={this.props.data.description}
                onChange={(e) => this.updateData("description", e.target.value)}
                readOnly={false}
                />
            :   <DescriptionText
                type="text"
                defaultValue={this.props.data.description}
                readOnly={true}
                />
        
        let placement = this.state.data.editMode
            ? <Placement value={this.props.data.placement} handleChange={(e) => this.updateData('placement', e)} />
            : placements[this.props.data.placement]

        let manage = this.props.username === this.props.data.author
            ?   <Manage data={this.state.data} edit={this.updateData} delete={this.confirmDelete} submit={this.state.data.editMode ? this.update : "" } mode={this.state.data.editMode ? "edit" : "admin"} />
            :   ""
            
        let body = this.state.isHidden 
        ?   ""
        :   <Body>
                <Col lg={6}>
                    <Row> {tags} </Row>
                    <Description> {description} </Description>
                    <Meta>
                        <Col> <h6>Placement:</h6> {placement} </Col>
                        <Col> <h6>Author:</h6> {this.props.data.author} </Col>
                        <Col> <h6>Updated At:</h6> {new Date(this.props.data.updatedAt).toLocaleString()} </Col>
                    </Meta>
                </Col>
                <Col lg={6}>
                    <h4>Javascript 
                        {/* <Copy onClick={copyStringToClipboard(this.state.data.jscode)}></Copy> */}
                    </h4>
                        <Editor
                            id={"jsCode-"+this.props.data._id}
                            placeholder="Place Javascript here"
                            mode="javascript"
                            handleChange={this.updateData}
                            value={this.state.data.editMode ? this.state.data.jscode || "" : this.props.data.jscode || ""}
                            readOnly={!this.state.data.editMode}
                        />
                    <h4>Css
                        {/* <Copy onClick={copyStringToClipboard(this.state.data.csscode)}></Copy> */}
                    </h4>
                        <Editor
                            id={"cssCode-"+this.props.data._id}
                            placeholder="Place Css here"
                            mode="css"
                            handleChange={this.updateData}
                            value={this.state.data.editMode ? this.state.data.csscode || "" : this.props.data.csscode || ""}
                            readOnly={!this.state.data.editMode}
                        />
                </Col>
                {manage}
            </Body>

        return(  
        <Snip key={this.props.data._id} mode={this.state.data.editMode ? "edit" : "view"}>
            {title}
            {body}
        </Snip>
        )
    }
}



