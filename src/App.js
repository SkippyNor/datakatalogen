import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import queryString from 'query-string';

import Header from './Header';

import Footer from './Footer';
import VegobjekttypeListe from './VegobjekttypeListe';
import Vegobjekttype from './Vegobjekttype';


const API = 'https://www.vegvesen.no/nvdb/api/v2';
const HEADERS = {
    Accept: 'application/vnd.vegvesen.nvdb-v2+json'
};
const REGEX = /([0-9]+)/;


class App extends Component {


    state = {
        vegobjekttyper: []
    };

    fetchVegobjekttype (id) {
        const url = API + '/vegobjekttyper/' + id;

        fetch(url, HEADERS)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({[id]: json});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {

        const url = API + '/vegobjekttyper';

        fetch(url, HEADERS)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({vegobjekttyper: json});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        return [

            <Header key="header" />,
            
            <Switch key="main">


                <Route exact path="/" render={({location, history}) => {
                    const sort = queryString.parse(location.search).sort;

                    return <VegobjekttypeListe history={history} vegobjekttyper={this.state.vegobjekttyper} sort={sort} />;
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
