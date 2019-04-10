import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  render() {
    return (
      <div>Search</div>
    )
  }
}

export default SearchBar;
