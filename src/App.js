import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import queryString from 'query-string';

import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import VegobjekttypeListe from './VegobjekttypeListe';
import Vegobjekttype from './Vegobjekttype';


const API = 'https://www.vegvesen.no/nvdb/api/v2';
const HEADERS = {
    Accept: 'application/vnd.vegvesen.nvdb-v2+json'
};


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

        return (
            <Layout>

                <Header />
                
                <Switch>


                    <Route exact path="/" render={({location}) => {
                        const sort = queryString.parse(location.search).sort;

                        return <VegobjekttypeListe vegobjekttyper={this.state.vegobjekttyper} sort={sort} />;
                    }}/>

                    <Route path="/:id" render={({match}) => {
                        const id = match.params.id;

                        if (!this.state[id]) {
                            this.fetchVegobjekttype(id); 
                        }

                        return <Vegobjekttype match={match} vegobjekttype={this.state[id]} />;
                    }}/>

                </Switch>

                <Footer />

            </Layout>
        );
    }
}

export default App;
