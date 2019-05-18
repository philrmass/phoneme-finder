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
      props.onComplete(props.def);
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
          <div className={styles.topRow}>
            <div className={styles.word}>
              {props.def.word}
            </div>
            { props.isActive &&
            <button
              className={styles.button}
              onClick={() => props.onRemove(props.def)}>
              {isComplete ? '^' : 'X'}
              { /*??? add buttonIcon(isComplete), make x and checkmark */}
              <svg width='100%' height='100%' viewBox='0 0 100 100'>
                <polygon points='5,95 95,95 50,5' strokeWidth='5%' stroke='1' fill='red' />)
              </svg>
            </button>
            }
          </div>
          <div className={styles.phonemeWrap + classes}>
            { props.def.phonemes.map((phoneme, index) => (
              (index < shownCount) &&
              <PhonemeDisplay
                key={phoneme}
                phoneme={phoneme} />
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
  onRemove: PropTypes.func,
  onComplete: PropTypes.func,
};

export default WordDisplay;
