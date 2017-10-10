import React, { Component } from 'react';

import RelasjonstypeDetails from './RelasjonstypeDetails';


class Relasjonstype extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.expandAll
        };
    }

    handleChange = (e) => {
        this.setState({
            isExpanded: e.target.checked
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isExpanded: nextProps.expandAll
        });
    }

    render() {

        const {
            relasjonstype
        } = this.props;

        let expandedClass = '';
        if (this.state.isExpanded) {
            expandedClass = ' rt-section__header--expanded';
        } 

        return (
            <li className="rt-section__listitem">

                <h4 className={'rt-section__header' + expandedClass}>
                    <label className="rt-section__label">
                        <input className="rt-section__toggle" type="checkbox" checked={this.state.isExpanded} onChange={this.handleChange}  />
                        <span className="rt-section__name">{relasjonstype.type.navn} </span>
                        <span className="rt-section__id">{relasjonstype.type.id}</span>
                    </label>
                </h4>

                {this.state.isExpanded && <RelasjonstypeDetails relasjonstype={relasjonstype} />}

            </li>
        )
    }
}

export default Relasjonstype;