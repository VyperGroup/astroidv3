function search(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();
  let url = "";

  // check if entered value is a valid URL
  try {
    const urlObject = new URL(query);
    if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
      urlObject.protocol = "https:";
    }
    url = urlObject.toString();
  } catch {
    // if not a valid URL but has a TLD, add "https://" in front
    if (/^[a-z]+\.[a-z]{2,}$/i.test(query)) {
      url = "https://" + query;
    } else {
      // if not a valid URL and doesn't have a TLD, search for the entered v   alue on Google
      url = "https://google.com/search?q=" + encodeURIComponent(query);
    }
  }

  // redirect to HTML loader
  window.navigator.serviceWorker.register("/sw.js", {
    scope: __uv$config.prefix
  })
  .then(() => {
    console.log("Service worker registration successful");

    sessionStorage.setItem("uvURL", __uv$config.encodeUrl(url));
    let uvURL = sessionStorage.getItem("uvURL");
    url = "/service/" + uvURL;
    console.log(url);
    location.href = url;
    console.log("loading site");
  })
  .catch((error) => {
    console.error("Service worker registration failed:", error);
  });
}