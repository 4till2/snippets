import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Snippets from './Snippets'
import { Container, Col, Row } from 'react-bootstrap';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            sortMode: '',
            tagFilters: []
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.changeSort = this.changeSort.bind(this)
    }

    toggleFilter(tag){
        let update = [...this.state.tagFilters]
        update.includes(tag) ? update = update.filter(e => e != tag) : update.push(tag)
        this.setState({tagFilters: update})
    }
    changeSort(sort){
        this.setState({sortMode: sort})
    }
    render() {
        return (
            <div className="mx-auto px-5" style = {style}>
                <Row>        
                    <Col lg={3}>
                        <Sidebar toggleFilter={this.toggleFilter} changeSort={this.changeSort}/>
                    </Col>
                    <Col lg={9}>
                        <Snippets sortMode={this.state.sortMode} tagFilters={this.state.tagFilters}/>
                    </Col>
                </Row>
            </div>

        )
    }
}

const style = {
    // height: '100vh'
}
