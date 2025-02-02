class EventEmitter {
	constructor() {
		this.events = new Map();
	}

	// Subscribe to an event
	on(event, listener) {
		if (!this.events.has(event)) {
			this.events.set(event, []);
		}
		this.events.get(event).push(listener);
	}

	// Subscribe to an event but remove after first execution
	once(event, listener) {
		const wrapper = (...args) => {
			listener(...args);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
	}

	// Unsubscribe from an event
	off(event, listener) {
		if (!this.events.has(event)) return;
		this.events.set(
			event,
			this.events.get(event).filter((l) => l !== listener)
		);
	}

	// Emit an event
	emit(event, ...args) {
		if (!this.events.has(event)) return;
		this.events.get(event).forEach((listener) => listener(...args));
	}
}

// Example usage:
const emitter = new EventEmitter();

const logMessage = (msg) => console.log(`Received: ${msg}`);
emitter.on('message', logMessage);

emitter.emit('message', 'Hello World!'); // Received: Hello World!

emitter.off('message', logMessage);
emitter.emit('message', "This won't be logged.");
