import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TestWord from './TestWord';
import styles from '../styles/TestWords.module.css';

function TestWords(props) {
  const [testDefs, setTestDefs] = useState([]);
  const [search, setSearch] = useState('hat shout');

  const onSubmit = (e) => {
    e.preventDefault();
    props.decoder.decodePhrase(search).then((decoded) => {
      Promise.all(decoded).then((defs) => {
        setTestDefs([...testDefs, ...defs]);
      });
    });
    setSearch('');
  };

  const handleComplete = (word) => {
    console.log('complete', word);
  }

  return (
    <div className='testWords'>
      <div className={styles.testWords}>
        <form onSubmit={onSubmit}>
          <label className={styles.title} htmlFor='search' onClick={props.onToggle}>Test Words</label>
          <input id='search' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button type='submit'>Add</button>
        </form>
        <div className={styles.wordsWrap}>
          { props.isOpen && testDefs.map((def) => 
            (<TestWord 
              def={def}
              onComplete={handleComplete}/>)) }
          </div>
      </div>
    </div>
  )
}

TestWords.propTypes = {
  decoder: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default TestWords;
