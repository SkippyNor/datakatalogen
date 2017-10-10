import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import VegobjekttypeActions from './VegobjekttypeActions';
import VegobjekttypeInfo from './VegobjekttypeInfo';
import VegobjekttypeHeader from './VegobjekttypeHeader';
import Relasjonstyper from './Relasjonstyper/Relasjonstyper';
import Egenskapstyper from './Egenskapstyper/Egenskapstyper';
import Search from '../Search';

import { getStatisticsVot } from '../../services/server';


class Vegobjekttype extends Component {

    state = { 
        expandAll: false 
    };

    static defaultProps = {
        vegobjekttype: {}
    }

    toggleExpand = (value) => {
        this.setState({
            expandAll: value
        });
    } 

    setStatistics = (egenskapstype, statistics) => {
        this.setState({
            [egenskapstype]: statistics
        });
    }

    initVegobjekttype = (id) => {
        getStatisticsVot(id).then(json => {
            this.setState({
                total: json.antall
            });
        });
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.initVegobjekttype(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.initVegobjekttype(this.props.id);
        } 
    }


    render() {

        const {
            history,
            vegobjekttype,
            vegobjekttyper
        } = this.props;

        if (vegobjekttype.navn) {
            document.title = vegobjekttype.navn + ' (' + vegobjekttype.id + ') fra Nasjonal vegdatabank Datakatalog';
        }



        return [

            <section className="layout__search-container" key="layout__search-container">

                <Search 
                    vegobjekttyper={vegobjekttyper} 
                    history={history} 
                />

                <p className="layout__all-vot">
                    <Link to="/" className="layout__all-vot-link">
                        <span className="layout__all-vot-link-text">
                            Se alle vegobjekttyper
                        </span>
                    </Link>
                </p>
            </section>,

            <VegobjekttypeHeader 
                vegobjekttype={vegobjekttype} 
                statistics={this.state.total} 
                key="vegobjekttypeheader" 
            />,

            <VegobjekttypeActions 
                vegobjekttype={vegobjekttype} 
                expandAll={this.state.expandAll} 
                setStatistics={this.setStatistics} 
                toggleExpand={this.toggleExpand} 
                key="vegobjekttypeactions" 
            />,


            <div className="layout__columns" key="columns">
                <div className="layout__column1">

                    <Egenskapstyper
                        state={this.state}
                        vegobjekttype={vegobjekttype}
                    />

                </div>
                <div className="layout__column2">

                    <Relasjonstyper 
                        expandAll={this.state.expandAll} 
                        vegobjekttype={vegobjekttype} 
                    />

                    <VegobjekttypeInfo 
                        vegobjekttype={vegobjekttype}
                    />

                </div>
            </div>
        ];
    }
}

export default Vegobjekttype;
