import React, { Component } from 'react'
import Title from './Title'
import Description from './Description'
import Tags from './Tags'

export default class Header extends Component {
    render() {
        return (
            <div>
                <p>Header</p>
                <Title/>
                <Description/>
                <Tags/>
            </div>
        )
    }
}
