import React, { useEffect } from 'react';
import decodedInitial from '../data/decoded.json';
import decoder from '../lib/decoder';
//import Common from './Common';
//import Complete from './Complete';
//import Reference from './Reference';
import Test from './Test';
import styles from '../styles/App.module.css';

function App(props) {
  //const decoded = { greeting: 'hello' };
  const decodePhrase = decoder(decodedInitial).decodePhrase;
  //const [completeDefs, setCompleteDefs] = useState([]);
  //const [commonDefs, setCommonDefs] = useState([]);
  //const [testDefs, setTestDefs] = useState([]);
  //const [decoder] = useState(new Decoder());

  useEffect(() => {
    console.log('START', decodePhrase);
  }, []);
  /*
  const key = 'testDefs';
  const initialValue = [];
  useEffect(() => {
    const value = localStorage.getItem(key);
    console.log('GET', value, localStorage.length);
    */
    /*
    for(const i in localStorage) {
      console.log('  ', i);
    }
    */
  //});
  /*
  useEffect(() => {
    const [value, setValue] = useState(initialValue);
    const keyValue = localStorage.getItem(key);
    console.log('get', keyValue, typeof(keyValue));
  });
  */
  /*
  useEffect(() => {
    if (testDefs.length === 0) {
      const defString = window.localStorage && window.localStorage.getItem('_testDefs');
      let defs;
      if (defString) {
        defs = JSON.parse(defString);
      }
      if (Array.isArray(defs)) {
        setTestDefs(defs);
      }
    } else {
      if (window.localStorage) {
        window.localStorage.setItem('_testDefs', JSON.stringify(testDefs));
      }
    }
  }, [testDefs]);
  */

  /*
  useEffect(() => {
    if (completeDefs.length === 0) {
      const defString = window.localStorage && window.localStorage.getItem('_completeDefs');
      let defs;
      if (defString) {
        defs = JSON.parse(defString);
      }
      if (Array.isArray(defs)) {
        setCompleteDefs(defs);
      }
    } else {
      if (window.localStorage) {
        window.localStorage.setItem('_completeDefs', JSON.stringify(completeDefs));
      }
    }
  }, [completeDefs]);
  */

  const save = () => {
    console.log('SAVE');
  };

  const addTest = (defs) => {
    console.log('ADD_TEST');
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
