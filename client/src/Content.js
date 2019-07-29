import React, { Component } from 'react'
import Snippets from './Snippets'

export default class Content extends Component {
    render() {
        return (
            <div className="content" style={style}>
                <Snippets />
            </div>
        )
    }
}

const style = {

}
