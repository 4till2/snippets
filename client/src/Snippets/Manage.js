import React, { Component } from 'react'
import styled from 'styled-components'
import Client from '../global/client'
import {Button} from '../global/styles'

const ManageContainer = styled.div `
    display: inline-grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    grid-column-gap: 16px;
    margin: 10px auto 0;
`
export default class Manage extends Component {

    update = (snip) => {
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
        this.props.edit('active', false);
    }

    render() {
        let manage;
        switch (this.props.mode) {
            case "edit":
                manage = 
                <ManageContainer>
                    <Button onClick={() => this.props.edit('editMode', false)}>CANCEL</Button>                  
                    <Button onClick={() => this.props.submit()} warning>SUBMIT</Button>
                </ManageContainer>
                break;
            case "new":
                manage = 
                <ManageContainer>
                    <Button onClick={() => this.props.cancel()}> CANCEL </Button>                  
                    <Button onClick={() => this.props.submit()} warning> SUBMIT </Button>
                </ManageContainer>
                break;
            case "admin":
                manage =
                <ManageContainer>
                    <Button onClick={() => this.props.delete() } danger>DELETE</Button>
                    <Button onClick={() => this.props.edit('editMode', true)} warning>EDIT</Button>
                </ManageContainer>
                break;
            default :
                manage = ""
        }
        return (
            manage
        )
    }
}