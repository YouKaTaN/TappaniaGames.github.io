class PrototypeWrapper {

	constructor(readyCallback) {
		// Wrapper initialization.
		console.log("Wrapper initialization started.");
		readyCallback();
	}

}

export function initialize(readyCallback) {
	if (typeof window !== 'undefined') {
		window.prototypeWrapper = new PrototypeWrapper(readyCallback);
	}
}