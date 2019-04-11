import React from 'react';
import PhonemeContainer from './PhonemeContainer';

function App(props) {
  return (
    <React.Fragment>
      <header>
        <h1>Phoneme Finder</h1>
      </header>
      <main>
        <PhonemeContainer />
      </main>
    </React.Fragment>
  );
}

export default App;
