import React, { useEffect, useState } from 'react';
import { words } from '../lib/phonemes.js';
import Decoder from '../lib/decoder';
import PhraseDisplay from './PhraseDisplay';
import PhonemeReference from './PhonemeReference';
import SearchBar from './SearchBar';

function PhonemeContainer(props) {
  const [decoder] = useState(new Decoder());
  const [search, setSearch] = useState('');
  const [searchDefs, setSearchDefs] = useState([]);
  const [referenceIsOpen, setReferenceIsOpen] = useState(true);
  const [referenceDefs, setReferenceDefs] = useState({});

  useEffect(() => {
    if(search) {
      decoder.decodePhrase(search).then((decoded) => {
        Promise.all(decoded).then((defs) => {
          setSearchDefs(defs);
        });
      });
    } else {
      setSearchDefs([]);
    }
  }, [search]);

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

  const handleReferenceToggle = () => {
    setReferenceIsOpen(!referenceIsOpen);
  }

  return (
    <React.Fragment>
      <SearchBar onSearch={setSearch} />
      <PhraseDisplay defs={searchDefs} />
      <PhonemeReference 
        defs={referenceDefs}
        isOpen={referenceIsOpen}
        onToggle={handleReferenceToggle} />
    </React.Fragment>
  );
}

export default PhonemeContainer;
