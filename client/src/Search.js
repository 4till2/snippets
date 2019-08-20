import React, { Component } from 'react'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

export default class Search extends Component {
    render() {
        return (
            <div>
                <form>
                    <input className="search-bar" onChange={this.props.handleSearchTerm} />
                    <div onChange={this.props.handleSearchLocation}>
                        <input type="radio" id="searchLocation1" name="location" value="title"/>
                        <label for="searchLocation1">Title</label>
                        <input type="radio" id="searchLocation2" name="location" value="description"/>
                        <label for="searchLocation2">Description</label>
                        <input type="radio" id="searchLocation3" name="location" value="jscode"/>
                        <label for="searchLocation3">Javascript</label>
                        <input type="radio" id="searchLocation4" name="location" value="csscode"/>
                        <label for="searchLocation4">CSS</label>
                    </div>
                </form>
            </div>
        )
    }
}