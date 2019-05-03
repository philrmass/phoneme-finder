import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar(props) {
  const [search, setSearch] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSearch(search);
    setSearch('');
  };

  return (
    <form onSubmit={onSubmit}>
    <label htmlFor='search'></label>
    <input id='search' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
    <button type='submit'>Search</button>
    </form>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export default SearchBar;
