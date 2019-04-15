import React from 'react';
import PropTypes from 'prop-types';
import { phonemeToSymbol } from '../lib/symbols';
import { phonemes } from '../lib/phonemes';

function PhonemeDisplay(props) {
  console.log('symbol', phonemeToSymbol('AE'));
  console.log('categories', Object.keys(phonemes));
  return (
    <div>
      {props.phoneme}
    </div>
  );
}

PhonemeDisplay.propTypes = {
  phoneme: PropTypes.string
};

export default PhonemeDisplay;
