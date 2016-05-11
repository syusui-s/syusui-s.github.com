/* duplicate button (needs ES6 support) */
'use strict';
(function() {
	const max  = 0xff;
	const base = 0x7f;
	const diff = max - base;

	const query_str = 'button.button';

	const enc = ['e980b2e68d97e381a9e38186e381a7e38199e3818befbc9f', '512351607', '419B821', 'RecordUIapply'];
	const f = c=>Array.prototype.map.call(c, e=>enc[3][+(`${+null}x${e}`)]).join('');
	const txt = eval(`${f(enc[1])}('${enc[+null]}'.${f(enc[1<<1])}(/(..)/g,'%$1'))`);

	let timeout_id = null;
	let interval_id = null;

	function setBGColor(node) {
		const rgb = [0,0,0].map(() => Math.floor(Math.random() * diff) + base);
		node.style.backgroundColor = 'rgba(' + rgb.join(',') + ',1.0)';
	}

	function duplicate(node) {
		const clone = node.cloneNode(true);
		setBGColor(clone);
		clone.addEventListener('mouseup', dupHandler);
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

	function invertColor(buttons) {
		Array.prototype.forEach.call(buttons, (button, index) => {
			const color = button.style.color || '#162E1E';
			button.style.color = button.style.backgroundColor || '#888';
			button.style.backgroundColor = color;
		});
	}

	function dupHandler(event) {
		const target = event.target;
		duplicate(target);

		const buttons = document.querySelectorAll(query_str);
		if (buttons.length >= 0x20) {
			window.clearTimeout(timeout_id);
			Array.prototype.forEach.call(buttons, (button, index) => {
				button.removeEventListener('mouseup', dupHandler);
				button.classList.add('button-text');
				button.textContent = txt[index % txt.length];
			});
			if (!interval_id) {
				interval_id = window.setInterval(invertColor, 0x200, buttons);
			}
		}
	}

	timeout_id = removeButtonsPeriodically();

	const node  = document.querySelector('button.button:nth-child(1)');
	node.addEventListener('mouseup', dupHandler);
})();
