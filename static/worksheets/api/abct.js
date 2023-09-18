const ABCCheckbox = document.getElementById('ABC');

function handleCheckboxChange() {
    const startScriptOnLoad = ABCCheckbox.checked;

    localStorage.setItem('startScriptOnLoad', startScriptOnLoad);

    if (startScriptOnLoad) {
        console.log('ABC will start on page load.');
    } else {
        console.log('ABC will NOT start on page load.');
    }
}

ABCCheckbox.addEventListener('change', handleCheckboxChange);

window.addEventListener('load', () => {
    const startScriptOnLoad = localStorage.getItem('startScriptOnLoad');

    if (startScriptOnLoad === 'true') {
        ABCCheckbox.checked = true;
    } else {
        ABCCheckbox.checked = false;
    }
});