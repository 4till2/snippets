import React, { Component } from 'react'
import Filters from './Filters'
import Options from './Options'

export default class Sidebar extends Component {
    render() {
        return (
            <div style={style}>
                <p>Sidebar</p>
               <Filters/>
               <Options/> 
            </div>
        )
    }
}

const style = {

}
