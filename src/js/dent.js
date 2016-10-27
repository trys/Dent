require('./lib/bling');
var reqwest = require('reqwest');
var serialize = require('./lib/serialize');

var Dent = (function () {
	"use strict";

	var $forms, $links, $wrapper;

	return {
		Init: function () {

			$wrapper = document.getElementById('dent');
			if ( $wrapper.length === 0 ) {
				return;
			}

			Dent.Events.Setup();
			Dent.Attach();

		},

		Attach: function() {
			Dent.Setup.FindForms();
			Dent.Setup.AddFormListeners();
			$wrapper = document.getElementById('dent');
		},

		Setup: {

			FindForms: function() {
				
				$forms = $('[data-dent]');
				if ( $forms.length === 0 ) {
					return;
				}

			},

			AddFormListeners: function() {

				$forms.on('submit', Dent.Interaction.Form);

			}

		},

		Interaction: {

			Form: function(event) {

				var targetForm = event.target,
					method = targetForm.method ? targetForm.method : 'get',
					formData = serialize( targetForm );

				reqwest({
					url: targetForm.action,
					method: method,
					data: formData,
					success: function (response) {
						Dent.Events.Create('dentFormSuccess');

						var wrappedResponse = Dent.Interaction.WrapResponse(response);
						var filteredResponse = Dent.Interaction.FindInElement(wrappedResponse, '#dent');
						if ( filteredResponse ) {
							Dent.Interaction.FindAndReplace($wrapper, filteredResponse);
						}
					},
					error: function (error) {
						Dent.Events.Create('dentFormFailure', { message: error });
						console.log( 'Failure: ', error );
					}
				});

				event.preventDefault();

			},

			WrapResponse: function(response) {
				var parser = new DOMParser();
				return parser.parseFromString(Dent.Interaction.SanitizeResponse(response), 'text/html');
			},

			SanitizeResponse: function(response) {
				return response.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "" );
			},

			FindInElement: function(element, selector) {
				return element.querySelector(selector);
			},

			FindAndReplace: function(find, replace) {
				console.log( replace, find );
				find.parentNode.replaceChild(replace, find);
				Dent.Attach();
			}

		},

		Events: {

			Setup: function() {

				window.on('dentFormSuccess', function(event) {
					// console.log( event );
				});

				window.on('dentFormFailure', function(event) {
					// console.log( event );
				});

			},

			Create: function(name, data, element) {
				element = element || window;
				data = data || {};
				name = name || 'dentFormSuccess';
				var event;

				if (window.CustomEvent) {
					event = new CustomEvent(name, {detail: data});
				} else {
					event = document.createEvent('CustomEvent');
					event.initCustomEvent(name, true, true, data);
				}

				element.dispatchEvent(event);
			}

		}
	};
}());
Dent.Init();