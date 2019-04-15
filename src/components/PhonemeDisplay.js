import React from 'react';
import PropTypes from 'prop-types';
import { phonemeToSymbol } from '../lib/symbols';
import { phonemes } from '../lib/phonemes';
import styles from '../stylesheets/PhonemeDisplay.module.css';

function PhonemeDisplay(props) {
  console.log('symbol', phonemeToSymbol('AE'));
  console.log('categories', Object.keys(phonemes));
  return (
    <div className={styles.phonemeDisplay}>
      <div className={styles.symbol}>
        SY
      </div>
      <div className={styles.phoneme}>
        {props.phoneme}
      </div>
    </div>
  );
}

PhonemeDisplay.propTypes = {
  phoneme: PropTypes.string
};

export default PhonemeDisplay;
