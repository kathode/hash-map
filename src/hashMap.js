import { LinkedList } from "./linkedList";

export class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.buckets = new Array(capacity).fill().map(() => new LinkedList());
    this.loadFactor = loadFactor;
    this.capacity = capacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    if (hashCode < 0 || hashCode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    } else {
      return hashCode;
    }
  }

  set(key, value) {
    const index = this.hash(key);

    if (this.isResize()) {
      const entries = this.entries();

      this.capacity *= 2;
      this.buckets = [...new Array(this.capacity).fill().map(() => new LinkedList())];

      // rehash to spread out entries evenly on new capacity
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }

    if (this.buckets[index].contains(key)) {
      // update value
      const subIndex = this.buckets[index].find(key);
      this.buckets[index].removeAt(subIndex);
      this.buckets[index].insertAt({ key, value }, subIndex);
    } else {
      // add new entry
      this.buckets[index].append({ key, value });
    }
  }

  isResize() {
    const upperLimit = this.loadFactor * this.capacity;
    return this.length() > upperLimit;
  }

  get(key) {
    const index = this.hash(key);

    return this.buckets[index];
  }

  has(key) {
    const index = this.hash(key);

    if (this.buckets[index].contains(key)) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (this.has(key)) {
      const index = this.hash(key);

      const targetIndex = this.buckets[index].find(key);
      this.buckets[index].removeAt(targetIndex);

      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.buckets.reduce((total, buck) => (total += buck.size()), 0);
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill().map(() => new LinkedList());
  }

  keys() {
    return this.buckets.reduce((allKeys, buck) => {
      if (buck.size() === 0) return allKeys;

      const keyList = buck.list.map((node) => node.value.key);
      allKeys.push(...keyList);

      return allKeys;
    }, []);
  }

  values() {
    return this.buckets.reduce((allValues, buck) => {
      if (buck.size() === 0) return allValues;

      const valueList = buck.list.map((node) => node.value.value);
      allValues.push(...valueList);

      return allValues;
    }, []);
  }

  entries() {
    return this.buckets.reduce((allEntries, buck) => {
      if (buck.size() === 0) return allEntries;

      const entryList = buck.list.map((node) => [node.value.key, node.value.value]);
      allEntries.push(...entryList);

      return allEntries;
    }, []);
  }
}
