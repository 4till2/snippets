import React, { Component } from 'react'
import styled from 'styled-components'

import {Button, Input} from './global/styles'
import {getCookie, setCookie} from './global/helpers'
import Client from './global/client';

const MainButton = styled(Button) `
    margin-top: 10px;
    font-size: x-large;
    width: 25%;
    font-weight: bold;
`;

const SubButton = styled(Button) `
    float: right;
    margin-top: 10px;
    font-size: x-large;
`;

const Label = styled.label `
    font-weight: 600;
    font-size: large;
    margin-right: 15px;
    ::after{
        content: ":";
    }
`;
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            newAccount: false
        }
    }
    login = (e) => {
        e.preventDefault()
        
        Client.getUser({
            email: this.state.email,
            password: this.state.password
        })
        .then(
            (response => {
              if (response.data.success === true){
                  if (response.data.data.length) {
                    console.log("Success");
                    let data = response.data.data[0]
                    setCookie('username', data.name, 1);
                    setCookie('useremail', data.email, 1);
                    this.props.setUser({name: data.name, email: data.email, permissions: data.permissions})
                  }
                  else alert('Invalid Login')
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
    createUser = (e) => {
        e.preventDefault()
      
        Client.addUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(
            (response => {
              if (response.data.success === true){
                  console.log("Success");
                  this.props.setUser({name: this.state.name, email: this.state.email})
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

    toggleNewAccount = () => {
        let toggled = !this.state.newAccount
        this.setState({newAccount: toggled})
    }

    getForm(){
        let returnForm = this.state.newAccount ?
        <React.Fragment>
            <form onSubmit={this.createUser}>
                <Label htmlFor="uname">Name</Label>
                <Input type="text" placeholder="Name" name="uname" required onChange={e => this.setState({name: e.target.value})}/>
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="user@abtasty.com" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                <MainButton type="submit" value="Submit">Submit</MainButton>
                <SubButton onClick={this.toggleNewAccount}>Login</SubButton>
            </form>
        </React.Fragment>
        :
        <React.Fragment>
            <form onSubmit={this.login}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="user@abtasty.com" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                <MainButton type="submit" value="Submit">Login</MainButton>
                <SubButton onClick={this.toggleNewAccount}>Create new account</SubButton>
            </form>
        </React.Fragment>

        return returnForm;
    }

    render() {
        return(
            this.getForm()
        )
    }
}