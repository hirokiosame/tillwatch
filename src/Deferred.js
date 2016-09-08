
// ES6 Polyfills
import { Promise } from 'es6-promise';

export default class Deferred {
	promise = new Promise((resolve, reject)=> {
		this.resolve = resolve;
		this.reject = reject;
	});
};