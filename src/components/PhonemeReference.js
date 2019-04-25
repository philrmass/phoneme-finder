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
            <PhonemeDisplay phoneme={phoneme}/>
            <WordDisplay word={def}/>
          </div>
        );
      })}
    </div>
  );
}

function ref(layout, categoryDict, wordDict, defDict) {
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

function reference(categoryDict, wordDict, defDict) {
  const categories = Object.keys(categoryDict);
  const elems = categories.map((category) => {
    const phonemes = categoryDict[category];
    return (
      <React.Fragment>
        <h3>{category}</h3>
        {phonemes.map((phoneme) => {
          const def = defDict[wordDict[phoneme]];
          return (
            <div>
              <PhonemeDisplay phoneme={phoneme}/>
              <WordDisplay word={def}/>
            </div>
          );
        })}
      </React.Fragment>
    );
  });
  return (
    <React.Fragment>
      {elems}
    </React.Fragment>
  );
}

function PhonemeReference(props) {
  return (
    <div>
      <div className={styles.title} onClick={props.onToggle}>
          Phoneme Reference
      </div>
      <div className='phonemeReference'>
        { props.isOpen ? ref(layout, phonemes, props.words, props.defs) : null }
      </div>
      <div className={styles.phonemes}>
        { props.isOpen ? reference(phonemes, props.words, props.defs) : null }
      </div>
    </div>
  );
}

/* <WordDisplay word='hello' /> */

export default PhonemeReference;
