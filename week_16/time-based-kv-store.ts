type TimeValuePair = [number[], string[]];
class TimeMap {
  map: Map<string, TimeValuePair>;
  constructor() {
    this.map = new Map();
  }

  set(key: string, value: string, timestamp: number): void {
    let timeValuePair = this.map.get(key);
    if (!timeValuePair) {
      this.map.set(key, [[timestamp], [value]]);
      return;
    }
    timeValuePair[0].push(timestamp);
    timeValuePair[1].push(value);
  }

  get(key: string, timestamp: number): string {
    const timeValuePair = this.map.get(key);
    if (!timeValuePair) {
      return "";
    }
    const [timestamps, values] = timeValuePair;
    if (timestamps[0] > timestamp) {
      return "";
    }

    if (timestamps[timestamps.length - 1] < timestamp) {
      return values[values.length - 1];
    }

    let l = 0,
      r = timestamps.length;

    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (timestamps[mid] > timestamp) {
        r = mid;
      } else if (timestamps[mid] <= timestamp) {
        l = mid + 1;
      }
    }

    return values[l - 1] ?? "";
  }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
