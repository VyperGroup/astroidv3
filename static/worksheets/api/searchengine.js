document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('searchengine').value = localStorage.getItem('searchengine');
});
document.getElementById('searchEngineForm').addEventListener('submit', function(event) {
  searchEngineSetting = document.getElementById('searchengine').value;
  localStorage.setItem('searchengine', searchEngineSetting);
  alert(searchEngineSetting + ' is now your default search engine!')
});