document.addEventListener('DOMContentLoaded', function() {
  var savedKey = localStorage.getItem('customKey');
  var savedUrl = localStorage.getItem('websiteURL');
  document.getElementById('keyInput').value = savedKey || '';
  document.getElementById('urlInput').value = savedUrl || '';

  document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var customKey = document.getElementById('keyInput').value;
    var websiteURL = document.getElementById('urlInput').value;

    localStorage.setItem('customKey', customKey);
    localStorage.setItem('websiteURL', websiteURL);

    alert('Settings saved successfully!');
  });
});