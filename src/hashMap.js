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

    // const load = this.loadFactor * this.capacity;
    // if (this.length() > load) {
    //   const bucketCopy = [...this.buckets];
    //   this.buckets = [...bucketCopy, new Array(this.capacity).fill().map(() => [])];
    //   this.capacity *= 2;
    // }

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

  get(key) {
    const index = this.hash(key);

    return this.buckets[index];
  }

  has(key) {
    const index = hash(key);

    if (this.buckets[index] === key) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (this.has(key)) {
      const index = hash(key);

      this.buckets[index] = null;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.buckets.filter((buck) => buck !== null).length;
  }

  clear() {
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  keys() {
    return this.buckets.filter((buck) => buck !== null).map((buck) => [buck.key]);
  }

  values() {
    return this.buckets.filter((buck) => buck !== null).map((buck) => [buck.value]);
  }

  entries() {
    return this.buckets.filter((buck) => buck !== null).map((buck) => [buck.key, buck.value]);
  }
}
