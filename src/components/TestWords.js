import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TestWord from './TestWord';
import styles from '../styles/TestWords.module.css';

function TestWords(props) {
  const [input, setInput] = useState('');
  const [add, setAdd] = useState('');
  const [testDefs, setTestDefs] = useState([]);
  const [activeWord, setActiveWord] = useState();

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
      if(window.localStorage) {
        window.localStorage.setItem('_testDefs', JSON.stringify(testDefs));
      }
    }
  }, [testDefs]);

  useEffect(() => {
    if (add) {
      props.decoder.decodePhrase(add).then((decoded) => {
        Promise.all(decoded).then((defs) => {
          setTestDefs([...testDefs, ...defs]);
        });
      });
      setAdd('');
      document.getElementById('input').focus();
    }
  }, [add]);

  const onSubmit = (e) => {
    e.preventDefault();
    setAdd(input);
    setInput('');
  }

  const handleActivate = (word, isActive) => {
    setActiveWord(isActive ? word : undefined);
  }

  const handleComplete = (word) => {
    console.log('COMPLETE', word);
  }

  return (
    <div className='testWords'>
      <div className={styles.testWords}>
        <form onSubmit={onSubmit}>
          <label className={styles.title} htmlFor='input' onClick={props.onToggle}>
            Test Words
          </label>
          <input id='input' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className='margin-left-4' type='submit'>Add</button>
        </form>
        <div className={styles.inactiveWords}>
          { props.isOpen && testDefs.filter((d) => d.word !== activeWord).map((def) => 
            (<TestWord 
              def={def} 
              isActive={def.word === activeWord}
              onActivate={handleActivate}
              onComplete={handleComplete}/>
            ))}
        </div>
        <div className={styles.activeWord}>
          { props.isOpen && testDefs.filter((d) => d.word === activeWord).map((def) => 
            (<TestWord 
              def={def} 
              isActive={def.word === activeWord}
              onActivate={handleActivate}
              onComplete={handleComplete}/>
            ))}
        </div>
      </div>
    </div>
  )
}

TestWords.propTypes = {
  decoder: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default TestWords;
