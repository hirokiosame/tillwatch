# TillWatch

An intelligent interval checker. Can be used as an efficient way of polling where events cannot be used. For example, checking of an element is both attached to the DOM and is visible. Available in UMD.


## Example

Create a new instance of TillWatch. Every instance of TillWatch will represent a setInterval, so creating a module that exports an instance of it is recommended to maximize efficiency and reusability.
```
let onVisible = new TillWatch({

	isVisible: function (el) {
		return (el.offsetWidth > 0 || el.offsetHeight > 0);
	},

	condition: function (el) {
		return document.body.contains(el) && this.isVisible(el);
	},

	// timeout: 10000
});
```

Detecting if an element is on the DOM and is visible
```
let element = $('div').css('display', 'none');

onVisible.watch(element)
.then(function (el) {
	console.log('Element', el, 'on the DOM and visible!');
});

setTimeout(function () {

	element.appendTo(document.body)

	setTimeout(function () {
		element.css('display', 'block');
	}, 1000);

}, 1000);

```