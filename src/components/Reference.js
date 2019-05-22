import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import groups from '../data/groups';
import groupPhonemes from '../data/groupPhonemes';
import words from '../data/words';
import PhonemeDisplay from './PhonemeDisplay';
import PhraseDisplay from './PhraseDisplay';
import WordDisplay from './WordDisplay';
import styles from '../styles/Reference.module.css';

function Reference(props) {
  const phonemes = groups.reduce((phonemes, group) => {
    return groupPhonemes[group].reduce((phonemes, phoneme) => [...phonemes, phoneme], phonemes);
  }, []);
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [searchDefs, setSearchDefs] = useState([]);
  const [referenceDefs, setReferenceDefs] = useState({});

  useEffect(() => {
    if (search) {
      props.decodePhrase(search).then((decoded) => {
        setSearchDefs(decoded);
      });
    } else {
      setSearchDefs([]);
    }
  }, [search]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput('');
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearch('');
  };

  useEffect(() => {
    const phrase = Object.values(words).join(' ');
    props.decodePhrase(phrase).then((decoded) => {
        setReferenceDefs(decoded.reduce((dict, def) => {
          return { ...dict, [def.word]: def };
        }, {}));
    });
  }, []);

  function phonemeKey(phoneme, def) {
    return (
      <React.Fragment key={phoneme}>
        <div className={styles.phonemeKey}>
          <span className={styles.phoneme}>
            <PhonemeDisplay phoneme={phoneme}/>
          </span>
          <WordDisplay def={def}/>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className='phonemeReference'>
      <div className={styles.phonemeReference}>
        <form onSubmit={onSubmit}>
          <label
            className={styles.title}
            htmlFor='search'
            onClick={() => setIsOpen(!isOpen)}>
            Phoneme Reference
          </label>
          <input id='search' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className='margin-left-4' type='submit'>Search</button>
          <button className='margin-left-4' onClick={handleClear}>Clear</button>
        </form>
        <div className={styles.searchDisplay}>
          <PhraseDisplay defs={searchDefs}/>
        </div>
        <div className={styles.group}>
          { phonemes.map((phoneme) => phonemeKey(phoneme, referenceDefs[words[phoneme]])) }
        </div>
      </div>
    </div>
  );
}

Reference.propTypes = {
  decodePhrase: PropTypes.func,
};

export default Reference;
