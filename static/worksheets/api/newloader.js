// Get the form and form elements
const form = document.getElementById('settings-form');
const faviconSelect = form.elements['favicon'];
const faviconURL = document.getElementById('faviconurl');
const siteNameInput = form.elements['site-name'];
const button = form.querySelector('button');
const favicon = document.querySelector('link[rel="icon"]');

// Get the saved settings, or set default values
const savedSettings = JSON.parse(localStorage.getItem('site-settings')) || {};
const defaultFavicon = '/worksheets/assets/favicon/gmail-16-16.png';
const defaultSiteName = 'Inbox';

// Apply the settings site-wide
document.title = savedSettings.siteName || defaultSiteName;
const options = Array.from(faviconSelect.options);

// Check if the saved favicon is in the options
const matchingOption = options.find(option => option.value === savedSettings.favicon);

if (matchingOption) {
  // If a matching option is found, set the select value to that
  faviconSelect.value = savedSettings.favicon;
  faviconURL.value = savedSettings.favicon;
  favicon.href = savedSettings.favicon;
} else if (savedSettings.custom) {
  // If no matching option is found and custom is true, set the select value to "Custom"
  faviconSelect.value = "Custom";
  faviconURL.value = savedSettings.favicon;
  favicon.href = savedSettings.favicon;
} else {
  // If no matching option and custom is false, use the default favicon
  faviconSelect.value = defaultFavicon;
  faviconURL.value = defaultFavicon;
  favicon.href = defaultFavicon;
}

siteNameInput.value = savedSettings.siteName || defaultSiteName;

// Update favicon and save settings when changed
faviconSelect.addEventListener('change', () => {
  if (faviconSelect.value === "Custom") {
    favicon.href = faviconURL.value;
  } else {
    faviconURL.value = faviconSelect.value;
    favicon.href = faviconSelect.value;
  }
  saveSettings();
});

faviconURL.addEventListener('change', () => {
  faviconSelect.value = "Custom";
  favicon.href = faviconURL.value;
  saveSettings();
});

// Update title and save settings when changed
siteNameInput.addEventListener('input', () => {
  document.title = siteNameInput.value;
  saveSettings();
});

button.addEventListener('click', (event) => {
  event.preventDefault();
  saveSettings();
  alert('Settings saved, please refresh to apply changes.');
});

// Save the settings to localStorage
function saveSettings() {
  const settings = {
    favicon: faviconSelect.value === "Custom" ? faviconURL.value : faviconSelect.value,
    siteName: siteNameInput.value,
    custom: faviconSelect.value === "Custom"
  };
  localStorage.setItem('site-settings', JSON.stringify(settings));
  console.log("Settings saved!");
}