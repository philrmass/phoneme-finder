import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TestWord from './TestWord';
import styles from '../styles/Test.module.css';

function Test(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const [add, setAdd] = useState('');
  const [activeWord, setActiveWord] = useState();

  useEffect(() => {
    if (add) {
      props.decoder.decodePhrase(add).then((decoded) => {
        Promise.all(decoded).then((defs) => {
          props.addTest(defs);
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
  };

  const handleActivate = (word, isActive) => {
    setActiveWord(isActive ? word : undefined);
  };

  return (
    <div className='testWords'>
      <div className={styles.testWords}>
        <form onSubmit={onSubmit}>
          <label
            className={styles.title}
            htmlFor='input'
            onClick={() => setIsOpen(!isOpen)}>
            Test Words
          </label>
          <input id='input' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className='margin-left-4' type='submit'>Add</button>
        </form>
        <div className={styles.inactiveWords}>
          { isOpen && props.defs.filter((d) => d.word !== activeWord).map((def) =>
            (<TestWord
              key={def.word}
              def={def}
              isActive={def.word === activeWord}
              onActivate={handleActivate}/>
            ))}
        </div>
        <div className={styles.activeWord}>
          { isOpen && props.defs.filter((d) => d.word === activeWord).map((def) =>
              (<TestWord
                key={def.word}
                def={def}
                isActive={def.word === activeWord}
                onActivate={handleActivate}
                onComplete={props.addComplete}/>
              ))}
        </div>
      </div>
    </div>
  );
}

Test.propTypes = {
  defs: PropTypes.arrayOf(PropTypes.object),
  decoder: PropTypes.object,
  addTest: PropTypes.func,
  addComplete: PropTypes.func,
};

export default Test;
