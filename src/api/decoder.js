class Decoder {
  static definitionToDecoded(def) {
    if(def.length == 0)
      return {};

    console.log('def', def);
    const word = def[0].word;
    const phonText = def[0].tags[0];
    const phon = phonText.substring(phonText.indexOf(':') + 1).trim();
    const phonemes = phon.split(' ').map((p) => /\d$/.test(p) ? p.slice(0, -1) : p);
    const ipaText = def[0].tags[1];
    const ipa = ipaText.substring(ipaText.indexOf(':') + 1);
    return { 
      word,
      phonemes,
      ipa
    };
  }

  decodeWord(word) {
    const url = `https://api.datamuse.com/words?sp=${word}&md=r+d&ipa=1&max=1`;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(definition) {
      return Decoder.definitionToDecoded(definition);
    });
  }
}

export default Decoder;
