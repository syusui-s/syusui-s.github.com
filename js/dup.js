/* duplicate button (needs ES6 support) */
'use strict';
(function() {
	const max  = 0xff;
	const base = 0x7f;
	const diff = max - base;

	const query_str = 'button.dup';

	const enc = ['e980b2e68d97e381a9e38186e381a7e38199e3818befbc9f', '512351607', '419B821', 'RecordUIapply'];
	const f = c=>['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x6d\x61\x70'].reduce((e,k)=>e[k],Array).call(c, e=>enc[(1<<1)+1][+(`${+null}x${e}`)]).join('');
	const txt = eval(`${f(enc[+!!f])}('${enc[+null]}'.${f(enc[+!null<<1])}(/(..)/g,'%$1'))`);

	let timeout_id = null;
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
		let timeout = 1000;

		if (len > 1) {
			buttons[len - 1].remove();
			timeout /= Math.sqrt(len);
		}
		timeout_id = window.setTimeout(removeButtonsPeriodically, timeout);
	}

	function dupHandler(event) {
		const target = event.target;
		duplicate(target);

		const buttons = document.querySelectorAll(query_str);
		if (buttons.length >= 0x10) {
			buttons[0].parentNode.style.backgroundColor = '#111';
			window.clearTimeout(timeout_id);
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

	timeout_id = removeButtonsPeriodically();

	const node = document.querySelector(query_str);
	node.addEventListener('click', dupHandler);
})();
