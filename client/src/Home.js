import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Snippets from './Snippets'
import Nav from './Nav'
import { Container, Col, Row } from 'react-bootstrap';
import Client from './Client';

const style = {
    marginTop: '50px'
}
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            sortMode: '',
            tagFilters: [],
            searchTerm: '',
            searchLocation: 'title',
            username: getCookie('username'),
            useremail: getCookie('useremail'),
            newMode: false
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.handleSearchTerm = this.handleSearchTerm.bind(this);
        this.handleSearchLocation = this.handleSearchLocation.bind(this)
        this.setUser = this.setUser.bind(this);
        this.unsetUser = this.unsetUser.bind(this);
        this.newSnippet = this.newSnippet.bind(this);
    }

    toggleFilter(tag){
        let update = [...this.state.tagFilters]
        update.includes(tag) ? update = update.filter(e => e != tag) : update.push(tag)
        this.setState({tagFilters: update})
    }
    changeSort(sort){
        this.setState({sortMode: sort})
    }
    handleSearchTerm(e){
        this.setState({searchTerm: e.target.value})
    }
    handleSearchLocation(e){
        this.setState({searchLocation: e.target.value})
    }
    setUser(user){
        this.setState({username: user.name});
        this.setState({useremail: user.email});
        this.setState({userPermissions: user.permissions});
    }

    unsetUser(){
        this.setState({username: ''});
        this.setState({useremail: ''})
        setCookie('username', '', -1);
        setCookie('useremail', '', -1);
    }

    newSnippet(){
        if (this.state.username){
            this.setState((state) => ({ 
                newMode: !state.newMode
            }))
        }else{
            alert('You must be logged in to create a new snippet')
        }
    }

    render() {
        return (
            <React.Fragment>
            <Nav username={this.state.username} setUser={this.setUser} unsetUser={this.unsetUser}/>
            <div className="mx-auto px-5" style = {style}>
                    <div className="side-bar">
                        <Sidebar toggleFilter={this.toggleFilter} changeSort={this.changeSort} handleSearchTerm={this.handleSearchTerm} handleSearchLocation={this.handleSearchLocation} newSnippet={this.newSnippet}/>
                    </div>
                    <div className="snippets-body">
                        <Snippets {...this.state} toggleNew={this.newSnippet}/>
                    </div>
            </div>
            </React.Fragment>
        )
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }