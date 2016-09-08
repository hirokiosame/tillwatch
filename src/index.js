

// ES6 Polyfills
import Deferred from './Deferred';
import ObjectAssign from 'core-js/library/fn/object/assign';
import arrFind from './Array.find';

import IntervalObserver from './IntervalObserver';

// Contains public API methods
class TillWatch extends IntervalObserver {

	timeout = 1000 * 60;

	interval = 50;

	// To be overwritten
	condition (el) { return true; }

	constructor (opts) {

		super();

		if (typeof opts.condition !== 'function') {
			throw new Error('You must pass in a condition function');
		}

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
		let deferreds = this.watchList.get(el);

		if (!deferreds) {

			deferreds = [];

			deferreds.created = Date.now();

			deferreds.timeout = timeout;

			this.watchList.set(el, deferreds);
		}

		deferreds.push(def);

		return def.promise;
	}

	unwatch (el, promise) {

		let reason = ['Unwatching', el];

		// If no specific promise was provided, just remove all promises
		if (!promise) {
			return this.forDeferreds(el, def => def.reject(reason));
		}

		// Specific promise was provided, remove it
		let deferreds = this.watchList.get(el);

		if (!deferreds) { return; }

		let def = arrFind(deferreds, def => def.promise === promise);

		if (def) {

			let idx = deferreds.indexOf(def);
			deferreds.splice(idx, 1);

			def.reject(reason);
			
			if (deferreds.length === 0) {
				this.watchList.delete(el);
				this.checkWatchList();
			}
		}
	}
}

// Using ES6 exports here would export to module.exports.default
module.exports = TillWatch;