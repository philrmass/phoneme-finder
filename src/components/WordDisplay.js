import React from 'react';
import PropTypes from 'prop-types';
import styles from '../stylesheets/WordDisplay.module.css';

function WordDisplay(props) {
  return (
    <React.Fragment>
      <div className={styles.wordDisplay}>
        {JSON.stringify(props.word)}
      </div>
    </React.Fragment>
  );
}

WordDisplay.propTypes = {
  word: PropTypes.object
};

export default WordDisplay;
