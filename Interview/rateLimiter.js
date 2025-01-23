// Whenever you expose a web service / api endpoint, you need to implement a rate limiter to prevent abuse of the service (DOS attacks).
// Implement a RateLimiter Class with an isAllow method. Every request comes in with a unique clientID, deny a request if that client has made more than 5 requests in the past second.

// RateLimiter Class in JavaScript
class RateLimiter {
  constructor() {
    // Dictionary to store request timestamps for each clientID
    this.clientRequests = new Map();
  }

  isAllow(clientID) {
    const currentTime = Date.now() / 1000; // Current time in seconds
    const oneSecondAgo = currentTime - 1;

    // Initialize array for the client if it doesn't exist
    if (!this.clientRequests.has(clientID)) {
      this.clientRequests.set(clientID, []);
    }

    // Get the array of timestamps for the client
    const timestamps = this.clientRequests.get(clientID);

    // Remove timestamps older than one second
    while (timestamps.length > 0 && timestamps[0] < oneSecondAgo) {
      timestamps.shift();
    }

    // Check if the client has exceeded the request limit
    if (timestamps.length >= 5) {
      return false;
    }

    // Add the current timestamp and allow the request
    timestamps.push(currentTime);
    return true;
  }
}

// Example usage
const rateLimiter = new RateLimiter();

const clientID = "client_1";

for (let i = 0; i < 10; i++) {
  const allowed = rateLimiter.isAllow(clientID);
  console.log(`Request ${i + 1}: ${allowed ? "Allowed" : "Denied"}`);
  // Simulate requests 0.2 seconds apart
  setTimeout(() => {}, 200);
}
