/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

})(jQuery);


(() => {
  const zone  = document.getElementById('drone-zone');   // confinement area
  const drone = document.getElementById('drone');

  let box     = zone.getBoundingClientRect();            // zone position/size
  let tX = box.width/2,  tY = box.height/2,              // target
      cX = tX,           cY = tY;                        // current
  const speed = 0.12;                                    // smoothing

  /* pointer inside this zone only */
  const setTarget = e => {
      if (e.touches?.length) e = e.touches[0];
      /* coordinates relative to the zone’s top‑left corner */
      tX = e.clientX - box.left;
      tY = e.clientY - box.top;
      /* clamp to zone bounds */
      tX = Math.max(0, Math.min(box.width , tX));
      tY = Math.max(0, Math.min(box.height, tY));
  };
  zone.addEventListener('mousemove',  setTarget, {passive:true});
  zone.addEventListener('touchstart', setTarget, {passive:true});
  zone.addEventListener('touchmove',  setTarget, {passive:true});

  /* update box on resize/scroll (in case layout shifts) */
  const updateBox = () => box = zone.getBoundingClientRect();
  addEventListener('resize',  updateBox);
  addEventListener('scroll',  updateBox, true);          // capture scroll in parents

  /* animation loop */
  function tick(){
      const dx = tX - cX, dy = tY - cY;
      cX += dx * speed;  cY += dy * speed;
      const ang = Math.atan2(dy, dx)*180/Math.PI + 90;

      drone.style.left = `${cX}px`;
      drone.style.top  = `${cY}px`;
      drone.style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;
      requestAnimationFrame(tick);
  }
  tick();
})();