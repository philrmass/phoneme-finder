import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/TestWord.module.css';

function WordDisplay(props) {
  const [shownCount, setShownCount] = useState(0);
  const [clickTime, setClickTime] = useState(0);
  const [dropError, setDropError] = useState(false);
  const isComplete = props.isActive && (shownCount === props.def.phonemes.length);
  const classes = (props.isActive ? ' ' + styles.active : '') +
    (isComplete ? ' ' + styles.complete : '') +
    (dropError ? ' ' + styles.dropError : '');

  useEffect(() => {
    if (dropError) {
      setTimeout(() => setDropError(false), 400);
    }
  }, [dropError]);

  const handleClick = (e) => {
    e.preventDefault();
    const now = Date.now();
    if ((now - clickTime) < 500) {
      handleDoubleClick(e);
    }
    setClickTime(now);
  };

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
    } else {
      setDropError(true);
    }
  };

  const createButton = (isComplete, { def, onRemove, onComplete }) => {
    const path = isComplete ? 'M5 50 L 50 95 L 95 5' : 'M5 5 L 95 95 M 5 95 L 95 5';
    return (
      <button
        className={styles.button}
        onClick={ isComplete ? () => onComplete(def) : () => onRemove(def) }>
        <svg width='100%' height='100%' viewBox='0 0 100 100'>
          <path d={path} fill='transparent' stroke='#808080' strokeWidth='10'/>
        </svg>
      </button>);
  };

  return (
    <React.Fragment>
      { props.def && (
        <div
          className={styles.testWord + classes}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <div className={styles.topRow}>
            <div className={styles.word}>
              {props.def.word}
            </div>
            { props.isActive &&
                createButton(isComplete, props) }
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
