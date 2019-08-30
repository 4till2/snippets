import React, { Component } from 'react'
import styled from 'styled-components';
import NewSnippet from './Snippets/NewSnippet'
import Snippets from './Snippets/Snippets'
import Nav from './Nav'
import {Button, Title, Container} from './global/styles';
import Tags from './Tags'
import {getCookie, setCookie} from './global/helpers'

const MainBody = styled.main `
    margin: 50px auto;
    padding: 0 3rem 0 3rem;
`;

const SideBar = styled.div `
    background-color: rgb(255, 255, 255);
    padding: 20px;
    height: 80%;
    width: 25%;
    float: left;    
    box-shadow: 0 2px 10px -1px rgba(176,192,237,.22);
`;

const MainContent = styled.div `
    width: 65%;
    float: right;
`;

const SearchBar = styled.input `
    width: 85%;
    font-size: x-large;
    outline: none;
    box-shadow: 0 0 2px 2px aliceblue;
    border: none;

    :focus{
        box-shadow: 0 0 2px 2px rgb(182, 216, 247);
      }
`;

const Label = styled.label `
      margin: 10px;
`

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            sortMode: 'title',
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
        this.toggleNewSnippet = this.toggleNewSnippet.bind(this);
    }

    toggleFilter(tag){
        let update = [...this.state.tagFilters]
        update.includes(tag) ? update = update.filter(e => e !== tag) : update.push(tag)
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

    toggleNewSnippet(){
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
            <MainBody>
                    <SideBar>
                        <Container>
                            <Title>Search</Title>
                            <Search handleSearchTerm={this.handleSearchTerm} handleSearchLocation={this.handleSearchLocation} />
                        </Container>
                        <Container>
                            <Title>Filter</Title>
                            <Tags toggleFilter={this.toggleFilter}/>
                        </Container>
                        <Container>
                            <Title>Sort</Title>
                            <Sort changeSort={this.changeSort}/>
                        </Container>
                        <Button onClick={() => this.toggleNewSnippet()} padding="15px">New Snippet</Button>
                    </SideBar>
                    <MainContent>
                        {this.state.newMode 
                        ?   <NewSnippet toggleNew={this.toggleNewSnippet} username={this.state.username}/> 
                        :   <Snippets {...this.state} toggleNew={this.toggleNewSnippet}/>}
                    </MainContent>
            </MainBody>
            </React.Fragment>
        )
    }
}

class Sort extends Component {
    render() {
        return (
            <select onChange={e => this.props.changeSort(e.target.value)}>
                <option value="title">Title</option>
                <option value="new">Newest first</option>
                <option value="old">Oldest first</option>
                <option value="placement">Placement</option>
                <option value="author">Author</option>
            </select> 
        )
    }
}

class Search extends Component {
    render() {
        return (
            <form>
                <SearchBar onChange={this.props.handleSearchTerm} />
                <div onChange={this.props.handleSearchLocation}>
                    <input type="radio" id="searchLocation1" name="location" value="title"/>
                    <Label htmlFor="searchLocation1">Title</Label>
                    <input type="radio" id="searchLocation2" name="location" value="description"/>
                    <Label htmlFor="searchLocation2">Description</Label>
                    <input type="radio" id="searchLocation3" name="location" value="jscode"/>
                    <Label htmlFor="searchLocation3">Javascript</Label>
                    <input type="radio" id="searchLocation4" name="location" value="csscode"/>
                    <Label htmlFor="searchLocation4">CSS</Label>
                </div>
            </form>
        )
    }
}