import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { layout, phonemes, words } from '../lib/phonemes.js';
import PhonemeDisplay from './PhonemeDisplay';
import PhraseDisplay from './PhraseDisplay';
import SearchBar from './SearchBar';
import WordDisplay from './WordDisplay';
import styles from '../styles/PhonemeReference.module.css';

function PhonemeReference(props) {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [searchDefs, setSearchDefs] = useState([]);
  const [referenceDefs, setReferenceDefs] = useState({});

  useEffect(() => {
    if(search) {
      props.decoder.decodePhrase(search).then((decoded) => {
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
    props.decoder.decodePhrase(phrase).then((decoded) => {
      Promise.all(decoded).then((values) => {
        setReferenceDefs(values.reduce((dict, def) => {
          return { ...dict, [def.word]: def };
        }, {}));
      });
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
    setQuery('');
  }

  function phonemeKey(phoneme, def) {
    return (
      <React.Fragment>
        <div className={styles.phonemeKey}>
          <span className={styles.phoneme}>
            <PhonemeDisplay phoneme={phoneme}/>
          </span>
          <WordDisplay def={def}/>
        </div>
      </React.Fragment>
    );
  }

  function phonemeGroup(group, defs) {
    return (
      <React.Fragment>
        <div className={styles.groupName}>{group}</div>
        <div className={styles.group}>
          {phonemes[group].map((phoneme) => phonemeKey(phoneme, defs[words[phoneme]]))}
        </div>
      </React.Fragment>
    );
  }

  function phonemeColumn(column, defs) {
    return (
      <div className={styles.column}>
        {column.map((group) => phonemeGroup(group, defs))}
      </div>
    );
  }

  return (
    <div className='phonemeReference'>
      <div className={styles.phonemeReference}>
        <form onSubmit={onSubmit}>
          <label className={styles.title} htmlFor='search' onClick={props.onToggle}>
            Phoneme Reference
          </label>
          <input id='search' type='text' value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button type='submit'>Search</button>
        </form>
        <div className={styles.searchDisplay}>
          <PhraseDisplay defs={searchDefs}/>
        </div>
        <div className={styles.columns}>
          { props.isOpen && layout.map((column) => phonemeColumn(column, referenceDefs)) }
        </div>
      </div>
    </div>
  );
}

PhonemeReference.propTypes = {
  decoder: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default PhonemeReference;
