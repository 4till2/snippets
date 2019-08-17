import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <p>{this.props.userName}</p>
            </div>
        )
    }
}
