import React, { Component } from 'react'
import Author from './Author'
import Date from './Date'
import Placement from './Placement'

export default class Info extends Component {
    render() {
        return (
            <div>
                <p>Info</p>
                <Author/>
                <Date/>
                <Placement/>
            </div>
        )
    }
}
