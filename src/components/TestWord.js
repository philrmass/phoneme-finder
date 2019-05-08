import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/TestWord.module.css';

function WordDisplay(props) {
  const [isActive, setIsActive] = useState(false);
  const [shownCount, setShownCount] = useState(0);

  const handleDoubleClick = (e) => {
    setIsActive(!isActive);
    if(!isActive) {
      setShownCount(0);
    }
    if (shownCount === props.def.phonemes.length) {
      props.onComplete(props.def.word);
      setIsActive(false);
    }
  }

  const handleDragOver = (e) => {
    if (isActive && (shownCount < props.def.phonemes.length)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dropPhoneme = e.dataTransfer.getData('text');
    if (isActive && 
      (shownCount < props.def.phonemes.length) &&
      (dropPhoneme === props.def.phonemes[shownCount]))
    {
      setShownCount(shownCount + 1);
    }
  }

  let classes = styles.testWord;
  classes += isActive ? (' ' + styles.active) : '';
  classes += (isActive && (shownCount === props.def.phonemes.length)) ? (' ' + styles.complete) : '';

  return (
    <React.Fragment>
      { props.def && (
        <div 
          className={classes}
          onMouseDown={(e) => e.preventDefault()}
          onDoubleClick={handleDoubleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
        <div className={styles.word}>
          {props.def.word}
        </div>
        <div className={`${styles.phonemeWrap} ${isActive ? styles.active : ''}`}>
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
  onComplete: PropTypes.func
};

export default WordDisplay;
