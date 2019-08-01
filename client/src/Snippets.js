import React, { Component } from 'react'
import axios from 'axios'
import Snippet from './Snippet'
import NewSnippet from './NewSnippet'
import DeleteSnippet from './DeleteSnippet'
import UpdateSnippet from './UpdateSnippet';
import EditSnippet from './EditSnippet';

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
            date: new Date(),
            author: null, 
            intervalIsSet: false,
        };
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

    // in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        fetch('/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

    render() {
            return (
                <div className="snippets">
                    <h1>Snippets</h1>
                    <ul style={ulStyle}>
                        {this.state.data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : this.state.data.map((dat) => (
                            <Snippet data={dat}/>
                        ))}
                    </ul>
                    <NewSnippet currentIds={this.state.data.map((data) => data.id)}/>
                </div>
            )
    }
}

const ulStyle = {
    margin: '0',
    padding: '0'
}