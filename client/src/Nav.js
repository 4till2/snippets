import React, { Component } from 'react'
import Login from './Login';

const style = {
    "navBar":{
        "width":"100%",
        "padding": "0 37px 0 37px",
        "height":"85px",
    },
    "profile":{
        "width":"50%",
        "height":"100%",
        "float":"left",
        "text-align": "left",
        "display": "inline-flex",
    },
    "log":{
        "width":"200px",
        "float":"right",
        "padding": "20px"
    },
    "span":{
        "font-size": "xx-large",
        "padding": "14px"
    },
    "form":{
        "height":"100%"
    }

}
export default class Nav extends Component {
    constructor(){
        super();
    }

    render() {
        let innerNav;
        if (this.props.username){
            innerNav =  <React.Fragment>
                            <div class="profile" style={style.profile}>
                                <span style={style.span}>{this.props.username}</span>
                            </div>
                            <button style={style.log} onClick={this.props.unsetUser}>Logout</button>
                        </React.Fragment>
        }
        else{
            innerNav =  <div style={style.form}>
                            <Login setUser={this.props.setUser}/>
                        </div>
        }
        return (
            <div class="nav-bar" style={style.navBar}>
                {innerNav}
            </div>
        )
    }
}
