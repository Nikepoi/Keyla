(function() {
	"use strict";

	var $body = document.querySelector('body');

	// Polyfill untuk classList di elemen lama
	!function(){function t(t){this.el=t;for(var n=t.className.trim().split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return this.el.className.includes(t)},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	window.canUse = function(p) {
		var e = document.createElement("div").style;
		var up = p.charAt(0).toUpperCase() + p.slice(1);
		return p in e || "Moz"+up in e || "Webkit"+up in e || "O"+up in e || "ms"+up in e;
	};

	window.addEventListener('load', function() {
		setTimeout(() => $body.classList.remove('is-preload'), 100);
	});

	// Slideshow Background
	(function() {
		var settings = { 
			images: {
				'images/bg01.jpg': 'center',
				'images/bg02.jpg': 'center',
				'images/bg03.jpg': 'center'
			},
			delay: 6000
		};

		var pos = 0, lastPos = 0, $wrapper, $bgs = [], $bg;
		$wrapper = document.createElement('div');
		$wrapper.id = 'bg';
		$body.appendChild($wrapper);

		for (let k in settings.images) {
			$bg = document.createElement('div');
			$bg.style.backgroundImage = `url("${k}")`;
			$bg.style.backgroundPosition = settings.images[k];
			$wrapper.appendChild($bg);
			$bgs.push($bg);
		}

		$bgs[pos].classList.add('visible', 'top');
		if ($bgs.length == 1 || !canUse('transition')) return;

		setInterval(() => {
			lastPos = pos;
			pos = (pos + 1) % $bgs.length;
			$bgs[lastPos].classList.remove('top');
			$bgs[pos].classList.add('visible', 'top');
			setTimeout(() => $bgs[lastPos].classList.remove('visible'), settings.delay / 2);
		}, settings.delay);
	})();

	// Signup Form
	(function() {
		var $form = document.querySelector('#signup-form'),
			$submit = document.querySelector('#signup-form input[type="submit"]'),
			$message = document.createElement('span');

		if (!$form) return;

		$message.classList.add('message');
		$form.appendChild($message);

		$message._show = function(type, text) {
			$message.innerHTML = text;
			$message.classList.add(type, 'visible');
			setTimeout(() => $message._hide(), 3000);
		};

		$message._hide = function() {
			$message.classList.remove('visible');
		};

		$form.addEventListener('submit', function(event) {
			event.preventDefault();
			$message._hide();
			$submit.disabled = true;
			setTimeout(() => {
				$form.reset();
				$submit.disabled = false;
				$message._show('success', 'Thank you!');
			}, 750);
		});
	})();
})();
