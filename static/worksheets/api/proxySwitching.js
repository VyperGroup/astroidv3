document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('defaultProxy').value = localStorage.getItem('defaultProxy');
});
document.getElementById('defaultProxyForm').addEventListener('submit', function(event) {
  defaultProxySetting = document.getElementById('defaultProxy').value;
  localStorage.setItem('defaultProxy', defaultProxySetting);
  navigator.serviceWorker.getRegistration(aeroConfig.prefix).then(reg => {
    if (reg) {
      reg.active.postMessage({
        type: "switchProxy",
        data: defaultProxySetting
      })
    }
  });
  alert(defaultProxySetting + ' is now your default proxy!')
});