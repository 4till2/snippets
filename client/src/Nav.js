import React, { Component } from 'react'
import Login from './Login';
import {Button} from './global/styles';
import styled from 'styled-components';

const Profile = styled.div`
    grid-column-start: c2;
    justify-self: right;
    span{
        font-size: xx-large;
        margin: auto 0;
    }
`;
const Lbtn = styled(Button) `
    font-size: x-large;
    grid-column-start: c1;
`;

const NavBar = styled.nav `
    height: 80px;
    width: 100%;
    padding: 0 3rem;
    background-color: #fff;
    top: 0;
    box-shadow: 0 0 4px 4px aliceblue;
    text-align: left;
    display: inline-grid;
    grid-template-columns: [c1] 25% auto [c2] 65%;
    grid-template-rows: 100%;
    align-items: center;
`;

export default class Nav extends Component {
    getInnerNav(){
        let innerNav = this.props.username 
        ?   <React.Fragment>
                <Lbtn onClick={this.props.unsetUser}>Logout</Lbtn>
                <Profile>
                    <span>{this.props.username}</span>
                </Profile>
            </React.Fragment>
        :   <Login setUser={this.props.setUser}/>
          
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
