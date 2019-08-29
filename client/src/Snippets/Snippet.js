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

export default class Snippet extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHidden: true,
            editMode: {
                active: false,
                objid: this.props.data._id,
                id: this.props.data.id,
                title: this.props.data.title,
                description: this.props.data.description,
                tags: this.props.data.tags,
                jscode: this.props.data.jscode,
                csscode: this.props.data.csscode,
                placement: this.props.data.placement,
                author: this.props.data.author, 
            }
        }
        this.updateEditMode = this.updateEditMode.bind(this);
        this.edit = this.edit.bind(this);
        this.toggleBody = this.toggleBody.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    updateEditMode = (set, value) => {
        let editMode = {...this.state.editMode}
        editMode[set] = value;
        this.setState({editMode: editMode})
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
    update = () => {
        const snip  = this.state.editMode;
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
        this.props.updateEditMode('active', false);
    }
    confirmDelete(){
        const id = this.props.data._id;
        var confirm = prompt("Enter DELETE to delete!");
        if (confirm == 'DELETE'){
             Client.deleteSnippet(id)
        }
    }

    render() {

        let title = this.state.editMode.active
            ?   <Input onChange={(e) => this.updateEditMode('title', e.target.value)} defaultValue={this.props.data.title}/>
            :   <Title onClick={this.toggleBody}>{this.props.data.title}</Title>

        let tags = this.state.editMode.active
            ? <TagsInput update={this.updateEditMode} tags={this.props.data.tags}/>
            : this.props.data.tags.map((e) => <SnippetTag data-value={e.value}>{e.label}</SnippetTag>)

        let description = this.state.editMode.active
            ?   <DescriptionText
                type="text"
                defaultValue={this.props.data.description}
                onChange={(e) => this.setState({ description: e.target.value })}
                readOnly={false}
                />
            :   <DescriptionText
                type="text"
                defaultValue={this.props.data.description}
                readOnly={true}
                />
        
        let placement = this.state.editMode.active
            ? <Placement value={this.props.data.placement} handleChange={(e) => this.updateEditMode('placement', e)} />
            : placements[this.props.data.placement]
        let jsCode =    <AceEditor
                        placeholder="Place Javascript here"
                        mode="javascript"
                        theme={editor.theme}
                        onChange={(e) => this.updateEditMode("jscode", e)}
                        fontSize={editor.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={editor.showGutter}
                        highlightActiveLine={editor.highlightActiveLine}
                        value={this.state.editMode.active ? this.state.editMode.jscode || "" : this.props.data.jscode || ""}
                        setOptions={editor.setOptions}
                        readOnly={!this.state.editMode.active}
                        height={editor.height}
                        width={editor.width}
                        />
        let cssCode =    <AceEditor
                        placeholder="Place CSS here"
                        mode="css"
                        theme={editor.theme}
                        onChange={(e) => this.updateEditMode("csscode", e)}
                        fontSize={editor.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={editor.showGutter}
                        highlightActiveLine={editor.highlightActiveLine}
                        value={this.state.editMode.active ? this.state.editMode.csscode || ""  : this.props.data.csscode || "" }
                        setOptions={editor.setOptions}
                        readOnly={!this.state.editMode.active}
                        height={editor.height}
                        width={editor.width}
                        /> 
        let manage = this.props.username == this.props.data.author
            ?   <Manage data={this.state.editMode} edit={this.updateEditMode} delete={this.confirmDelete} submit={this.state.editMode.active ? this.update : "" } mode={this.state.editMode.active ? "edit" : "admin"} />
            :   ""
            
        let body = this.state.isHidden 
        ?   ""
        :   <Body>
                <Col lg={5}>
                    <Row> {tags} </Row>
                    <Description> {description} </Description>
                    <Meta>
                        <Col> <h6>Placement:</h6> {placement} </Col>
                        <Col> <h6>Author:</h6> {this.props.data.author} </Col>
                        <Col> <h6>Updated At:</h6> {new Date(this.props.data.updatedAt).toLocaleString()} </Col>
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
        <Snip key={this.props.data._id}>
            {title}
            {body}
        </Snip>
        )
    }
}



