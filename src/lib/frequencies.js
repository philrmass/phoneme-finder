import phonemes from '../data/phonemes.json';

export function getFrequencies(defs) {
  const zeros = phonemes.reduce((zeros, p) => {
    return { ...zeros, [p]: 0 };
  }, {});
  const frequencies = defs.reduce((frequencies, d) => {
    return d.phonemes.reduce((frequencies, p) => {
      frequencies[p]++;
      return frequencies;
    }, frequencies);
  }, zeros);
  const sorted = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((total, entry) => total + entry[1], 0);
  return [sorted, total];
}
