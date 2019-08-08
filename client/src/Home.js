import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Snippets from './Snippets'
import { Container, Col, Row } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div className="mx-auto px-5" style = {style}>
                <Row>        
                    <Col lg={3}>
                        
                    </Col>
                    <Col lg={9}>
                        <Snippets />
                    </Col>
                </Row>
            </div>

        )
    }
}

const style = {
    // height: '100vh'
}
