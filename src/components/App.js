import React, { Component } from 'react';
import SearchBar from './SearchBar';

function App(props) {
  return (
    <React.Fragment>
      <header>
        <h1>Phoneme Finder</h1>
      </header>
      <main>
        <SearchBar />
        <div>Stuff</div>
      </main>
    </React.Fragment>
  );
}

export default App;
