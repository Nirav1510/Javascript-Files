class LruCache {
	constructor(maxSize) {
		this.maxSize = maxSize;
		this.cache = new Map();
	}

	get(key) {
		if (!this.cache.has(key)) {
			return null; // Return null if the key is not found
		}

		const value = this.cache.get(key);
		this.cache.delete(key); // Remove the key to update its position
		this.cache.set(key, value); // Reinsert it to mark it as most recently used
		return value; // Return the value associated with the key
	}

	add(key, value) {
		if (this.cache.has(key)) {
			this.cache.delete(key); // Remove the key to update its position
		} else if (this.cache.size >= this.maxSize) {
			// Remove the least recently used item (the first item in the Map)
			const leastUsedKey = this.cache.keys().next().value;
			this.cache.delete(leastUsedKey);
		}

		// Add the key-value pair to the cache
		this.cache.set(key, value);
	}
}

// Example usage:
const lruCache = new LruCache(3);
lruCache.add('a', 1);
lruCache.add('b', 2);
console.log(lruCache.get('a')); // Output: 1
lruCache.add('c', 3);
console.log(lruCache.get('b')); // Output: 2
lruCache.add('d', 4); // 'c' gets removed because it's the least recently used
console.log(lruCache.get('c')); // Output: null
