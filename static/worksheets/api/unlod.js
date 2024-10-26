if (localStorage.getItem('unlod') != "false") {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
    });
}