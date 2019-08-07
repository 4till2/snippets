import React, { Component } from 'react'
export default class Placement extends Component {
    state = {
        value: this.props.value || ''
    }
    handleChange(e){
        this.props.handleChange(e);
        this.setState({value: e})
    }

    render() {
        return (
                <div className="placement">
                    <select
                    value={this.state.value}
                    onChange={(e) => this.handleChange(e.target.value)}>
                    <option disabled value=''> -- select an option -- </option>
                    <option value="account-global">Account Global</option>
                    <option value="test-global">Test Global</option>
                    <option value="variation-custom">Variation Custom Code</option>
                    <option value="test-targeting">Test Custom Targeting</option>
                </select>
            </div>
        )
    }
}
