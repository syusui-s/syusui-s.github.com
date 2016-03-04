/* duplicate */
'use strict';
var duplicate = function(e) {
	var target = e.target;
	var clone  = target.cloneNode(true);
	var rgb = [0,0,0].map(function(e){ return Math.floor(Math.random() * 0xaf) + 0x50; });
	clone.style.backgroundColor = 'rgba('+ rgb.join(',') +',1.0)';
	clone.addEventListener('click', duplicate);
	target.insertAdjacentElement('afterend', clone);
};
var node  = document.querySelector('button.button:nth-child(1)');
node.addEventListener('click', duplicate);
