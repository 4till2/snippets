import React, { Component } from 'react';
import Client from './global/client';
import { SnippetTag, Button } from './global/styles';

export default class Tags extends Component {
    state = {
        data: {},
        intervalIsSet: false
    };

    componentDidMount() {
        this.getTagsFromDb()
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getTagsFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }
  
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
        }
    }
    getTagsFromDb = () => {
        Client.getAllTags()
        .then(result => {this.setState({data: result.data})})
    }
    addTag = () => {
        let tag = prompt("New Tag:");
        Client.addTag(tag)
        .then(result => {
            console.log(result)
        }) 
    }
    handleClick = (e) => {
        (e.button === 2) ? this.deleteTag(e) : this.toggleFilter(e);
    }
    
    deleteTag = (e) => {
        e.preventDefault()
        let response = prompt("Password to DELETE this tag:");
        if (response === 'letmein'){
            let id = this.state.data.filter(tag => tag.label === e.target.innerText)[0]._id
            if (id) Client.deleteTag(id)
        }
    }
    toggleFilter = (e) => {
        this.props.toggleFilter(e.target.getAttribute('data-value'))
        e.target.classList.toggle('active');
    }
    render() {
        return (
            <React.Fragment>
            <div>
                {Array.from(this.state.data).map((e) => <SnippetTag key={e._id} data-value={e.value} onClick={this.handleClick} onContextMenu={this.deleteTag} selectable >{e.label}</SnippetTag>)}
                <Button onClick={() => this.addTag()} margin="5px">Add</Button>
            </div>
            </React.Fragment>
        )
    }
}
