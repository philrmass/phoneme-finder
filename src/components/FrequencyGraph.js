import React from 'react';
import PropTypes from 'prop-types';

function FrequencyGraph(props) {
  return (
    <React.Fragment>
      <div>{JSON.stringify(props.values)} : {props.total}</div>
    </React.Fragment>
  );
}

FrequencyGraph.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array),
  total: PropTypes.number,
};

export default FrequencyGraph;
