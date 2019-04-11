import React, { Component } from 'react';
import SearchBar from './SearchBar';
import PhonemeDisplay from './PhonemeDisplay';

class PhonemeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: 'searched'
    };
    this.handleSearch = this.handleSearch.bind();
  }

  handleSearch(term) {
    const searched = term;
    console.log('search', searched);
    //this.setState({ searched: searched });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.handleSearch} />
        <PhonemeDisplay text={this.state.searched} />
      </React.Fragment>
    );
  }
}

export default PhonemeContainer;
