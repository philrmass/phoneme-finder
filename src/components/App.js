import React, { useEffect, useState } from 'react';
import commonData from '../data/common';
import decodedData from '../data/decoded';
import { useLocalStorage } from '../lib/storage';
import decoder from '../lib/decoder';
import Common from './Common';
import Complete from './Complete';
import Reference from './Reference';
import Test from './Test';
import styles from '../styles/App.module.css';

function App(props) {
  const [saveUrl, setSaveUrl] = useState(undefined);
  const [test, setTest] = useLocalStorage('test', []);
  const [complete, setComplete] = useLocalStorage('complete', []);
  const [decoded, setDecoded] = useLocalStorage('decoded', decodedData);
  const decodePhrase = decoder(decoded, setDecoded).decodePhrase;
  const commonWords = commonData.map((c) => c.word);
  const [common, setCommon] = useState([]);
  const [commonIndex, setCommonIndex] = useLocalStorage('commonIndex', 10);

  useEffect(() => {
    const words = commonWords.slice(0, commonIndex).join(' ');
    decodePhrase(words).then((decoded) => {
        setCommon([...common, ...decoded]);
    });
    setCommonIndex(commonIndex + 1);
    //??? add setInterval to query more
  }, []);

  const save = () => {
    const testWords = test.map((t) => t.word);
    const completeWords = complete.map((c) => c.word);
    const data = {
      decoded,
      test: testWords,
      complete: completeWords,
    };
    const file = new File([JSON.stringify(data)], '');
    setSaveUrl(window.URL.createObjectURL(file));
  };

  //??? add load

  const addTest = (defs) => {
    setTest([...test, ...defs]);
  };

  const removeTest = (def) => {
    setTest(test.filter((t) => t.word !== def.word));
  };

  const addComplete = (def) => {
    setComplete([def, ...(complete.filter((c) => c.word !== def.word))]);
    setTest(test.filter((t) => t.word !== def.word));
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Phoneme Finder</h1>
        { saveUrl &&
        <a href={saveUrl} download='phonmeFinder.json'>Download</a>
        }
        <button onClick={save}>Save</button>
      </header>
      <main>
        <Test
          defs={test}
          decodePhrase={decodePhrase}
          onAdd={addTest}
          onRemove={removeTest}
          onComplete={addComplete}/>
        <Reference decodePhrase={decodePhrase}/>
        <Complete defs={complete}/>
        <Common defs={common}/>
      </main>
    </React.Fragment>
  );
}

export default App;
