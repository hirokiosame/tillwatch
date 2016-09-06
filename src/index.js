
// ES6 Polyfills
import Deferred from './Deferred';
import ObjectAssign from 'core-js/library/fn/object/assign';

import IntervalObserver from './IntervalObserver';

// Contains public API methods
class tillWatch extends IntervalObserver {

	timeout = 1000 * 60;

	// To be overwritten
	condition (el) {}

	constructor (opts) {
		super();
		ObjectAssign(this, opts);
	}

	watch (el, timeout) {

		let def = new Deferred;

		// If its already in the DOM, call back
		if (this.condition(el)) {
			def.resolve(el);
			return def.promise;
		}

		if (!this.observer) {
			this.startObserving();
		}

		// Put the node on the watchlist
		let promises = this.watchList.get(el);

		if (!promises) {

			promises = [];

			promises.created = Date.now();

			promises.timeout = timeout;

			this.watchList.set(el, promises);
		}

		promises.push(def);

		return def.promise;
	}

	unwatch (el, promise) {

		let reason = ['Unwatching', el];

		// If no specific promise was provided, just remove all promises
		if (!promise) {
			return this.forPromises(el, def => def.reject(reason));
		}

		// Specific promise was provided, remove it
		let promises = this.watchList.get(el);

		if (!promises) { return; }

		let idx = promises.indexOf(promise);

		if (idx > -1) {
			promises.splice(idx, 1);
			promise.reject(reason);
			
			if (promises.length === 0) {
				this.watchlist.delete(el);
				this.checkWatchList();
			}
		}
	}
}

// Using ES6 exports here would export to module.exports.default
module.exports = tillWatch;