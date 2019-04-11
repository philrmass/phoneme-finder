export function phonemeToSymbol(phoneme) {
  return phonemeSymbols[phoneme];
}

export const phonemeSymbols = {
  'AE': { shape: 'circle', color: 'red'},
  'IH': { shape: 'circle', color: 'orange'},
  'AA': { shape: 'circle', color: 'yellow'},
  'EH': { shape: 'circle', color: 'green'},
  'IY': { shape: 'circle', color: 'blue'},
  'UW': { shape: 'circle', color: 'purple'},
  'AH': { shape: 'circle', color: 'brown'},
  'AO': { shape: 'circle', color: 'black'},
  'UH': { shape: 'circle', color: 'white'},
  'AW': { shape: 'square', color: 'red'},
  'OY': { shape: 'square', color: 'orange'},
  'AY': { shape: 'square', color: 'yellow'},
  'EY': { shape: 'square', color: 'blue'},
  'OW': { shape: 'square', color: 'black'},
  'D': { shape: 'triangle', color: 'red'},
  'T': { shape: 'triangle', color: 'orange'},
  'CH': { shape: 'triangle', color: 'yellow'},
  'G': { shape: 'triangle', color: 'green'},
  'B': { shape: 'triangle', color: 'blue'},
  'P': { shape: 'triangle', color: 'purple'},
  'JH': { shape: 'triangle', color: 'brown'},
  'K': { shape: 'triangle', color: 'black'},
  'NG': { shape: 'rhombus', color: 'green'},
  'M': { shape: 'rhombus', color: 'brown'},
  'N': { shape: 'rhombus', color: 'black'},
  'R': { shape: 'star', color: 'red'},
  'ER': { shape: 'star', color: 'orange'},
  'Y': { shape: 'star', color: 'yellow'},
  'W': { shape: 'star', color: 'blue'},
  'L': { shape: 'star', color: 'purple'},
  'F': { shape: 'hexagon', color: 'red'},
  'HH': { shape: 'hexagon', color: 'orange'},
  'SH': { shape: 'hexagon', color: 'yellow'},
  'V': { shape: 'hexagon', color: 'green'},
  'ZH': { shape: 'hexagon', color: 'blue'},
  'DH': { shape: 'hexagon', color: 'purple'},
  'TH': { shape: 'hexagon', color: 'brown'},
  'Z': { shape: 'hexagon', color: 'black'},
  'S': { shape: 'hexagon', color: 'white'}
};

//??? remove digit from the end of arpabet
//??? split all 3 into phoneme arrays
/*
class Display {
  static getPhonemeSymbol(phoneme) {
    let symbol = symbols[phoneme];
    if(!symbol)
      symbol = [undefined, undefined];
    return symbol;
  }

  static getColorCode(color) {
    const colorCodes = {
      'red': '#ff0000',
      'orange': '#ff8000',
      'yellow': '#ffff00',
      'green': '#00dd00',
      'blue': '#0000ff',
      'purple': '#a000f0',
      'brown': '#905018',
      'black': '#000000',
      'white': '#ffffff'
    };
    const code = colorCodes[color];
    return (code ? code : '#808080');
  }

  static drawSymbol(shape, color, index, size, ctx) {
    ctx.fillStyle = Display.getColorCode(color);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    const padding = 5;
    const paddedSize = size - 2 * padding;
    const x = index * size;
    const halfSize = (size / 2);
    ctx.beginPath();
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
    } else {
      ctx.moveTo(x + padding, size - padding);
      ctx.lineTo(x + size - padding, padding);
      ctx.moveTo(x + padding, padding);
      ctx.lineTo(x + size - padding, size - padding);
    }
    ctx.fill();
    ctx.stroke();
  }

  static createSymbolsElement(text, symbolSize) {
    const phonemes = text.split(' ').filter((phoneme) => phoneme.length > 0); 
    const canvas = document.createElement('canvas');
    canvas.height = symbolSize; 
    canvas.width = phonemes.length * canvas.height;
    const ctx = canvas.getContext('2d');
    const symbols = phonemes.map((phoneme) => Display.getPhonemeSymbol(phoneme));
    symbols.map((symbol, index) => Display.drawSymbol(...symbol, index, symbolSize, ctx));
    return canvas;
  }

  static createWordElement(value) {
    let box = document.createElement('div');
    if(value) {
      box.classList.add('word-box');
      const word = document.createElement('p');
      word.classList.add('word');
      const arabet = document.createElement('p');
      arabet.classList.add('arabet');
      const ipa = document.createElement('p');
      ipa.classList.add('ipa');
      word.textContent = value.word;
      arabet.textContent = value.tags[0].replace('pron:', '');
      ipa.textContent = value.tags[1].replace('ipa_pron:', '');
      box.appendChild(word);
      box.appendChild(ipa);
      box.appendChild(Display.createSymbolsElement(arabet.textContent, 45));
      box.appendChild(arabet);
    }
    return box;
  }
}
export { Display };
*/
