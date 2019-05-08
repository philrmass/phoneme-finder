import React, { useState } from 'react';
import Decoder from '../lib/decoder';
import PhonemeReference from './PhonemeReference';
import TestWords from './TestWords';

function App(props) {
  const [decoder] = useState(new Decoder());
  const [testIsOpen, setTestIsOpen] = useState(true);
  const [referenceIsOpen, setReferenceIsOpen] = useState(true);

  const handleTestToggle = () => {
    setTestIsOpen(!testIsOpen);
  }

  const handleReferenceToggle = () => {
    setReferenceIsOpen(!referenceIsOpen);
  }

  return (
    <React.Fragment>
      <header>
        <h1>Phoneme Finder</h1>
      </header>
      <main>
        <TestWords 
          decoder={decoder}
          isOpen={testIsOpen}
          onToggle={handleTestToggle}/>
        <PhonemeReference 
          decoder={decoder}
          isOpen={referenceIsOpen}
          onToggle={handleReferenceToggle}/>
      </main>
    </React.Fragment>
  );
}

export default App;
