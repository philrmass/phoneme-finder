import React from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/WordDisplay.module.css';

function WordDisplay(props) {
  return (
    <React.Fragment>
      { props.def && (
      <div className={styles.wordDisplay}>
        <div className={styles.word}>
          {props.def.word}
        </div>
        <div className={styles.phonemeWrap}>
          {props.def.phonemes.map((phoneme, index) => (
            <PhonemeDisplay
              key={`${props.def.word}:${phoneme}:${index}`}
              phoneme={phoneme}/>
          ))}
        </div>
      </div>
      )}
    </React.Fragment>
  );
}

WordDisplay.propTypes = {
  def: PropTypes.object,
};

export default WordDisplay;
