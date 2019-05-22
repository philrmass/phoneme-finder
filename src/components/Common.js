import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WordDisplay from './WordDisplay';
import styles from '../styles/Common.module.css';

function Common(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='common'>
      <div className={styles.common}>
        <div
          className={styles.title}
          onClick={() => setIsOpen(!isOpen)}>
          Most Common English Words
        </div>
        { isOpen && (
          <React.Fragment>
            <div className={styles.subtitle}>Phoneme Frequency</div>
            <div className={styles.words}>
              { props.defs.map((def, index) => (
                <React.Fragment key={def.word + index}>
                  <div>
                    <div className={styles.count}>{index + 1}</div>
                    <div className={styles.word}>
                      <WordDisplay def={def}/>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

Common.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object),
};

export default Common;
