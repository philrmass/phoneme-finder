import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import phonemes from '../data/phonemes.json';
import PhraseDisplay from './PhraseDisplay';
import styles from '../styles/Complete.module.css';

function Complete(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [frequencyIsOpen, setFrequencyIsOpen] = useState(false);
  const [frequencies, setFrequencies] = useState({});

  useEffect(() => {
    if (frequencyIsOpen) {
      const zeros = phonemes.reduce((freqs, p) => {
        return { ...freqs, [p]: 0 };
      }, {});
      const frequencies = props.defs.reduce((frequencies, d) => {
        return d.phonemes.reduce((frequencies, p) => {
          frequencies[p]++;
          return frequencies;
        }, frequencies);
      }, zeros);
      const sorted = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
      //?? sort, put into an array
      console.log('FREQ', frequencies, sorted);
    }
  }, [frequencyIsOpen, props.defs]);

  return (
    <div className='complete'>
      <div className={styles.complete}>
        <div
          className={styles.title}
          onClick={() => setIsOpen(!isOpen)}>
          Complete Words
        </div>
        { isOpen && (
          <React.Fragment>
            <div
              className={styles.subtitle}
              onClick={() => setFrequencyIsOpen(!frequencyIsOpen)}>
              Phoneme Frequency
            </div>
            <PhraseDisplay defs={props.defs}/>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

Complete.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object),
};

export default Complete;
