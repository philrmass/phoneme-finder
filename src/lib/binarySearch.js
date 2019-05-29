function findDef(word, entries) {
  let start = 0;
  let end = entries.length;
  while (start < end) {
    const index = Math.floor((start + end) / 2);
    if (word === entries[index][0]) {
      return entries[index][1];
    } else if (word < entries[index][0]) {
      end = index;
    } else {
      start = index + 1;
    }
  }
  return null;
}

