

class LRUCache {
  map;
  capacity;
  constructor(capacity: number) {
    this.map = new Map();
    this.capacity = capacity;
  }

  get(key: number): number {
    const ret = this.map.get(key);

    if (ret !== undefined) {
      this.map.delete(key);
      this.map.set(key, ret);
      return ret;
    }

    return -1;
  }

  put(key: number, value: number): null {
    const ret = this.map.get(key);
    if (ret === undefined && this.map.size === this.capacity) {
      this.map.delete(this.map.keys().next().value);
    } else {
        this.map.delete(key);
    }
    this.map.set(key, value);

    return null;
  }
}
