function decoder(decoded, setDecoded) {
  function decodePhrase(phrase) {
    console.log('DECODE', phrase, decoded, setDecoded);
    return [];
  }

  return {
    decodePhrase,
  };
};

export default decoder;
/*
class Decoder {
  static removeTrailingDigit(text) {
    return (/\d$/.test(text) ? text.slice(0, -1) : text);
  }

  static removePunctuation(text) {
    return text.replace(/[.,!?]/g, '');
  }

  static afterColon(text) {
    return text.substring(text.indexOf(':') + 1).trim();
  }

  static definitionToDecoded(def) {
    if(def.length === 0)
      return {};

    const word = def[0].word;
    const phonemesText = Decoder.afterColon(def[0].tags[0]);
    const phonemes = phonemesText.split(' ').map(Decoder.removeTrailingDigit);
    const ipa = Decoder.afterColon(def[0].tags[1]);
    return { 
      word,
      phonemes,
      ipa
    };
  }

  checkCache(word) {
    const stored = window.localStorage && window.localStorage.getItem(word);
    return (stored && JSON.parse(stored)) || undefined;
  }

  addToCache(decoded) {
    if(window.localStorage) {
      window.localStorage.setItem(decoded.word, JSON.stringify(decoded));
    }
  }

  static async queryWord(word) {
    const url = `https://api.datamuse.com/words?sp=${word.toLowerCase()}&md=r+d&ipa=1&max=1`;
    const response = await fetch(url);
    const definition = await response.json();
    return Decoder.definitionToDecoded(definition);
  }

  async decodePhrase(phrase) {
    const words = Decoder.removePunctuation(phrase.toLowerCase()).split(' ');
    return words.map(async (word) => {
      let decoded = this.checkCache(word);
      if(!decoded) {
        decoded = await Decoder.queryWord(word);
        this.addToCache(decoded);
      }
      return decoded;
    });
  }
}

export default Decoder;
*/
