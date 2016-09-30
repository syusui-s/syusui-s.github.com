/* duplicate button (needs ES6 support) */
'use strict';
(function() {
	const max  = 0xff;
	const base = 0x7f;
	const diff = max - base;
	const query_str = 'button.dup';

	let remove_button_id = null;
	let interval_id = null;

	function setBGColor(node) {
		const rgb = [0,0,0].map(() => Math.floor(Math.random() * diff) + base);
		node.style.backgroundColor = 'rgba(' + rgb.join(',') + ',1.0)';
	}

	function duplicate(node) {
		const clone = node.cloneNode(true);
		setBGColor(clone);
		clone.addEventListener('click', dupHandler);
		node.parentNode.insertBefore(clone, node.nextSibling);
	};

	function removeButtonsPeriodically() {
		const buttons = document.querySelectorAll(query_str);
		const len = buttons.length;
		let timeout = 800;

		if (len > 1) {
			buttons[len - 1].remove();
			timeout /= Math.sqrt(len);
		}
		remove_button_id = window.setTimeout(removeButtonsPeriodically, timeout);
	}

	function dupHandler(event) {
		const target = event.target;
		duplicate(target);

		const buttons = document.querySelectorAll(query_str);
		if (buttons.length >= 0x10) {
			buttons[0].parentNode.style.backgroundColor = '#111';
			window.clearTimeout(remove_button_id);
			Array.from(buttons).forEach((button, index) => {
				button.removeEventListener('click', dupHandler);
				button.style.opacity = '0.5';
			});

			let i = 0;
			let j = 0;
			let k = 0;
			let l = 'speed-tube';
			window.setInterval(() => {
				if (i >= buttons.length) { i = 0; }
				buttons[k].classList.remove(l);
				buttons[i].classList.add(l);
				k = j;
				j = i;
				i += 1;
			}, 108);
		}
	}
	
	function initialHandler(ev) {
		ev.target.removeEventListener('click', initialHandler);
		ev.target.addEventListener('click', dupHandler);
		removeButtonsPeriodically();
	}

	const node = document.querySelector(query_str);
	node.addEventListener('click', initialHandler);
})();
