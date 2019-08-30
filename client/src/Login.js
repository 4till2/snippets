import React, { Component } from 'react'
import styled from 'styled-components'

import {Button, Input} from './global/styles'
import {setCookie} from './global/helpers'
import Client from './global/client';

const MainButton = styled(Button) `
    font-size: x-large;
    
    float: right;
    width: 100%;
    grid-column-start: 4;
`;

const SubButton = styled(Button) `
    font-size: x-large;
    grid-column-start: c1;
`;

const Form = styled.form `
    grid-column-start: c2;
    display: inline-grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: 100%;
    align-items: center;
    grid-column-gap: 10px;
`
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
            <SubButton onClick={this.toggleNewAccount}>Login</SubButton>
            <Form onSubmit={this.createUser}>
                <Input type="text" placeholder="Name" name="uname" required onChange={e => this.setState({name: e.target.value})}/>
                <Input type="email" placeholder="Email" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                <Input type="password" placeholder="Password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                <MainButton type="submit" value="Submit">Submit</MainButton>
            </Form>
        </React.Fragment>
        :
        <React.Fragment>
            <SubButton onClick={this.toggleNewAccount}>Create new account</SubButton>
            <Form onSubmit={this.login}>
                <Input type="email" placeholder="Email" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                <Input type="password" placeholder="Password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                <MainButton type="submit" value="Submit">Login</MainButton>
            </Form>
        </React.Fragment>

        return returnForm;
    }

    render() {
        return(
            this.getForm()
        )
    }
}