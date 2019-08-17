import React, { Component } from 'react'

import Tags from './Tags'
import Sort from './Sort'
import Search  from './Search';

export default class Sidebar extends Component {
    render() {
        return (
            <React.Fragment>
            <h1>Search</h1>
            <div>
                <Search handleSearchTerm={this.props.handleSearchTerm} handleSearchLocation={this.props.handleSearchLocation} />
            </div>
            <h1>Filter</h1>
            <div style={style}>
                <Tags toggleFilter={this.props.toggleFilter}/>
            </div>
            <h1>Sort</h1>
            <div>
                <Sort changeSort={this.props.changeSort}/>
            </div>
            </React.Fragment>
        )
    }
}

const style = {

}
