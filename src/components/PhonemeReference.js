import React from 'react';
import PropTypes from 'prop-types';
import { layout, phonemes, words } from '../lib/phonemes.js';
import PhonemeDisplay from './PhonemeDisplay';
import WordDisplay from './WordDisplay';
import styles from '../styles/PhonemeReference.module.css';

function PhonemeReference(props) {
  function phonemeKey(phoneme, def) {
    return (
      <React.Fragment>
        <div className={styles.phonemeKey}>
          <span className={styles.phoneme}>
            <PhonemeDisplay phoneme={phoneme}/>
          </span>
          <WordDisplay def={def}/>
        </div>
      </React.Fragment>
    );
  }

  function phonemeGroup(group, defs) {
    return (
      <React.Fragment>
        <div className={styles.groupName}>{group}</div>
        <div className={styles.group}>
          {phonemes[group].map((phoneme) => phonemeKey(phoneme, defs[words[phoneme]]))}
        </div>
      </React.Fragment>
    );
  }

  function phonemeColumn(column, defs) {
    return (
      <div className={styles.column}>
        {column.map((group) => phonemeGroup(group, defs))}
      </div>
    );
  }

  return (
    <div className='phonemeReference'>
      <div className={styles.phonemeReference}>
        <div className={styles.title} onClick={props.onToggle}>
          Phoneme Reference
        </div>
        <div className={styles.columns}>
          { props.isOpen && layout.map((column) => phonemeColumn(column, props.defs)) }
        </div>
      </div>
    </div>
  );
}

PhonemeReference.propTypes = {
  defs: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default PhonemeReference;
