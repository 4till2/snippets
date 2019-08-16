import React, { Component } from 'react'

export default class Sort extends Component {
    render() {
        return (
            <div>
               <select onChange={e => this.props.changeSort(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="new">Newest first</option>
                    <option value="old">Oldest first</option>
                    <option value="placement">Placement</option>
                    <option value="author">Author</option>
                </select> 
            </div>
        )
    }
}
