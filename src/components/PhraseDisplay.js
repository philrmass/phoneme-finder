import React from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';

function PhraseDisplay(props) {
  return (
    <div className='phraseDisplay'>
      {props.phrase.map((word) => (
        <WordDisplay word={word} />
      ))}
    </div>
  );
}

PhraseDisplay.propTypes = {
  word: PropTypes.arrayOf(PropTypes.object)
};

export default PhraseDisplay;
