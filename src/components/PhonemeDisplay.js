import React from 'react';
import { phonemeToSymbol } from '../lib/symbols';
import { phonemes } from '../lib/phonemes';

function PhonemeDisplay(props) {
  console.log('symbol', phonemeToSymbol('AE'));
  console.log('categories', Object.keys(phonemes));
  return (
    <div>
      {props.decoded}
    </div>
  );
}

export default PhonemeDisplay;
