import React, { Component } from 'react'
import Filters from './Filters'
import Options from './Options'
import Tags from './Tags'
export default class Sidebar extends Component {
    render() {
        return (
            <React.Fragment>
            <h1>Filteration</h1>
            <div style={style}>
                <Tags />
            </div>
            </React.Fragment>
        )
    }
}

const style = {

}
