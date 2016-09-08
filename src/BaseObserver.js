
// ES6 Polyfills
import Map from './Map.polyfill';

class BaseObserver {

	watchList = new Map();

	checkWatchList () {
		if (this.watchList.size === 0) {
			this.stopObserving();
		}
	}

	forDeferreds (el, cb) {

		let promises = this.watchList.get(el);

		if (!promises) { return; }

		// Resolve promises asynchronously
		for (let promise; promise = promises.pop();) {
			setTimeout(() => cb(promise), 0);
		}

		this.watchList.delete(el);

		this.checkWatchList();
	}
}

export default BaseObserver;