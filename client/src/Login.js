import React, { Component } from 'react'
import Client from './Client';

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
                  else console.log('Invalid Login')
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
        let fact = !this.state.newAccount
        this.setState({newAccount: fact})
    }
    render() {
        if (this.state.newAccount){
            return(
                <div>
                    <form onSubmit={this.createUser}>
                        <label for="uname"><b>Name</b></label>
                        <input type="text" placeholder="Yosef" name="uname" required onChange={e => this.setState({name: e.target.value})}/>
                        <label for="email"><b>Email</b></label>
                        <input type="email" placeholder="user@abtasty.com" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                        <button type="submit" value="Submit">Submit</button>
                    </form>
                    <button onClick={this.toggleNewAccount}>Login instead</button>
                </div>
        )}else{
            return (
                <div>
                    <form onSubmit={this.login}>
                        <label for="email"><b>Email</b></label>
                        <input type="email" placeholder="user@abtasty.com" name="email" required onChange={e => this.setState({email: e.target.value})}/>
                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="password" name="password" required onChange={e => this.setState({password: e.target.value})}/>
                        <button type="submit" value="Submit">Submit</button>
                    </form>
                    <button onClick={this.toggleNewAccount}>Create Account</button>
                </div>
            )
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }