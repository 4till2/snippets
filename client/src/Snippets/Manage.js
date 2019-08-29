import React, { Component } from 'react'
import styled from 'styled-components'
import Client from '../global/client'

const ManageContainer = styled.div `
    display: inline-flex;
`
export default class Manage extends Component {
    constructor(props){
        super(props);
    }

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
                <button onClick={() => this.props.edit('active', false)}>CANCEL</button>                  
                <button onClick={() => this.props.submit()}>SUBMIT</button>
                </ManageContainer>
                break;
            case "new":
                manage = 
                <ManageContainer>
                    <button onClick={() => this.props.cancel()}> CANCEL </button>                  
                    <button onClick={() => this.props.submit()}> SUBMIT </button>
                </ManageContainer>
                break;
            case "admin":
                manage =
                <ManageContainer>
                    <button class="warning" onClick={() => this.props.delete() }>DELETE</button>
                    <button onClick={() => this.props.edit('active', true)}>EDIT</button>
                </ManageContainer>
        }
        return (
            manage
        )
    }
}