function BrowserHistory(homepage) {
	this.history = [homepage]; // stack of visited URLs
	this.currentIndex = 0; // current position in history
}

// Visit a new URL
BrowserHistory.prototype.visit = function (url) {
	// Remove forward history
	this.history = this.history.slice(0, this.currentIndex + 1);
	this.history.push(url);
	this.currentIndex++;
	console.log(`Visited: ${url}`);
};

// Go back in history
BrowserHistory.prototype.back = function (steps) {
	this.currentIndex = Math.max(0, this.currentIndex - steps);
	console.log(`Back -> Current: ${this.history[this.currentIndex]}`);
	return this.history[this.currentIndex];
};

// Go forward in history
BrowserHistory.prototype.forward = function (steps) {
	this.currentIndex = Math.min(this.history.length - 1, this.currentIndex + steps);
	console.log(`Forward -> Current: ${this.history[this.currentIndex]}`);
	return this.history[this.currentIndex];
};

// Example usage:
const browser = new BrowserHistory('google.com');

browser.visit('yahoo.com'); // google -> yahoo
browser.visit('bing.com'); // yahoo -> bing
browser.back(1); // back to yahoo
browser.back(1); // back to google
browser.forward(1); // forward to yahoo
browser.visit('duckduckgo.com'); // forward history cleared
browser.forward(1); // stays at duckduckgo
