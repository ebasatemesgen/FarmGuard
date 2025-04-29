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


// … the existing Alpha by HTML5 UP code above …

// our video overlay script
$(function() {
	const thumb     = document.getElementById('videoThumb');
	const container = document.getElementById('videoContainer');
	const closeBtn  = document.getElementById('videoClose');
	const iframe    = document.getElementById('demoIframe');
	if (!thumb || !container || !closeBtn || !iframe) return;
  
	thumb.addEventListener('click', () => {
	  container.classList.add('active');
	});
  
	closeBtn.addEventListener('click', () => {
	  container.classList.remove('active');
	  // reset iframe to stop playback
	  iframe.src = iframe.src;
	});
  });
  


document.querySelectorAll('.media-video .video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const id = wrapper.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    Object.assign(iframe.style, {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
    });
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
  });
});
