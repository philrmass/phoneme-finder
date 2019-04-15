import React from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';

function PhraseDisplay(props) {
  return (
    <React.Fragment>
      {props.phrase.map((word) => (
        <WordDisplay word={word} />
      ))}
    </React.Fragment>
  );
}

PhraseDisplay.propTypes = {
  word: PropTypes.arrayOf(PropTypes.object)
};

export default PhraseDisplay;
