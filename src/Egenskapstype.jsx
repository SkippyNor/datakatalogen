import React, { Component } from 'react';

import EgenskapstypeDetails from './EgenskapstypeDetails';
import TillattVerdi from './TillattVerdi';



class Egenskapstype extends Component {

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
            egenskapstype,
            expandAll,
            statistics,
            vegobjekttypeId
        } = this.props;

        if (egenskapstype.tillatte_verdier) {
            egenskapstype.tillatte_verdier.sort((a, b) => {
                return parseInt(a.sorteringsnummer, 10) - parseInt(b.sorteringsnummer, 10);
            });
        }

        let expandedClass = '';
        if (this.state.isExpanded) {
            expandedClass = ' et-section__header--expanded';
        } 

        return (
            <li className="et-section__listitem">
                <h4 className={'et-section__header' + expandedClass}>
                    <label className="et-section__label">
                        <input className="et-section__toggle" type="checkbox" checked={this.state.isExpanded} onChange={this.handleChange}  />
                        <span className="et-section__name">{egenskapstype.navn} </span>
                        <span className="et-section__id">{egenskapstype.id}</span>

                        {statistics && (
                            <span className="et-section__statistics">
                                <a 
                                    href={'https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/hva:(~(id:' + vegobjekttypeId + ',filter:(~(type_id:' + egenskapstype.id + ',operator:\'*21*3d,verdi:null)),farge:\'0_0))/hvor:(land:(~\'Norge))'} 
                                    className="et-section__statistics-link"
                                    target="_blank">
                                    {statistics.sum}
                                </a>
                            </span>
                        )}
                    </label>
                </h4>

                {this.state.isExpanded && <EgenskapstypeDetails egenskapstype={egenskapstype} />}

                {egenskapstype.tillatte_verdier ? (
                    <ul className="tv-list">
                        {egenskapstype.tillatte_verdier.map(tillatt_verdi => (
                            <TillattVerdi 
                                key={tillatt_verdi.id} 
                                vegobjekttypeId={vegobjekttypeId} 
                                egenskapstypeId={egenskapstype.id} 
                                tillatt_verdi={tillatt_verdi} 
                                statistics={statistics} 
                                expandAll={expandAll} />
                        ))}
                    </ul>
                ) : (
                    <p className="et-section__datatype">
                        &lt;{egenskapstype.datatype_tekst}&gt;
                    </p>
                )}

            </li>
        )
        
    }
}

export default Egenskapstype;