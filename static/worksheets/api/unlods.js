unlods = document.getElementById('onbeforeunload');
window.addEventListener('load', () => {
    unlods.value = localStorage.getItem('onbeforeunload');
});
document.getElementById('onbeforeunloadForm').addEventListener('submit', (event) => {
    onbeforeunloadSetting = document.getElementById('onbeforeunload').value;
    localStorage.setItem('onbeforeunload', onbeforeunloadSetting);
    alert(onbeforeunloadSetting + ' is now your default onbeforeunload setting!')
});