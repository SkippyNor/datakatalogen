import React, { Component } from 'react';


function HighlightQuery ({name, query}) {

    const index = name.toLowerCase().indexOf(query.toLowerCase());

    const before = name.substring(0, index);
    const highlight = name.substr(index, query.length);
    const after = name.substr(index+query.length);

    return (
        <span className="search__name">
            {before}
            <strong>{highlight}</strong>
            {after}
        </span>
    );
}

class Search extends Component {

    state = {
        query: '', 
        suggestions: [], 
        selectedIndex: -1
    };

    handleChange = (e) => {

        const query = e.target.value;

        let suggestions = [];
        let selectedIndex = -1;

         this.props.vegobjekttyper.sort((a, b) => {
            return a.navn.localeCompare(b.navn);
        });

        if (query.length > 1) {

            suggestions = this.props.vegobjekttyper.filter(vegobjekttype => {
                return vegobjekttype.navn.toLowerCase().startsWith(query.toLowerCase());
            });

            this.props.vegobjekttyper.forEach(vegobjekttype => {
                if (vegobjekttype.navn.toLowerCase().includes(query.toLowerCase(), 1)) {
                    if (suggestions.indexOf(vegobjekttype) < 0) {
                        suggestions.push(vegobjekttype);
                    }
                }
            });


            selectedIndex = 0;
        }

        this.setState({
            query: query,
            suggestions: suggestions,
            selectedIndex: selectedIndex
        });
    };

    handleKeyDown = (e) => {

        switch(e.key) {

            case 'Enter':
                if (this.state.selectedIndex > -1) {
                    this.changeRoute(this.state.selectedIndex)
                }
                break;


            case 'ArrowUp':
                if (this.state.selectedIndex > 0) {
                    this.setState({ 
                        selectedIndex: this.state.selectedIndex - 1
                    });
                }
                e.preventDefault();
                break;

            case 'ArrowDown':
                if (this.state.selectedIndex < this.state.suggestions.length - 1) {
                    this.setState({ 
                        selectedIndex: this.state.selectedIndex + 1
                    });   
                }
                break;


            case 'Escape':

                this.setState({
                    query: '', 
                    suggestions: [], 
                    selectedIndex: -1
                });
                break;

            default: 

        }
    };

    changeRoute = (index) => {
        const suggestion = this.state.suggestions[index];

        this.setState({
            query: '', 
            suggestions: [], 
            selectedIndex: -1
        });

        this.props.history.push('/' + suggestion.id + '-' + suggestion.navn);
    }


    render() {

        return (
            <div className="search">
                <input 
                    className="search__input"
                    value={this.state.query} 
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown} 
                    ref={node => this.searchField = node}
                    type="text" 
                />

                <ul className="search__list">
                    {this.state.suggestions.map((suggestion, index) => {
                        return (
                            <li 
                                className={this.state.selectedIndex === index ? 'search__listitem search__listitem--active' : 'search__listitem'}
                                onClick={(e) => { this.changeRoute(index)}}
                                key={suggestion.id}>
                                <HighlightQuery name={suggestion.navn} query={this.state.query} />
                                <span className="search__id"> {suggestion.id}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );

    }
}

export default Search;