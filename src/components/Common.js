import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
            <div>Common Word</div>
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
