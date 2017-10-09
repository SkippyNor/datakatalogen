import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Relasjonstype from './Relasjonstype';
import Egenskapstype from './Egenskapstype';
import Search from './Search';


import { formatQuantity } from './format';


const API = 'https://www.vegvesen.no/nvdb/api/v2';
const HEADERS = {
    Accept: 'application/vnd.vegvesen.nvdb-v2+json'
};

class Vegobjekttype extends Component {

    state = { 
        expandAll: false 
    };

    static defaultProps = {
        vegobjekttype: {}
    }

    handleChange = (e) => {
        this.setState({
            expandAll: e.target.checked
        });
    }

    getStatistics = () => {

        const vegobjekttype = this.props.vegobjekttype;


        vegobjekttype.egenskapstyper.forEach(egenskapstype => {

            let statistics = {};

            let tillatte_verdier = [];
            if (egenskapstype.tillatte_verdier) {
                tillatte_verdier = egenskapstype.tillatte_verdier;
            }

            Promise.all(tillatte_verdier.map(tillatt_verdi => {

                const url = API + '/vegobjekter/' + vegobjekttype.id + '/statistikk?egenskap=%22' + egenskapstype.id + '=' + tillatt_verdi.id + '%22';

                return fetch(url, HEADERS)
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        statistics[tillatt_verdi.id] = json.antall;
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            }))
            .then(() => {

                const url = API + '/vegobjekter/' + vegobjekttype.id + '/statistikk?egenskap=%22' + egenskapstype.id + '!=null%22';

                fetch(url, HEADERS)
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        statistics.sum = json.antall;

                        this.setState({
                            [egenskapstype.id]: statistics
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                
            })

        });

    }

    componentDidMount() {

        const url = API + '/vegobjekter/' + this.props.id + '/statistikk';

        fetch(url, HEADERS)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    total: json.antall
                });
            })
            .catch((error) => {
                console.error(error);
            });


        window.scrollTo(0, 0);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.id !== this.props.id) {
            window.scrollTo(0, 0);   
        }
    }


    render() {

        const vegobjekttype = this.props.vegobjekttype;

        if (vegobjekttype.navn) {
            document.title = vegobjekttype.navn + ' (' + vegobjekttype.id + ') fra Nasjonal vegdatabank Datakatalog';
        }

        let hasForeldre = false;
        if (vegobjekttype.relasjonstyper && vegobjekttype.relasjonstyper.foreldre.length > 0) {
            hasForeldre = true;
            vegobjekttype.relasjonstyper.foreldre.sort(function(a, b) {
                return a.type.navn.localeCompare(b.type.navn);
            });
        }

        let hasBarn = false;
        if (vegobjekttype.relasjonstyper && vegobjekttype.relasjonstyper.barn.length > 0) {
            hasBarn = true;
            vegobjekttype.relasjonstyper.barn.sort(function(a, b) {
                return a.type.navn.localeCompare(b.type.navn);
            });
        }

        if (vegobjekttype.styringsparametere) {
            Object.keys(vegobjekttype.styringsparametere).forEach(key => {
                if (vegobjekttype.styringsparametere[key] === true) {
                    vegobjekttype.styringsparametere[key] = 'Ja';
                } else if (vegobjekttype.styringsparametere[key] === false) {
                    vegobjekttype.styringsparametere[key] = 'Nei'
                }
            })
        }

        return [

            <section className="layout__search-container" key="layout__search-container">
                <Search vegobjekttyper={this.props.vegobjekttyper} history={this.props.history} />

                <p className="layout__all-vot">
                    <Link to="/" className="layout__all-vot-link">
                        <span className="layout__all-vot-link-text">
                            Se alle vegobjekttyper
                        </span>
                    </Link>
                </p>
            </section>,

            <header className="vot-header" key="vot-header">
                <h2 className="vot-header__name">
                    {vegobjekttype.navn}
                    <span className="vot-header__id"> {vegobjekttype.id}</span>
                </h2>
                <p className="vot-header__description">
                    {vegobjekttype.beskrivelse}
                </p>
                {vegobjekttype.veiledning && (
                    <p className="vot-header__guidance">
                        {vegobjekttype.veiledning}
                    </p>
                )}
                <dl className="vot-header__statistics-dl">
                    <dt className="vot-header__statistics-dt">
                        Antall vegobjekter
                    </dt>
                    <dd className="vot-header__statistics-dd">
                        <a
                            href={'https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/hva:(~(id:' + vegobjekttype.id + ',filter:(~),farge:\'0_0))/hvor:(land:(~\'Norge))'} 
                            className="vot-header__statistics-link"
                            target="_blank"> {formatQuantity(this.state.total)}</a>
                    </dd>
                </dl>
            </header>,


            <ul className="vot-actions" key="vot-actions">
                <li className="vot-actions__action">
                    <button className="vot-actions__statistics-button" type="button" onClick={this.getStatistics}>
                        <span className="vot-actions__statistics-title">
                            Hent statistikk
                        </span>
                    </button>
                </li>
                <li className="vot-actions__action">
                    <label className={this.state.expandAll ? 'vot-actions__details-label vot-actions__details-label--expanded' : 'vot-actions__details-label'}>
                        <input className="vot-actions__details-toggle" type="checkbox" checked={this.state.expandAll} onChange={this.handleChange}  />
                        <span className="vot-actions__details-title">
                            {this.state.expandAll ? 'Skjul detaljer' : 'Se detaljer' }
                        </span>
                    </label>
                </li>
            </ul>,


            <div className="columns" key="columns">


                <div className="columns__column1">

                    {vegobjekttype.egenskapstyper && (
                        <section className="et-section">
                            <h3 className="et-section__title">Egenskapstyper</h3>

                            <ul className="et-section__list">
                            {vegobjekttype.egenskapstyper.map(egenskapstype => (
                                <Egenskapstype 
                                    key={egenskapstype.id} 
                                    vegobjekttypeId={vegobjekttype.id} 
                                    egenskapstype={egenskapstype} 
                                    expandAll={this.state.expandAll} 
                                    statistics={this.state[egenskapstype.id]} />
                            ))}
                            </ul>

                        </section>

                    )} 

                </div>


                <div className="columns__column2">

                    {hasForeldre && (
                        <section className="rt-section">
                            <h3 className="rt-section__title">Foreldre</h3>

                            <ul className="rt-section__list">
                            {vegobjekttype.relasjonstyper.foreldre.map(relasjonstype => (
                                <Relasjonstype 
                                    key={relasjonstype.id} 
                                    expandAll={this.state.expandAll} 
                                    relasjonstype={relasjonstype} />
                            ))}
                            </ul>

                        </section>

                    )} 

                    {hasBarn && (
                        <section className="rt-section">
                            <h3 className="rt-section__title">Barn</h3>

                            <ul className="rt-section__list">
                            {vegobjekttype.relasjonstyper.barn.map(relasjonstype => (
                                <Relasjonstype 
                                    key={relasjonstype.id} 
                                    expandAll={this.state.expandAll} 
                                    relasjonstype={relasjonstype} />
                            ))}
                            </ul>

                        </section>

                    )} 

                    

                    <section className="vot-info">
                        <h3 className="vot-info__title">Mer informasjon</h3>

                        <dl className="vot-info__dl">
                            <dt className="vot-info__dt">
                                Stedfesting
                            </dt>
                            <dd className="vot-info__dd">
                                {vegobjekttype.stedfesting}
                            </dd>
                        </dl>

                        <dl className="vot-info__dl">
                            <dt className="vot-info__dt">
                                Sorteringsnummer
                            </dt>
                            <dd className="vot-info__dd">
                                {vegobjekttype.sorteringsnummer}
                            </dd>
                        </dl>
                        
                        {vegobjekttype.sosinvdbnavn && (
                            <dl className="vot-info__dl">
                                <dt className="vot-info__dt">
                                    Sosinvdbnavn
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.sosinvdbnavn}
                                </dd>
                            </dl>
                        )}
                        
                        {vegobjekttype.objektliste_dato && (
                            <dl className="vot-info__dl">
                                <dt className="vot-info__dt">
                                    Objektlistedato
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.objektliste_dato}
                                </dd>
                            </dl>
                        )}
                        

                        {vegobjekttype.styringsparametere && [

                            <dl className="vot-info__dl" key="tidsrom_relevant">
                                <dt className="vot-info__dt">
                                    Tidsromrelevant
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.tidsrom_relevant}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="sektype_20k">
                                <dt className="vot-info__dt">
                                    Sekundærtype 2 OK
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.sektype_20k}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="abstrakt_type">
                                <dt className="vot-info__dt">
                                    Abstrakt type
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.abstrakt_type}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="filtrering">
                                <dt className="vot-info__dt">
                                    Filtrering
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.filtrering}
                                </dd>
                            </dl>,
                        
                            
                            <dl className="vot-info__dl" key="avledet">
                                <dt className="vot-info__dt">
                                    Avledet
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.avledet}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="må_ha_mor">
                                <dt className="vot-info__dt">
                                    Må ha mor
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.må_ha_mor}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="er_dataserie">
                                <dt className="vot-info__dt">
                                    Er dataserie
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.er_dataserie}
                                </dd>
                            </dl>,

                            <dl className="vot-info__dl" key="overlapp">
                                <dt className="vot-info__dt">
                                    Overlapp
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.overlapp}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="kjørefelt_relevant">
                                <dt className="vot-info__dt">
                                    Kjørefeltrelevant
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.kjørefelt_relevant}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="sideposisjon_relevant">
                                <dt className="vot-info__dt">
                                    Sideposisjonrelevant
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.sideposisjon_relevant}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="høyde_relevant">
                                <dt className="vot-info__dt">
                                    Høyderelevant
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.høyde_relevant}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="retning_relevant">
                                <dt className="vot-info__dt">
                                    Retningsrelevant
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.retning_relevant}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="flyttbar">
                                <dt className="vot-info__dt">
                                    Flyttbar
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.flyttbar}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="ajourhold_i">
                                <dt className="vot-info__dt">
                                    Ajourhold i
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.ajourhold_i}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="ajourhold_splitt">
                                <dt className="vot-info__dt">
                                    Ajourhold splitt
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.ajourhold_splitt}
                                </dd>
                            </dl>,
                            
                            <dl className="vot-info__dl" key="dekningsgrad">
                                <dt className="vot-info__dt">
                                    Dekningsgrad
                                </dt>
                                <dd className="vot-info__dd">
                                    {vegobjekttype.styringsparametere.dekningsgrad}
                                </dd>
                            </dl>
                        ]}





                    </section>

                </div>

            </div>

        ];
    }
}

export default Vegobjekttype;
