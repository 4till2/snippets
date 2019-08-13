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
            id: 0,
            title: null,
            description: null,
            tags: [],
            jscode: null,
            csscode: null,
            placement: null,
            author: null, 
            intervalIsSet: false,
            newMode: false,
            sortMode: 'time-new',
            tagFilters: []
        };
        this.new = this.new.bind(this);
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

    new = () => {
        this.setState((state) => ({ 
            newMode: !state.newMode
        }))
    }
    sort = (data) => {
        switch (this.state.sortMode){
            case 'title':
                return (data.sort(function(a, b){
                    if (a.title.toUpperCase() > b.title.toUpperCase()) {return 1}
                    if (a.title.toUpperCase() < b.title.toUpperCase()) {return -1}
                    return 0
                }));
                break;
            case 'time-new':
                return (data.sort(function(a, b){
                    if (a.updatedAt > b.updatedAt) {return 1}
                    if (a.updatedAt < b.updatedAt) {return -1}
                    return 0
                }));
                break;
            case 'time-old':
                return (data.sort(function(a, b){
                    if (a.updatedAt < b.updatedAt) {return 1}
                    if (a.updatedAt > b.updatedAt) {return -1}
                    return 0
                }));
                break;
            case 'placement':
                return (data.sort(function(a, b){
                    if (a.placement > b.placement) {return 1}
                    if (a.placement < b.placement) {return -1}
                    return 0
                }));
                break;
            case 'author':
                return (data.sort(function(a, b){
                    if (a.author > b.author) {return 1}
                    if (a.author < b.author) {return -1}
                    return 0
                }));
                break;
        }
    }
    
    checkTagFilter(e){ console.log(e.tags)
        return (this.state.tagFilters.some((h) => e.tags.indexOf(h) >= 0))
    }

    filter = (data) => {
        if (this.state.tagFilters.length){
            return (data.filter((e) => this.checkTagFilter(e)))
        }
        return (data)
    }
      
    render() {
        if (this.state.newMode){
            return (
                <React.Fragment>
                <NewSnippet toggleNew={this.new} currentIds={this.state.data.map((data) => data.id)}/>
                </React.Fragment>
                )
        }else{
            return (
                <div className="snippets">
                    <h1>Snippets</h1>
                    <ul style={ulStyle}>
                        {this.state.data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : this.filter(this.sort(this.state.data)).map((dat) => (
                            <Snippet data={dat}/>
                        ))}
                    </ul>
                    <button onClick={() => this.new()}>New</button>
                </div>
            )
        }
    }
}

const ulStyle = {
    margin: '0',
    padding: '0'
}