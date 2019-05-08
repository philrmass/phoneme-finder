import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { layout, phonemes, words } from '../lib/phonemes.js';
import PhonemeDisplay from './PhonemeDisplay';
import PhraseDisplay from './PhraseDisplay';
import WordDisplay from './WordDisplay';
import styles from '../styles/PhonemeReference.module.css';

function PhonemeReference(props) {
  const [input, setInput] = useState('');
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

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput('');
  }

  const handleClear = (e) => {
    e.preventDefault();
    setSearch('');
  }

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
          <input id='search' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className='margin-left-4' type='submit'>Search</button>
          <button className='margin-left-4' onClick={handleClear}>Clear</button>
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
