import { gsap } from 'gsap';

export function init() {

	// Animate splash h1 on page load
	if (document.querySelector('.splash h1')) {
		gsap.fromTo('.splash h1', {
			y: 20,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			delay: 0.2,
			ease: 'back'
		});
	}

	// Animate splash meta on page load
	if (document.querySelector('.splash .meta')) {
		gsap.fromTo('.splash .meta', {
			y: 20,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			delay: 0.35,
			ease: 'back'
		});
	}

	// Animate "boag" header logo on page load
	if (document.querySelector('header h2 a span')) {
		gsap.to('header h2 a span', {
			stagger: 0.1,
			y: -5,
			rotate: '-10deg',
			duration: 0.2,
		});
		gsap.to('header h2 a span', {
			stagger: 0.1,
			y: 0,
			rotate: '0deg',
			duration: 0.2,
			delay: 0.2
		});
	}

	// Add expanding bar hover effect to links
	document.querySelectorAll('p a, footer .copyemail, header .nav li:not(.current-menu-item) a').forEach((el) => {

		el.innerHTML += '<div class="hovereffect"></div>';
		const hoverEffect = el.querySelector('.hovereffect');

		el.addEventListener('mouseover', () => {
			gsap.to(hoverEffect, {
				height: '100%',
				duration: 0.3,
				ease: 'back'
			});
		});

		el.addEventListener('mouseout', () => {
			gsap.to(hoverEffect, {
				height: '3px',
				duration: 0.3,
				ease: 'back'
			});
		});

	});

	// Animate buttons etc on hover (scale up)
	document.querySelectorAll('.note, input[type="submit"], .social a, a.projectlink').forEach((el) => {

		let scaleAmt = 1.02;
		if (el.tagName === 'INPUT') { scaleAmt = 1.05; }
		if (el.parentElement.classList.contains('social')) { scaleAmt = 1.2; }
		if (el.classList.contains('projectlink')) { scaleAmt = 1.05; }

		el.addEventListener('mouseover', () => {
			gsap.to(el, {
				scale: scaleAmt,
				duration: 0.3,
				ease: 'back'
			});

			if (el.querySelector('.cta')) {
				gsap.to(el.querySelector('.cta'), {
					width: '100%',
					duration: 0.3,
					ease: 'back'
				});
				gsap.to(el.querySelector('.cta img'), {
					x: 10,
					duration: 0.3,
					ease: 'back'
				});
			}
		});

		el.addEventListener('mouseout', () => {
			gsap.to(el, {
				scale: 1,
				duration: 0.3,
				ease: 'back'
			});

			if (el.querySelector('.cta')) {
				gsap.to(el.querySelector('.cta'), {
					width: 'auto',
					duration: 0.3,
					ease: 'back'
				});
				gsap.to(el.querySelector('.cta img'), {
					x: 0,
					duration: 0.3,
					ease: 'back'
				});
			}
		});

	});

	// Animate arrow icons on link hover
	document.querySelectorAll('.section-head a').forEach((el) => {

		const arrowIcon = el.querySelector('img');

		el.addEventListener('mouseover', () => {
			gsap.to(arrowIcon, {
				x: '10',
				duration: 0.3,
				ease: 'back'
			});
		});

		el.addEventListener('mouseout', () => {
			gsap.to(arrowIcon, {
				x: '0',
				duration: 0.3,
				ease: 'back'
			});
		});

	});

	// Animate arrow icon on link hover
	document.querySelectorAll('.meta a').forEach((el) => {

		const arrowIcon = el.querySelector('img');

		el.addEventListener('mouseover', () => {
			gsap.to(arrowIcon, {
				x: '-10',
				duration: 0.3,
				ease: 'back'
			});
		});

		el.addEventListener('mouseout', () => {
			gsap.to(arrowIcon, {
				x: '0',
				duration: 0.3,
				ease: 'back'
			});
		});

	});


}