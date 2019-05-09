import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/TestWord.module.css';

function WordDisplay(props) {
  const [shownCount, setShownCount] = useState(0);
  const isComplete = props.isActive && (shownCount === props.def.phonemes.length);
  const classes = (props.isActive ? ' ' + styles.active : '') + (isComplete ? ' ' + styles.complete : '');

  const handleDoubleClick = (e) => {
    if (isComplete) {
      props.onComplete(props.def.word);
    }
    if (props.isActive) {
      setShownCount(0);
    }
    props.onActivate(props.def.word, !props.isActive);
  };

  const handleDragOver = (e) => {
    if (props.isActive && !isComplete) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dropPhoneme = e.dataTransfer.getData('text');
    if (props.isActive && !isComplete &&
      (dropPhoneme === props.def.phonemes[shownCount])) {
      setShownCount(shownCount + 1);
    }
  };

  return (
    <React.Fragment>
      { props.def && (
        <div
          className={styles.testWord + classes}
          onMouseDown={(e) => e.preventDefault()}
          onDoubleClick={handleDoubleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <div className={styles.word}>
            {props.def.word}
          </div>
          <div className={styles.phonemeWrap + classes}>
            { props.def.phonemes.map((phoneme, index) => (
              (index < shownCount) &&
              <PhonemeDisplay phoneme={phoneme} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

WordDisplay.propTypes = {
  def: PropTypes.object,
  isActive: PropTypes.bool,
  onActivate: PropTypes.func,
  onComplete: PropTypes.func,
};

export default WordDisplay;
