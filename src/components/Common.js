import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';
import styles from '../styles/Common.module.css';

function Common(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(100);
  const [results, setResults] = useState([]);
  const resultsMax = 100;

  useEffect(() => {
    setResults(props.countDefs.slice(count, count + resultsMax));
  }, [props.countDefs, count]);

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
            <div className={styles.subtitle}>Phoneme Frequency</div>
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
