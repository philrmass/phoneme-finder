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

export function colorToCode(color) {
  return colorCodes[color];
}

export const colorCodes = {
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
