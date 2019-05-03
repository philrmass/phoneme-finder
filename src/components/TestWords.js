import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/TestWords.module.css';

function TestWords(props) {
  const [testWords, setTestWords] = useState([]);
  const [search, setSearch] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setTestWords([...testWords, search]);
    console.log('TEST ADD', search, testWords);
    setSearch('');
  };

  return (
    <div className='testWords'>
      <div className={styles.testWords}>
        <form onSubmit={onSubmit}>
          <label className={styles.title} htmlFor='search' onClick={props.onToggle}>Test Words</label>
          <input id='search' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button type='submit'>Add</button>
          </form>
        { props.isOpen && <div>OPEN</div> }
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
