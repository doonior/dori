function groupAnagrams(strs: string[]): string[][] {
  const countChar = (str: string) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
      if (map[str[i]]) {
        map[str[i]] += 1;
      } else {
        map[str[i]] = 1;
      }
    }
    const s = [];
    for (let c of "abcdefghijklmnopqrstuvwxyz") {
      if (!map[c]) continue;
      s.push(`${c}${map[c]}`);
    }
    return s.join("");
  };

  const counts = strs.map((str) => countChar(str));
  const counter = {};
  for (let i = 0; i < counts.length; i++) {
    if (counter[counts[i]]) {
      counter[counts[i]].push(strs[i]);
    } else {
      counter[counts[i]] = [strs[i]];
    }
  }

  return Object.values(counter);
}
