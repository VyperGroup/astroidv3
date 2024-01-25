window.addEventListener('load', function () {
    const startScriptOnLoad = localStorage.getItem('startScriptOnLoad');

    if (startScriptOnLoad === 'true') {
        var directPreviousPage = localStorage.getItem('directPreviousPage') || 'https://www.google.com/';
        var currentURL = window.location.href;
        var baseURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1);
        var indexURL = baseURL + "main.html";

        win = window.open();
        win.document.body.style.margin = "0";
        win.document.body.style.height = "100vh";
        var iframe = win.document.createElement("iframe");
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.margin = "0";
        iframe.referrerpolicy = "no-referrer";
        iframe.allow = "fullscreen";
        iframe.src = indexURL;
        win.document.body.appendChild(iframe);
        this.window.location.replace(directPreviousPage);
    }
});