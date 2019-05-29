import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFrequencies } from '../lib/frequencies';
import FrequencyGraph from './FrequencyGraph';
import WordDisplay from './WordDisplay';
import styles from '../styles/Common.module.css';

function Common(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [frequencyIsOpen, setFrequencyIsOpen] = useState(true);
  const [frequencies, setFrequencies] = useState([]);
  const [frequenciesTotal, setFrequenciesTotal] = useState(0);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const resultsMax = 100;

  useEffect(() => {
    if (frequencyIsOpen) {
      const [frequencies, total] = getFrequencies(props.countDefs.map((dc) => dc[1]));
      setFrequencies(frequencies);
      setFrequenciesTotal(total);
    }
  }, [frequencyIsOpen, props.countDefs]);

  useEffect(() => {
    const value = parseInt(search, 10);
    let picked;

    if (value) {
      picked = props.countDefs.slice(value - 1, value - 1 + resultsMax);
      if (picked.length > 0) {
        setMessage(`Showing ${picked.length} common words starting at number ${value}`);
      } else {
        setMessage('No common words to show');
      }
    } else if (search) {
      picked = props.countDefs.filter((def) => def[1].word.includes(search));
      if (picked.length > 0) {
        setMessage(`Showing ${picked.length} common words that contain '${search}'`);
      } else {
        setMessage(`No common words contain '${search}'`);
      }
    } else {
      picked = (props.countDefs.slice(0, resultsMax));
      setMessage('');
    }
    setResults([]);
    setTimeout(() => setResults(picked), 10);
  }, [props.countDefs, search]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput('');
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch('');
    setMessage('');
  };

  return (
    <div className='common'>
      <div className={styles.common}>
        <div
          className='title'
          onClick={() => setIsOpen(!isOpen)}>
          Most Common English Words
        </div>
        { isOpen && (
          <React.Fragment>
            <div
              className='subtitle'
              onClick={() => setFrequencyIsOpen(!frequencyIsOpen)}>
              Phoneme Frequency
              { frequencyIsOpen && (
                <FrequencyGraph
                  values={frequencies}
                  total={frequenciesTotal}/>
              )}
            </div>
            <div>
              <form onSubmit={onSubmit}>
                <input
                  type='text'
                  placeholder='Number or word fragment'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}/>
                <button className='margin-left-4' type='submit'>Search</button>
                <button className='margin-left-4' onClick={handleReset}>Reset</button>
                <span className={styles.message}>{message}</span>
              </form>
            </div>
            <div className={styles.words}>
              { results.map((countDef, index) => (
                <React.Fragment key={countDef[1].word + index}>
                  <div>
                    <div className={styles.count}>{countDef[0]}</div>
                    <WordDisplay def={countDef[1]}/>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

Common.propTypes = {
  countDefs: PropTypes.arrayOf(PropTypes.array),
};

export default Common;
