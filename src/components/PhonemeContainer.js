import React, { useEffect, useState } from 'react';
import { words } from '../lib/phonemes.js';
//import SearchBar from './SearchBar';
//import PhraseDisplay from './PhraseDisplay';
import PhonemeReference from './PhonemeReference';
import Decoder from '../api/decoder';

function PhonemeContainer(props) {
  const [decoder] = useState(new Decoder());
  const [referenceIsOpen, setReferenceIsOpen] = useState(true);
  const [referenceDefs, setReferenceDefs] = useState({});

  useEffect(() => {
    const phrase = Object.values(words).join(' ');
    decoder.decodePhrase(phrase).then((decoded) => {
      Promise.all(decoded).then((values) => {
        setReferenceDefs(values.reduce((dict, def) => {
          return { ...dict, [def.word]: def };
        }, {}));
      });
    });
  }, []);

  /*
  constructor(props) {
    super(props);
    this.state = {
      searched: [],
    };
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

*/
  const handleReferenceToggle = () => {
    setReferenceIsOpen(!referenceIsOpen);
  }

  return (
    <React.Fragment>
      {/*
      <SearchBar onSearch={this.handleSearch} />
      <PhraseDisplay phrase={this.state.searched} />
      */}
      <PhonemeReference 
        defs={referenceDefs}
        isOpen={referenceIsOpen}
        onToggle={handleReferenceToggle} />
    </React.Fragment>
  );
}

export default PhonemeContainer;
