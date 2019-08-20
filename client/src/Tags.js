import React, { Component } from 'react';
import Client from './Client';

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
        if (prompt("Password to create Tag?") == 'letmein'){
            let tag = prompt("New Tag:");
            Client.addTag(tag)
            .then(result => {
                console.log(result)
            })
        }
        
    }
    handleClick = (e) => {
        (e.button === 2) ? this.deleteTag(e) : this.toggleFilter(e);
    }
    
    deleteTag = (e) => {
        e.preventDefault()
        let response = prompt("Password to DELETE this tag:");
        if (response == 'letmein'){
            let id = this.state.data.filter(tag => tag.label == e.target.innerText)[0]._id
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
                {Array.from(this.state.data).map((e) => <span className="snippet-tag" data-value={e.value} onClick={this.handleClick} onContextMenu={this.deleteTag} >{e.label}</span>)}
            </div>
             <button onClick={() => this.addTag()}>Add</button>
            </React.Fragment>
        )
    }
}