import React from 'react';
import PropTypes from 'prop-types';
import { phonemeToSymbol, colorToCode } from '../lib/symbols';
import styles from '../stylesheets/PhonemeDisplay.module.css';

function symbol(shape, color) {
  const stroke = '#404040';
  if(shape === 'circle') {
    return (<circle cx="50%" cy="50%" r="45%" stroke-width="5%" stroke={stroke} fill={color} />);
  } else if(shape === 'square') {
    return (<rect x="5%" y="5%" width="90%" height="90%" stroke-width="5%" stroke={stroke} fill={color} />);
  } else if(shape === 'triangle') {
    return (<polygon points="5,95 95,95 50,5" stroke-width="5%" stroke={stroke} fill={color} />);
  } else if(shape === 'rhombus') {
    return (<polygon points="50,95 90,50 50,5 10,50" stroke-width="5%" stroke={stroke} fill={color} />);
  } else if(shape === 'star') {
    return (<polygon points="50,0 32.4,25.7 2.4,34.5 21.5,59.3" stroke-width="5%" stroke={stroke} fill={color} />);
  } else if(shape === 'hexagon') {
    return (<polygon points="98,50 74,91.6 26,91.6 2,50 26,8.4 74,8.4" stroke-width="5%" stroke={stroke} fill={color} />);
  };
}

/*
    } else if(shape === 'star') {
      const sides = 5;
      const radius = halfSize;
      const innerRadius = 0.382 * radius;
      ctx.translate(x + halfSize, halfSize);
      ctx.moveTo(0, 0 - radius);
      for (var i = 0; i < sides; i++) {
        ctx.rotate(Math.PI / sides);
        ctx.lineTo(0, 0 - innerRadius);
        ctx.rotate(Math.PI / sides);
        ctx.lineTo(0, 0 - radius);
      }
    */

function PhonemeDisplay(props) {
  const { shape, color } = phonemeToSymbol(props.phoneme);
  const colorCode = colorToCode(color);
  console.log(props.phoneme, "=", shape, color);
  return (
    <div className={styles.phonemeDisplay}>
      <div className={styles.symbolWrap}>
        <div className={styles.symbol}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {symbol(shape, colorCode)}
          </svg>
        </div>
      </div>
      <div className={styles.phoneme}>
        {props.phoneme}
      </div>
    </div>
  );
}

PhonemeDisplay.propTypes = {
  phoneme: PropTypes.string
};

export default PhonemeDisplay;
