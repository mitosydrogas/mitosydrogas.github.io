/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.browser == 'edge' || skel.vars.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			skel.on('change', function() {

				if (skel.breakpoint('medium').active)
					(off)();
				else
					(on)();

			});

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load pageshow', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Clear transitioning state on unload/hide.
			$window.on('unload pagehide', function() {
				window.setTimeout(function() {
					$('.is-transitioning').removeClass('is-transitioning');
				}, 250);
			});

		// Fix: Enable IE-only tweaks.
			if (skel.vars.browser == 'ie' || skel.vars.browser == 'edge')
				$body.addClass('is-ie');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height() - 2;
				}
			});

		// Tiles.
			var $tiles = $('.tiles > article');

			$tiles.each(function() {

				var $this = $(this),
					$image = $this.find('.image'), $img = $image.find('img'),
					$link = $this.find('.link'),
					x;

				// Image.

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Set position.
						if (x = $img.data('position'))
							$image.css('background-position', x);

					// Hide original.
						$image.hide();

				// Link.
					if ($link.length > 0) {

						$x = $link.clone()
							.text('')
							.addClass('primary')
							.appendTo($this);

						$link = $link.add($x);

						$link.on('click', function(event) {

							var href = $link.attr('href');

							// Prevent default.
								event.stopPropagation();
								event.preventDefault();

							// Start transitioning.
								$this.addClass('is-transitioning');
								$wrapper.addClass('is-transitioning');

							// Redirect.
								window.setTimeout(function() {

									if ($link.attr('target') == '_blank')
										window.open(href);
									else
										location.href = href;

								}, 500);

						});

					}

			});

				var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

				var $companion = $('.landing-companion'),
					$companionText = $('.landing-companion__text'),
					$companionCta = $('.landing-companion__cta'),
					companionTips = [
						{ text: 'Psst… infórmate, hidrátate y no mezcles a ciegas.', url: '/drogas', action: 'Ver guías' },
						{ text: 'Si algo se siente mal: pausa, acompaña y pide ayuda temprano.', url: '/adiccion', action: 'Señales de alerta' },
						{ text: 'Revisa duración y redosis: muchas emergencias empiezan por impaciencia.', url: '/drogas', action: 'Explorar sustancias' },
						{ text: 'Combinar sustancias cambia el riesgo. Consulta interacciones antes.', url: 'https://interacciones.mitosydrogas.org', action: 'Ver interacciones' },
						{ text: 'Empieza bajo, ve lento y nunca consumas sin información confiable.', url: '/drogas', action: 'Leer guías' }
					],
					tipIndex = 0,
					messageTimer,
					speakingTimer,
					curiosityTimer;

				if ($companion.length > 0) {

					var showCompanionMessage = function(tip, url, action) {

						window.clearTimeout(messageTimer);
						window.clearTimeout(speakingTimer);

						if (!tip) {
							tip = companionTips[tipIndex % companionTips.length];
							tipIndex++;
						}

						if (typeof tip == 'object') {
							url = tip.url;
							action = tip.action;
							tip = tip.text;
						}

						$companionText.text(tip);
						$companionCta
							.attr('href', url || '/drogas')
							.attr('target', (url && url.indexOf('http') === 0) ? '_blank' : null)
							.attr('rel', (url && url.indexOf('http') === 0) ? 'noopener noreferrer' : null)
							.text(action || 'Ver guía');
						$companion.addClass('has-message is-curious is-speaking');

						speakingTimer = window.setTimeout(function() {
							$companion.removeClass('is-speaking');
						}, 900);

						messageTimer = window.setTimeout(function() {
							$companion.removeClass('has-message');
						}, 6200);

					};

					var scheduleCuriosity = function() {

						if (reducedMotion)
							return;

						curiosityTimer = window.setTimeout(function() {

							if ($window.scrollTop() > ($banner.outerHeight() * 0.65)) {
								scheduleCuriosity();
								return;
							}

						showCompanionMessage(companionTips[tipIndex % companionTips.length]);
						tipIndex++;

							window.setTimeout(function() {
								$companion.removeClass('is-curious');
								scheduleCuriosity();
							}, 2600);

						}, 5200 + Math.random() * 5200);

					};

					$companion.on('click', function(event) {
						event.preventDefault();
						showCompanionMessage();
					});

					$companion.on('keydown', function(event) {
						if ($(event.target).is('.landing-companion__cta'))
							return;

						if (event.keyCode == 13 || event.keyCode == 32) {
							event.preventDefault();
							showCompanionMessage();
						}
					});

					$companionCta.on('click', function(event) {
						event.stopPropagation();
					});

					$companion.on('mouseenter focus', function() {
						if (!$companion.hasClass('has-message'))
							showCompanionMessage('Soy Xolotl: toca los botones o pasa por una sustancia y te doy una pista.', '/drogas', 'Empezar');
					});

					$('[data-companion-tip]').on('mouseenter focus', function() {
						showCompanionMessage($(this).data('companion-tip'), $(this).data('companion-url'), $(this).data('companion-action'));
					});

					$tiles.on('mouseenter focusin', function() {
						var title = $.trim($(this).find('h3').text());

						if (title)
							showCompanionMessage('Guía de ' + title + ': revisa duración, riesgos y señales de alerta.', $(this).find('.link').attr('href'), 'Abrir guía');
					});

					$banner.on('mousemove', function(event) {

						if (reducedMotion || skel.breakpoint('small').active)
							return;

						var x = ((event.clientX / Math.max(window.innerWidth, 1)) - 0.5) * 34,
							y = ((event.clientY / Math.max(window.innerHeight, 1)) - 0.5) * 22;

						$companion
							.addClass('is-curious')
							.css({
								'--companion-x': x.toFixed(1) + 'px',
								'--companion-y': y.toFixed(1) + 'px'
							});

					});

					$banner.on('mouseleave', function() {
						$companion.removeClass('is-curious');
					});

					$window.on('scroll.companion', function() {
						if ($window.scrollTop() > ($banner.outerHeight() * 0.85)) {
							$companion.removeClass('has-message is-curious');
							window.clearTimeout(messageTimer);
						}
					});

					window.clearTimeout(curiosityTimer);
					window.setTimeout(function() {
						if ($window.scrollTop() < 40 && !$companion.hasClass('has-message'))
							showCompanionMessage({ text: 'Hola, soy Xolotl. Tócame para recibir pistas rápidas mientras exploras.', url: '/drogas', action: 'Ver guías' });
					}, 900);
					scheduleCuriosity();

				}

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() {
					$window.trigger('scroll');
				});

				$window.on('load', function() {

					$banner.scrollex({
						bottom:		$header.height() + 10,
						terminate:	function() { $header.removeClass('alt'); },
						enter:		function() { $header.addClass('alt'); },
						leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
					});

					window.setTimeout(function() {
						$window.triggerHandler('scroll');
					}, 100);

				});

			}

		// Banner.
			$banner.each(function() {

				var $this = $(this),
					$image = $this.find('.image'), $img = $image.find('img');

				// Parallax.
					$this._parallax(0.275);

				// Image.
					if ($image.length > 0) {

						// Set image.
							$this.css('background-image', 'url(' + $img.attr('src') + ')');

						// Hide original.
							$image.hide();

					}

			});

		// Menu.
			var $menu = $('#menu'),
				$menuInner;

			$menu.wrapInner('<div class="inner"></div>');
			$menuInner = $menu.children('.inner');
			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menuInner
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 250);

				});

			$menu
				.appendTo($body)
				.on('click', function(event) {

					event.stopPropagation();
					event.preventDefault();

					$body.removeClass('is-menu-visible');

				})
				.append('<a class="close" href="#menu">Close</a>');

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('click', function(event) {

					// Hide.
						$menu._hide();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

	});

})(jQuery);
