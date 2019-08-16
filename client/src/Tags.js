import React, { Component } from 'react';
import Client from './Client';

export default class Tags extends Component {
    state = {
        data: {},
        value: ''
    };

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        Client.getAllTags()
        .then(result => {this.setState({data: result.data})})
    }
    addTag = () => {
        Client.addTag(this.state.value)
        .then(result => {
            console.log(result)
            document.getElementById('new-tag').value = '';
        })
        
    }
    handleClick = (e) => {
        (e.button === 2) ? this.deleteTag(e) : this.toggleFilter(e);
    }
    
    deleteTag = (e) => {
        e.preventDefault()
        let response = prompt("Do you want to delete this tag? Yes / No");
        if (response.toLowerCase() == 'yes'){
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
            <div>
                <span>Create New</span>
                <input
                    id="new-tag"
                    type="text"
                    onChange={(e) => this.setState({ value: e.target.value })}
                    placeholder="Gimme a snippet"  
                ></input>
                <button onClick={() => this.addTag()}>Add</button>
            </div>
            </React.Fragment>
        )
    }
}
