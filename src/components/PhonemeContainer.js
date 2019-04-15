import React, { Component } from 'react';
import SearchBar from './SearchBar';
import PhraseDisplay from './PhraseDisplay';
import Decoder from '../api/decoder';
//??? add prop types

class PhonemeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: []
    };
    this.decoder = new Decoder();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(term) {
    if(term) {
      this.decoder.decodePhrase(term).then((decoded) => {
        Promise.all(decoded).then((values) => {
          this.setState({ searched: values });
        });
      });
    }
  }

  render() {
    console.log('searched', this.state.searched);
    return (
      <React.Fragment>
        <SearchBar onSearch={this.handleSearch} />
        <PhraseDisplay phrase={this.state.searched} />
      </React.Fragment>
    );
  }
}

export default PhonemeContainer;
