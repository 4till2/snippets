import React, { Component } from 'react'
import styled from 'styled-components'
import Snippet from './Snippet'
import Client from '../global/client'
import {sortObject, sortObjectFunc, toUpper} from '../global/helpers'

let OrderedList = styled.ol `
    margin: 0;
    padding: 0;
`;

export default class Snippets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
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

    // get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        Client.getAllSnippets()
        .then((data) => data.data)
        .then((res) => this.setState({ data: res.data }));
    };

    sortSnippets(data, sortMode = 'title'){
        switch (sortMode){
            case 'title':
                return sortObjectFunc(data, "title", toUpper);
            case 'new':
                return sortObject(data, "updatedAt").reverse();
            case 'old':
                return sortObject(data, "updatedAt");
            case 'placement':
                return sortObjectFunc(data, "placement", toUpper);
            case 'author':
                return sortObjectFunc(data, "author", toUpper);
            default :
                return sortObjectFunc(data, "title", toUpper);
        }
    }
    
    filterSnippet(data, tagFilters) {
        if (data && tagFilters.length) return (data.filter((e) => tagFilters.some(tag => e.tags.map(e => e.value).includes(tag))))
        return data || null
    }

    searchSnippet(data, term, location = 'title'){
        if (data && term && location) return (data.filter(e => e[location] && e[location].toLowerCase().includes(term.toLowerCase())))
        return data || null
    } 
    
    handleSnippets(data){
        let ret = data;
        ret = this.props.searchTerm ? this.searchSnippet(ret, this.props.searchTerm, this.props.searchLocation) : ret;
        ret = this.props.tagFilters.length ? this.filterSnippet(ret, this.props.tagFilters) : ret;
        ret = this.sortSnippets(ret, this.props.sortMode);
        return ret;
    }
    render() {
        let snippetsBody = this.state.data.length <= 0
        ?   'NO SNIPPETS AVAILABLE'
        :   <OrderedList>
                {this.handleSnippets(this.state.data).map(dat => (
                    <Snippet key={dat._id} data={dat} username={this.props.username}/>
                ))}
            </OrderedList>;
        return (snippetsBody)
    }
}