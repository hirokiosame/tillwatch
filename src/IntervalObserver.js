import BaseObserver from './BaseObserver';

class IntervalObserver extends BaseObserver {

	startObserving () {

		this.observer = window.setInterval(() => {

			for (let [node, arr] of this.watchList) {

				// If matches condition
				if (this.condition(node)) {
					this.forDeferreds(node, def => def.resolve(node));
				}

				// If timed out
				else if ((Date.now() - arr.created) > (arr.timeout || this.timeout)) {
					this.forDeferreds(node, def => def.reject([new Error('Watching timed out'), node]));
				}
			}

		}, this.interval);
	}

	stopObserving () {

		window.clearInterval(this.observer);
		this.observer = null;
	}
}

export default IntervalObserver;