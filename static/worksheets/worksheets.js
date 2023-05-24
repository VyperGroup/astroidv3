// Assuming __uv$config is defined in a separate script file
// and properly included in the HTML file before this script

function worksheets(value) {
  window.navigator.serviceWorker.register("/static/worksheets/uv/sw.js", {
    scope: __uv$config.prefix,
  })
  .then(() => {
    console.log("Service worker registration successful");

    const url = value.trim();
    if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "https://" + url;
    }
    sessionStorage.setItem("uvURL", __uv$config.encodeUrl(url));
    console.log("Session storage successful");

    location.href = "html-loader.html";
    console.log("Redirection successful");
  })
  .catch((error) => {
    console.error("Service worker registration failed:", error);
  });
}
