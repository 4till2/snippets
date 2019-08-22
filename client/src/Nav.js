import React, { Component } from 'react'
import Login from './Login';
import {Button} from './global/styles';
import styled from 'styled-components';

const Profile = styled.div`
    width: 50%;
    height: 100%;
    float: left;
    display: inline-flex;

    span{
        font-size: xx-large;
        margin: auto 0;
    }
`;

const LogButton = styled(Button) `
    float: right;
    margin-top: 10px;
    font-size: x-large;
`;


const NavBar = styled.div `
    width: 100%;
    padding: 0 3rem;
    height: 85px;
    background-color: #fff;
    top: 0;
    box-shadow: 0 0 4px 4px aliceblue;
    text-align: left;
`;

export default class Nav extends Component {
    constructor(){
        super();
    }

    getInnerNav(){
        let innerNav = this.props.username 
        ?
            <React.Fragment>
                <Profile>
                    <span>{this.props.username}</span>
                </Profile>
                <LogButton  onClick={this.props.unsetUser}>Logout</LogButton>
            </React.Fragment>
        :
           <Login setUser={this.props.setUser}/>
        
        return innerNav;
    }

    render() {
        return (
            <NavBar>
                {this.getInnerNav()}
            </NavBar>
        )
    }
}
