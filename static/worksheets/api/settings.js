document.addEventListener('DOMContentLoaded', function() {
  //Retrieve saved settings from local storage
  var savedKey = localStorage.getItem('customKey');
  var savedUrl = localStorage.getItem('websiteURL');
  // Set the input values to the saved settings
  document.getElementById('keyInput').value = savedKey || '';
  document.getElementById('urlInput').value = savedUrl || '';

  // Handle form submission
  document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    var customKey = document.getElementById('keyInput').value;
    var websiteURL = document.getElementById('urlInput').value;

    // Save the settings to local storage
    localStorage.setItem('customKey', customKey);
    localStorage.setItem('websiteURL', websiteURL);

    alert('Settings saved successfully!');
  });
});