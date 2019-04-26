import React from 'react';
//??? add prop types to phoneme reference
//import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import WordDisplay from './WordDisplay';
import { layout, phonemes } from '../lib/phonemes';
import styles from '../stylesheets/PhonemeReference.module.css';

//??? clean up phoneme reference functions
function group(groupName, categoryDict, wordDict, defDict) {
  const phonemes = categoryDict[groupName];
  return (
    <div className={styles.group}>
      {phonemes.map((phoneme) => {
        const def = defDict[wordDict[phoneme]];
        return (
          <div className={styles.phoneme}>
            <span className={styles.phonemeKey}>
              <PhonemeDisplay phoneme={phoneme}/>
            </span>
            <WordDisplay word={def}/>
          </div>
        );
      })}
    </div>
  );
}

function reference(layout, categoryDict, wordDict, defDict) {
  const boxes = layout.map((box) => (
    <div className={styles.boxWrap}>
      {box.map((groupName) => (
        <React.Fragment>
          <div className={styles.groupName}>{groupName}</div>
          {group(groupName, categoryDict, wordDict, defDict)}
        </React.Fragment>
      ))}
    </div>
  ));
  return boxes;
}

function PhonemeReference(props) {
  return (
    <div className='phonemeReference'>
      <div className={styles.phonemeReference}>
        <div className={styles.title} onClick={props.onToggle}>
          Phoneme Reference
        </div>
        <div className={styles.boxes}>
          { props.isOpen ? reference(layout, phonemes, props.words, props.defs) : null }
        </div>
      </div>
    </div>
  );
}

export default PhonemeReference;
