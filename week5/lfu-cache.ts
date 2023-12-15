class LFUCache {
  capacity;
  cache: Map<number, number> = new Map(); // key, value
  counter: Map<number, number> = new Map(); // key, count
  countMap: Record<number, number[]> = {}; // count, key[]

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  updateCountMap(count, key) {
    const countKeys = this.countMap[count];
    if (countKeys) {
      this.countMap[count] = countKeys.filter((x) => x !== key);
      if (this.countMap[count].length === 0) {
        delete this.countMap[count];
        
        // hi 
      }
    }
    const nextKeys = this.countMap[count + 1];
    if (nextKeys) {
      nextKeys.push(key);
    } else {
      this.countMap[count + 1] = [key];
    }
  }

  get(key: number): number {
    const ret = this.cache.get(key);
    if (ret === undefined) {
      // console.log('get', key, this.cache, this.countMap)
      return -1;
    }

    this.cache.delete(key);
    this.cache.set(key, ret);
    const prevCount = this.counter.get(key);
    this.counter.set(key, prevCount + 1);
    this.updateCountMap(prevCount, key);

    // console.log('get', key, this.cache, this.countMap)
    return ret;
  }

  put(key: number, value: number): void {
    const prev = this.cache.get(key);
    if (prev !== undefined) {
      let count = this.counter.get(key);
      this.updateCountMap(count, key);
      count += 1;
      this.cache.delete(key);
      this.counter.delete(key);
      this.cache.set(key, value);
      this.counter.set(key, count);
      // console.log('put', key, value, this.cache, this.countMap)
      return;
    }

    if (this.cache.size === this.capacity) {
      const minKeyCount = Math.min(...Object.keys(this.countMap).map(Number));
      const minKey = this.countMap[minKeyCount].shift();
      this.cache.delete(minKey);
      this.counter.delete(minKey);
    }

    const keys = this.countMap[1];
    if (keys) {
      keys.push(key);
    } else {
      this.countMap[1] = [key];
    }
    this.cache.set(key, value);
    this.counter.set(key, 1);
    // console.log('put', key, value, this.cache, this.countMap)
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
