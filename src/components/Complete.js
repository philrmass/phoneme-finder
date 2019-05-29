import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFrequencies } from '../lib/frequencies';
import FrequencyGraph from './FrequencyGraph';
import PhraseDisplay from './PhraseDisplay';
import styles from '../styles/Complete.module.css';

function Complete(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [frequencyIsOpen, setFrequencyIsOpen] = useState(false);
  const [frequencies, setFrequencies] = useState([]);
  const [frequenciesTotal, setFrequenciesTotal] = useState(0);

  useEffect(() => {
    if (frequencyIsOpen) {
      const [frequencies, total] = getFrequencies(props.defs);
      setFrequencies(frequencies);
      setFrequenciesTotal(total);
    }
  }, [frequencyIsOpen, props.defs]);

  return (
    <div className='complete'>
      <div className={styles.complete}>
        <div
          className='title'
          onClick={() => setIsOpen(!isOpen)}>
          Complete Words
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
