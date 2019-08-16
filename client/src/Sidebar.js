import React, { Component } from 'react'

import Tags from './Tags'
import Sort from './Sort'

export default class Sidebar extends Component {
    render() {
        return (
            <React.Fragment>
            <h1>Filteration</h1>
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
