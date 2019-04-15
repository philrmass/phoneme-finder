import React, { Component } from 'react';
import SearchBar from './SearchBar';
import PhonemeDisplay from './PhonemeDisplay';
import Decoder from '../api/decoder';

class PhonemeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: 'searched'
    };
    this.decoder = new Decoder();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(term) {
    if(term) {
      this.decoder.decodePhrase(term).then((decoded) => {
        Promise.all(decoded).then((values) => {
          this.setState({ searched: JSON.stringify(values) });
        });
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.handleSearch} />
        <PhonemeDisplay decoded={this.state.searched} />
      </React.Fragment>
    );
  }
}

export default PhonemeContainer;
