import React from 'react';
import { phonemeToSymbol } from '../lib/symbols';
import { phonemes } from '../lib/phonemes';

function PhonemeDisplay(props) {
  console.log('pts', phonemeToSymbol('AE'));
  console.log('pts', Object.keys(phonemes));
  return (
    <div>
      {props.text}
    </div>
  );
}

export default PhonemeDisplay;
