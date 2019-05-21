import React from 'react';
import PropTypes from 'prop-types';
import PhonemeDisplay from './PhonemeDisplay';
import styles from '../styles/FrequencyGraph.module.css';

function FrequencyGraph(props) {
  const max = props.values.length && props.values[0][1];
  return (
    <React.Fragment>
      <div className={styles.graph}>
        { props.values.map((value) => {
          const totalPercent = 100 * (value[1] / props.total);
          const barPercent = 100 * (value[1] / max);
          return (
            <React.Fragment key={value[0]}>
              <div className={styles.percent}>{totalPercent.toFixed(1)}%</div>
              <div className={styles.label}>
                <PhonemeDisplay phoneme={value[0]}/>
              </div>
              <div className={styles.count}>{value[1]}</div>
              <div
                className={styles.bar}
                style={{ width: `${barPercent}%` }}></div>
              <div className={styles.spacer}></div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
}

FrequencyGraph.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array),
  total: PropTypes.number,
};

export default FrequencyGraph;
