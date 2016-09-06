
// ES6 Polyfills
import Promise from 'core-js/library/fn/promise';

export default class Deferred {
	promise = new Promise((resolve, reject)=> {
		this.reject = reject;
		this.resolve = resolve;
	});
};