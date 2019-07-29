import React, { Component } from 'react'
import Javascript from './Javascript'
import Css from './Css'

export default class Code extends Component {
    render() {
        return (
            <div>
                <p>Code</p>
                <Javascript/>
                <Css/>
            </div>
        )
    }
}
