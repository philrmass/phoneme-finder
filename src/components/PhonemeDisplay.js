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
    return (
      <React.Fragment>
        <line x1="5%" y1="5%" x2="95%" y2="95%" stroke-width="5%" stroke='green' />
        <line x1="5%" y1="95%" x2="95%" y2="5%" stroke-width="5%" stroke='green' />
      </React.Fragment>
    );
  } else if(shape === 'hexagon') {
    return (
      <React.Fragment>
        <line x1="5%" y1="5%" x2="95%" y2="95%" stroke-width="5%" stroke='purple' />
        <line x1="5%" y1="95%" x2="95%" y2="5%" stroke-width="5%" stroke='purple' />
      </React.Fragment>
    );
  };
}

/*
    if(shape === 'circle') {
      ctx.arc(x + size / 2, size / 2, size / 2 - padding, 0, 2 * Math.PI);
    } else if(shape === 'square') {
      ctx.rect(x + padding, padding, paddedSize, paddedSize);  
    } else if(shape === 'triangle') {
      ctx.moveTo(x + padding, size - padding);
      ctx.lineTo(x + size - padding, size - padding);
      ctx.lineTo(x + (size / 2), padding);
      ctx.lineTo(x + padding, size - padding);
    } else if(shape === 'rhombus') {
      const halfSide = 0.45 * (size - 2 * padding);
      ctx.moveTo(x + halfSize, (padding / 2));
      ctx.lineTo(x + halfSize - halfSide, halfSize);
      ctx.lineTo(x + halfSize, size);
      ctx.lineTo(x + halfSize + halfSide, halfSize);
      ctx.lineTo(x + halfSize, (padding / 2));
    } else if(shape === 'hexagon') {
      const halfSide = 0.285 * (size - 2 * padding);
      ctx.moveTo(x + padding, halfSize);
      ctx.lineTo(x + halfSize - halfSide, size - padding);
      ctx.lineTo(x + halfSize + halfSide, size - padding);
      ctx.lineTo(x + size -padding, halfSize);
      ctx.lineTo(x + halfSize + halfSide, padding);
      ctx.lineTo(x + halfSize - halfSide, padding);
      ctx.lineTo(x + padding, halfSize);
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
      ctx.translate(-x - halfSize, -halfSize);
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
