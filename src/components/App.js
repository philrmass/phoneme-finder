import React, { useEffect, useState } from 'react';
import Decoder from '../lib/decoder';
import Common from './Common';
import Complete from './Complete';
import Reference from './Reference';
import Test from './Test';

function App(props) {
  const [completeDefs, setCompleteDefs] = useState([]);
  const [commonDefs, setCommonDefs] = useState([]);
  const [testDefs, setTestDefs] = useState([]);
  const [decoder] = useState(new Decoder());

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

  const addTest = (defs) => {
    setTestDefs([...defs, ...testDefs]);
  };

  const addComplete = (def) => {
    setTestDefs(testDefs.filter((td) => td !== def));
    setCompleteDefs([def, ...completeDefs.filter((cd) => cd.word != def.word)]);
  };

  return (
    <React.Fragment>
      <header>
        <h1>Phoneme Finder</h1>
      </header>
      <main>
        <Test
          defs={testDefs}
          decoder={decoder}
          addTest={addTest}
          addComplete={addComplete}/>
        <Reference decoder={decoder}/>
        <Complete defs={completeDefs}/>
        <Common defs={commonDefs}/>
      </main>
    </React.Fragment>
  );
}

export default App;
