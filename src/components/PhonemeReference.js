import React from 'react';
//import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import WordDisplay from './WordDisplay';
import { layout, phonemes } from '../lib/phonemes';
import styles from '../stylesheets/PhonemeReference.module.css';

function group(groupName, categoryDict, wordDict, defDict) {
  const phonemes = categoryDict[groupName];
  return (
    <div className='phonemeGroup'>
      {phonemes.map((phoneme) => {
        const def = defDict[wordDict[phoneme]];
        return (
          <div className='phoneme'>
            <span className='phonemeTitle'>
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
    <div className='phonemeBox'>
      {box.map((groupName) => (
        <React.Fragment>
          <div className='phonemeGroupName'>{groupName}</div>
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
      <div className={styles.title} onClick={props.onToggle}>
          Phoneme Reference
      </div>
      <div className='phonemeBoxes'>
        { props.isOpen ? reference(layout, phonemes, props.words, props.defs) : null }
      </div>
    </div>
  );
}

export default PhonemeReference;
