import React, { Component } from 'react'
import Login from './Login';
import Profile from './Profile'

export default class Nav extends Component {
    constructor(){
        super();
    }
    render() {
        if(this.props.username){
            return (
                <React.Fragment>
                <Profile userName={this.props.username}/>
                <button onClick={this.props.unsetUser}>Logout</button>
                </React.Fragment>
            )
        }
        else{
            return (
                <Login setUser={this.props.setUser}/>
            )
        }
    }
}
