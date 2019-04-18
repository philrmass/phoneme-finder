import React from 'react';
//import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
//import WordDisplay from './WordDisplay';
import { phonemes } from '../lib/phonemes';
import styles from '../stylesheets/PhonemeReference.module.css';

function reference(categoryObj) {
  const categories = Object.keys(categoryObj);
  const elems = categories.map((category) => {
    const phonemes = categoryObj[category];
    return (
      <React.Fragment>
        <h3>{category}</h3>
        {phonemes.map((phoneme) => (
          <div>
            <PhonemeDisplay phoneme={phoneme}/>
          </div>
        ))}
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
    <div className={styles.phonemeReference}>
      <div className={styles.title} onClick={props.onToggle}>
          Phoneme Reference
      </div>
      <div>{ JSON.stringify(props.words) }</div>
      <div>{ JSON.stringify(props.defs) }</div>
      <div className={styles.phonemes}>
        { props.isOpen ? reference(phonemes) : null }
      </div>
    </div>
  );
}

/* <WordDisplay word='hello' /> */

export default PhonemeReference;
