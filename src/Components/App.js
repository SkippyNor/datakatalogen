import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import queryString from 'query-string';

import Header from './Header';
import Footer from './Footer';
import VegobjekttypeList from './VegobjekttypeList/VegobjekttypeList';
import Vegobjekttype from './Vegobjekttype/Vegobjekttype';

import { getVegobjekttyper, getVegobjekttype } from '../services/server';


const REGEX = /([0-9]+)/;


class App extends Component {

    state = {
        vegobjekttyper: []
    };

    fetchVegobjekttype (id) {
        getVegobjekttype(id).then(json => {
            this.setState({[id]: json});
        })
    }

    componentDidMount() {
        getVegobjekttyper().then(json => {
            this.setState({vegobjekttyper: json});
        })
    }

    render() {

        return [

            <Header key="header" />,
            
            <Switch key="main">

                <Route exact path="/" render={({location, history}) => {
                    const sort = queryString.parse(location.search).sort;

                    return <VegobjekttypeList history={history} vegobjekttyper={this.state.vegobjekttyper} sort={sort} />;
                }}/>

                <Route path="/:id" render={({match, history}) => {

                    const id = REGEX.exec(match.params.id)[1];

                    if (!this.state[id]) {
                        this.fetchVegobjekttype(id); 
                    }

                    return <Vegobjekttype history={history} id={id} vegobjekttyper={this.state.vegobjekttyper} vegobjekttype={this.state[id]} />;
                }}/>

            </Switch>,

            <Footer key="footer" />

        ];
    }
}

export default App;
