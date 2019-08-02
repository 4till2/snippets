import React, { Component } from 'react';
import Client from './Client';
import Select from 'react-select';

export default class TagsInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }
    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        Client.getAllTags()
        .then(result => {this.setState({data: result.data})})
    }

    render() {
        return (
            <Select
            name="inputTags"
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={this.props.tags || ''}
            options={this.state.data}
            onChange={(e) => this.props.update(e)}
            />
        );
    }
}