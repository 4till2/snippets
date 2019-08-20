import React, { Component } from 'react'
import Snippet from './Snippet'
import NewSnippet from './NewSnippet'
import Client from './Client'
import './Snippets.css'
export default class Snippets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            intervalIsSet: false,
            newMode: false,
        };
        this.newSnippet = this.newSnippet.bind(this);
    }
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
        }
    }

    // get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        Client.getAllSnippets()
        .then((data) => data.data)
        .then((res) => this.setState({ data: res.data }));
    };

    newSnippet(){
        if (this.props.username){
            this.setState((state) => ({ 
                newMode: !state.newMode
            }))
        }else{
            alert('You must be logged in to create a new snippet')
        }
    }
    sort(data){
        switch (this.props.sortMode || 'title'){
            case 'title':
                return (data.sort(function(a, b){
                    if (a.title.toUpperCase() > b.title.toUpperCase()) {return 1}
                    if (a.title.toUpperCase() < b.title.toUpperCase()) {return -1}
                    return 0
                }));
            case 'new':
                return (data.sort(function(a, b){
                    if (a.updatedAt > b.updatedAt) {return 1}
                    if (a.updatedAt < b.updatedAt) {return -1}
                    return 0
                }));
            case 'old':
                return (data.sort(function(a, b){
                    if (a.updatedAt < b.updatedAt) {return 1}
                    if (a.updatedAt > b.updatedAt) {return -1}
                    return 0
                }));
            case 'placement':
                return (data.sort(function(a, b){
                    if (a.placement > b.placement) {return 1}
                    if (a.placement < b.placement) {return -1}
                    return 0
                }));
            case 'author':
                return (data.sort(function(a, b){
                    if (a.author > b.author) {return 1}
                    if (a.author < b.author) {return -1}
                    return 0
                }));
        }
    }
    
    filter(data) {
        if (this.props.tagFilters.length){
            return (data.filter((e) => this.props.tagFilters.some(tag => e.tags.map(e => e.value).includes(tag))))
        }
        return (data)
    }
    search(data){
        let location = this.props.searchLocation;
        let term = this.props.searchTerm.toLowerCase();
        return (data.filter(e => e[location] && e[location].toLowerCase().includes(term)))
    } 
    returnSnippets(data){
        let ret = this.state.data;
        this.props.searchTerm ? ret = this.search(ret) : '';
        this.props.tagFilters.length ? ret = this.filter(ret) : '';
        ret = this.sort(ret);
        return ret;
    }
    render() {
        if (this.state.newMode){
            return (
                <React.Fragment>
                <NewSnippet toggleNew={this.newSnippet} currentIds={this.state.data.map((data) => data.id)} username={this.props.username}/>
                </React.Fragment>
                )
        }else{
            return (
                <div className="snippets">
                    <h1>Snippets</h1>
                    <ul style={ulStyle}>
                        {this.state.data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : this.returnSnippets().map(dat => (
                            <Snippet data={dat} username={this.props.username}/>
                        ))}
                    </ul>
                    <button onClick={() => this.newSnippet()}>New</button>
                </div>
            )
        }
    }
}

const ulStyle = {
    margin: '0',
    padding: '0'
}