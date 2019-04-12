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
      this.decoder.decodeWord(term).then((decoded) => {
        console.log('search', decoded);
        this.setState({ searched: JSON.stringify(decoded)});
      });
    }
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
