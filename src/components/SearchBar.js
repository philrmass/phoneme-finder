import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ term: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor='term'></label>
        <input id='term' type='text' value={this.state.term} onChange={this.onChange} />
        <button type='submit'>Search</button>
      </form>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export default SearchBar;
