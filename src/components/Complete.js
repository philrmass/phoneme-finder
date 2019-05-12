import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PhraseDisplay from './PhraseDisplay';
import styles from '../styles/Complete.module.css';

function Complete(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='complete'>
      <div className={styles.complete}>
        <div 
          className={styles.title} 
          onClick={() => setIsOpen(!isOpen)}>
          Complete Words
        </div>
        { isOpen && (
          <React.Fragment>
            <PhraseDisplay defs={props.defs}/>
            <div className={styles.subtitle}>Phoneme Frequency</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

Complete.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object),
};

export default Complete;
