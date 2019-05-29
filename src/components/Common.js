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
  const [results, setResults] = useState([]);
  const resultsMax = 100;

  useEffect(() => {
    if (frequencyIsOpen) {
      const [frequencies, total] = getFrequencies(props.countDefs.map((dc) => dc[1]));
      setFrequencies(frequencies);
      setFrequenciesTotal(total);
    }
  }, [frequencyIsOpen, props.countDefs]);

  useEffect(() => {
    const count = 0;
    setResults(props.countDefs.slice(count, count + resultsMax));
  }, [props.countDefs]);

  return (
    <div className='common'>
      <div className={styles.common}>
        <div
          className={styles.title}
          onClick={() => setIsOpen(!isOpen)}>
          Most Common English Words
        </div>
        { isOpen && (
          <React.Fragment>
            <div
              className={styles.subtitle}
              onClick={() => setFrequencyIsOpen(!frequencyIsOpen)}>
              Phoneme Frequency
              { frequencyIsOpen && (
                <FrequencyGraph
                  values={frequencies}
                  total={frequenciesTotal}/>
              )}
            </div>
            <div className={styles.words}>
              { results.map((countDef, index) => (
                <React.Fragment key={countDef[1].word + index}>
                  <div>
                    <div className={styles.count}>{countDef[0]}</div>
                    <div className={styles.word}>
                      <WordDisplay def={countDef[1]}/>
                    </div>
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
