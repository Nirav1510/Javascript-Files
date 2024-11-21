// implement LibrarySelf data structure in which capacity is maxCapacity of self,
// ---> Find method should return name of book otherwise null;
// ---> Add method should add book inside self, if capacity is already full then replace the least used book in self and add new.

class LibrarySelf {
  constructor(maxCapacity) {
    this.maxCapacity = maxCapacity; // Maximum capacity of the shelf
    this.shelf = new Map(); // To store books with access order
  }

  // Find method to get the book by name
  find(bookName) {
    if (this.shelf.has(bookName)) {
      // Move the accessed book to the most recently used position
      const book = this.shelf.get(bookName);
      this.shelf.delete(bookName);
      this.shelf.set(bookName, book);
      return book;
    }
    return null; // Return null if the book is not found
  }

  // Add method to add a book to the shelf
  add(bookName) {
    if (this.shelf.has(bookName)) {
      // If the book already exists, remove it to re-add and make it most recently used
      this.shelf.delete(bookName);
    } else if (this.shelf.size >= this.maxCapacity) {
      // If the capacity is full, remove the least recently used book (the first item in the Map)
      const leastUsedBook = this.shelf.keys().next().value;
      this.shelf.delete(leastUsedBook);
    }

    // Add the book to the shelf
    this.shelf.set(bookName, bookName);
  }
}

// Example usage:
const library = new LibrarySelf(3);

library.add("Book A");
library.add("Book B");
library.add("Book C");

console.log(library.find("Book A")); // Output: Book A
library.add("Book D"); // Book B gets removed because it's the least recently used

console.log(library.find("Book B")); // Output: null
console.log(library.find("Book C")); // Output: Book C
