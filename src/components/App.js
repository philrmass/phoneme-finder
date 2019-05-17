import React, { useEffect, useState } from 'react';
import commonData from '../data/commonShort';
import decodedData from '../data/decoded.json';
import { useLocalStorage } from '../lib/storage';
import decoder from '../lib/decoder';
//import Common from './Common';
//import Complete from './Complete';
//import Reference from './Reference';
import Test from './Test';
import styles from '../styles/App.module.css';

function App(props) {
  const [saveUrl, setSaveUrl] = useState(undefined);
  const [test, setTest] = useLocalStorage('test', []);
  const [complete, setComplete] = useLocalStorage('complete', []);
  const [decoded, setDecoded] = useLocalStorage('decoded', decodedData);
  const decodePhrase = decoder(decoded, setDecoded).decodePhrase;
  const commonWords = commonData.map((c) => c.word);
  //??? store common index in local storage
  //??? get common (defs) up to the index
  //??? add setInterval to query more

  const save = () => {
    const testWords = test.map((t) => t.word);
    const completeWords = complete.map((c) => c.word);
    const data = {
      decoded,
      test: testWords,
      complete: completeWords,
    };
    console.log('SAVE', data);
    const file = new File([JSON.stringify(data)], '');
    setSaveUrl(window.URL.createObjectURL(file));
  };

  const addTest = (defs) => {
    console.log('ADD_TEST', defs);
    //??? restore this and display
    //setTestDefs([...defs, ...testDefs]);
  };

  const addComplete = (def) => {
    console.log('ADD_COMPLETE');
    //setTestDefs(testDefs.filter((td) => td !== def));
    //setCompleteDefs([def, ...completeDefs.filter((cd) => cd.word !== def.word)]);
  };

  return (
    <React.Fragment>
      <header class={styles.header}>
        <h1>Phoneme Finder</h1>
        { saveUrl &&
        <a href={saveUrl} download='phonmeFinder.json'>Download</a>
        }
        <button onClick={save}>Save</button>
      </header>
      <main>
        <Test
          defs={[]}
          decodePhrase={decodePhrase}
          addTest={addTest}
          addComplete={addComplete}/>
        {/*
        <Reference decoder={decoder}/>
        <Complete defs={completeDefs}/>
        <Common defs={commonDefs}/>
        */}
      </main>
    </React.Fragment>
  );
}

export default App;
