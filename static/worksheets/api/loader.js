// Get the form and form elements
const form = document.getElementById('settings-form');
const faviconSelect = form.elements['favicon'];
const siteNameInput = form.elements['site-name'];

// Get the saved settings, or set default values
const savedSettings = JSON.parse(localStorage.getItem('site-settings')) || {};
const defaultFavicon = 'default-favicon.png';
const defaultSiteName = 'My Site';

// Set the default values
faviconSelect.value = savedSettings.favicon || defaultFavicon;
siteNameInput.value = savedSettings.siteName || defaultSiteName;

// Apply the settings site-wide
const favicon = document.querySelector('link[rel="icon"]');
favicon.href = faviconSelect.value;
document.title = siteNameInput.value;

// Update favicon and save settings when changed
faviconSelect.addEventListener('change', () => {
  favicon.href = faviconSelect.value;
  saveSettings();
});

// Update title and save settings when changed
siteNameInput.addEventListener('input', () => {
  document.title = siteNameInput.value;
  saveSettings();
});

// Save the settings to localStorage
function saveSettings() {
  const settings = {
    favicon: faviconSelect.value,
    siteName: siteNameInput.value
  };
  localStorage.setItem('site-settings', JSON.stringify(settings));
}

console.log(No)
