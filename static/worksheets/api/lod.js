		const savedSettings = JSON.parse(localStorage.getItem('site-settings')) || {};
		const defaultFavicon = '/worksheets/assets/favicon/gmail-16-16.png';
		const defaultSiteName = 'Inbox';

		const favicon = document.querySelector('link[rel="icon"]');
		favicon.href = savedSettings.favicon || defaultFavicon;
		document.title = savedSettings.siteName || defaultSiteName;

		document.addEventListener('DOMContentLoaded', function() {
			var customKey = localStorage.getItem('customKey');
			var websiteURL = localStorage.getItem('websiteURL');

			if (customKey && websiteURL) {
				document.addEventListener('keydown', function(event) {
					if (event.key === customKey) {
						window.location.replace(websiteURL);
					}
				});
			}		});

