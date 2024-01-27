const Alphabet = "abcdefghijklmnopqrstuvwxyz";
class Counter {
  constructor() {
    for (let c of Alphabet) {
      this[c] = 0;
    }
  }
}

function isAnagram(s: string, t: string): boolean {
  const counterS = new Counter();
  const counterT = new Counter();

  for (let c of s) {
    counterS[c]++;
  }
  for (let c of t) {
    counterT[c]++;
  }
  for (let c of Alphabet) {
    if (counterS[c] !== counterT[c]) return false;
  }

  return true;
}
