import React, { Component } from 'react';

import TillattVerdiDetails from './TillattVerdiDetails';

import { formatQuantity } from '../../services/format';


class TillattVerdi extends Component {

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
            egenskapstypeId,
            tillatt_verdi,
            vegobjekttypeId
        } = this.props;

        let expandedClass = '';
        if (this.state.isExpanded) {
            expandedClass = ' tv-list__header--expanded';
        } 

        return (
            <li className="tv-list__listitem">
                <h5 className={'tv-list__header' + expandedClass}>
                    <label className="tv-list__label">
                        <input className="tv-list__toggle" type="checkbox" checked={this.state.isExpanded} onChange={this.handleChange}  />
                        <span className="tv-list__name">{tillatt_verdi.navn} </span>
                        <span className="tv-list__id">{tillatt_verdi.id}</span>

                        {this.props.statistics && (
                            <span className="tv-list__statistics">
                                <a 
                                    href={'https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/hva:(~(id:' + vegobjekttypeId + ',filter:(~(type_id:' + egenskapstypeId + ',operator:\'*3d,verdi:(~' + tillatt_verdi.id + '))),farge:\'0_0))/hvor:(land:(~\'Norge))'} 
                                    className="tv-list__statistics-link"
                                    target="_blank">
                                    {formatQuantity(this.props.statistics[tillatt_verdi.id])}
                                </a>
                            </span>
                        )}
                    </label>
                </h5>

                {this.state.isExpanded && <TillattVerdiDetails tillatt_verdi={tillatt_verdi} />}

            </li>
        )
        
    }
}

export default TillattVerdi;