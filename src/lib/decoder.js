function decoder(decodedData, setDecodedData) {
  function afterColon(text) {
    return text.substring(text.indexOf(':') + 1).trim();
  }

  function removeTrailingDigit(text) {
    return (/\d$/.test(text) ? text.slice(0, -1) : text);
  }

  function definitionToDecoded(def) {
    if (def.length === 0) {
      return {};
    }
    const word = def[0].word;
    const phonemesText = afterColon(def[0].tags[0]);
    const phonemes = phonemesText.split(' ').map(removeTrailingDigit);
    const ipa = afterColon(def[0].tags[1]);
    return {
      word,
      phonemes,
      ipa,
    };
  }

  async function queryWord(word) {
    const url = `https://api.datamuse.com/words?sp=${word.toLowerCase()}&md=r+d&ipa=1&max=1`;
    const response = await fetch(url);
    const definition = await response.json();
    return definitionToDecoded(definition);
  };

  function removePunctuation(text) {
    return text.replace(/[.,!?]/g, '');
  }

  async function decodePhrase(phrase) {
    const words = removePunctuation(phrase.toLowerCase()).split(' ');
    const decodeds = words.map(async (word) => {
      let decoded = decodedData[word];
      if (!decoded) {
        decoded = await queryWord(word);
        //??? store word in queried array here
        setDecodedData({ ...decodedData, [decoded.word]: decoded });
      }
      return decoded;
    });
    return await Promise.all(decodeds);
    //??? convert queried to queriedData
    //??? add all queriedData to decodedData with setDecodedData after promise all
  }

  return {
    decodePhrase,
  };
};

export default decoder;
