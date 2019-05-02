import React, { useEffect, Component } from 'react';
import SearchBar from './SearchBar';
import PhraseDisplay from './PhraseDisplay';
import PhonemeReference from './PhonemeReference';
import Decoder from '../api/decoder';
import { words } from '../lib/phonemes';

class PhonemeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: [],
      referenceIsOpen: true,
      referenceDefs: {}
    };
    this.decoder = new Decoder();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReferenceToggle = this.handleReferenceToggle.bind(this);
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

  handleReferenceToggle() {
    this.setState((lastState) => ({ 
      referenceIsOpen: !lastState.referenceIsOpen
    }));
  }

  componentDidMount() {
    const allWords = Object.values(words).join(' ');
    this.decoder.decodePhrase(allWords).then((decoded) => {
      Promise.all(decoded).then((values) => {
        const defs = values.reduce((dict, word) => {
          return { ...dict, [word.word]: word };
        }, {});
        this.setState({ referenceDefs: defs });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.handleSearch} />
        <PhraseDisplay phrase={this.state.searched} />
        <PhonemeReference 
          defs={this.state.referenceDefs}
          isOpen={this.state.referenceIsOpen} 
          onToggle={this.handleReferenceToggle} />
      </React.Fragment>
    );
  }
}

export default PhonemeContainer;
