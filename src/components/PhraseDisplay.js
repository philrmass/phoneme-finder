import React from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';

function PhraseDisplay(props) {
  return (
    <React.Fragment>
      {props.defs.map((def) => (
        <WordDisplay key={def.word} def={def} />
      ))}
    </React.Fragment>
  );
}

PhraseDisplay.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object)
};

export default PhraseDisplay;
