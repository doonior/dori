class RandomizedSet {
  set: Set<number>;

  constructor() {
    this.set = new Set();
  }

  insert(val: number): boolean {
    if (this.set.has(val)) {
      return false;
    }
    this.set.add(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.set.has(val)) {
      return false;
    }
    this.set.delete(val);
    return true;
  }

  getRandom(): number {
    const iter = this.set.values();
    const shuffleCount = Math.random() * 100;

    for (let i = 0; i < shuffleCount; i++) {
      const val = iter.next().value;
      this.set.delete(val);
      this.set.add(val);
    }
    return iter.next().value;
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
