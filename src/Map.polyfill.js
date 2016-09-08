
class Map {

	keys = [];
	values = [];
	size = 0;

	get (key) {

		let idx = this.keys.indexOf(key);

		if (idx === -1) { return; }

		return this.values[idx];
	}

	set (key, val) {

		let idx = this.keys.indexOf(key);

		if (idx === -1) {
			this.keys.push(key);
			this.values.push(val);
			this.size++;
			return;
		}

		this.values[idx] = val;
	}

	delete (key) {

		let idx = this.keys.indexOf(key);

		if (idx === -1) { return; }

		this.keys.splice(idx, 1);
		this.values.splice(idx, 1);
		this.size--;
	}

	forEach (fn) {
		for (let i = 0; i < this.keys.length; i++) {
			fn(this.values[i], this.keys[i]);
		}
	}
}

export default (window.Map || Map);