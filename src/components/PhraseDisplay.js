import React from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';

function PhraseDisplay(props) {
  return (
    <div className='phraseDisplay'>
      {props.defs.map((def) => (
        <WordDisplay def={def} />
      ))}
    </div>
  );
}

PhraseDisplay.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object)
};

export default PhraseDisplay;
