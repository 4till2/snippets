import React, { Component } from 'react'
import Search from './Search'
import Tags from './Tags'

export default class Filters extends Component {
    render() {
        return (
            <div>
                <p>Filters</p>
                <Search/>
                <Tags/>
            </div>
        )
    }
}
