import React from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../stylesheets/WordDisplay.module.css';

function WordDisplay(props) {
  return (
    <React.Fragment>
      <div className={styles.wordDisplay}>
        <div>{props.word.word}</div>
        <div>{props.word.ipa}</div>
        <div>
          {props.word.phonemes.map((phoneme) => (
            <PhonemeDisplay phoneme={phoneme} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

WordDisplay.propTypes = {
  word: PropTypes.object
};

export default WordDisplay;
