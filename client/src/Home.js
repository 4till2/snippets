import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

export default class Home extends Component {
    render() {
        return (
            <div className="home" style = {style}> 
                {/* <Sidebar/> */}
                <Content/>
            </div>
        )
    }
}

const style = {

}
