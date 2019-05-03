import React from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/TestWord.module.css';

function WordDisplay(props) {
  const handleDragOver = (e) => {
    //??? if is active
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('drop', props.isActive, props.def.word, e.dataTransfer.getData('text'));
    //??? if is active and phoneme matches next one, and not off the end
    //??? add shownCount state
    //??? set done class if all shown
  }

  return (
    <React.Fragment>
      { props.def && (
        <div 
          className={`${styles.testWord} ${props.isActive ? styles.active : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
        <div className={styles.word}>
          {props.def.word}
        </div>
        <div className={`${styles.phonemeWrap} ${props.isActive ? styles.active : ''}`}>
          { /*
            props.def.phonemes.map((phoneme) => (
            <PhonemeDisplay phoneme={phoneme} />
          )) */ }
        </div>
      </div>
      )}
    </React.Fragment>
  );
}

WordDisplay.propTypes = {
  def: PropTypes.object,
  isActive: PropTypes.bool,
};

export default WordDisplay;
