const ABCCheckbox = document.getElementById('ABC');
const ABCDirect = document.getElementById('ABCDirect');

function handleCheckboxChange() {
    const startScriptOnLoad = ABCCheckbox.checked;

    localStorage.setItem('startScriptOnLoad', startScriptOnLoad);

    if (startScriptOnLoad) {
        console.log('ABC will start on page load.');
    } else {
        console.log('ABC will NOT start on page load.');
    }
}

function handleTextChange() {
    localStorage.setItem('directPreviousPage', ABCDirect.value);
    console.log('ABC will direct to ' + ABCDirect.value + ' on page load.');
}

ABCDirect.addEventListener('change', handleTextChange);
ABCCheckbox.addEventListener('change', handleCheckboxChange);

window.addEventListener('load', () => {
    const startScriptOnLoad = localStorage.getItem('startScriptOnLoad');
    const directPreviousPage = localStorage.getItem('directPreviousPage');

    if (startScriptOnLoad === 'true') {
        ABCCheckbox.checked = true;
    } else {
        ABCCheckbox.checked = false;
    }
    if (directPreviousPage == null) {
        ABCDirect.value = 'https://google.com/';
    } else {
        ABCDirect.value = directPreviousPage;
    }
});