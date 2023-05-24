console.warn(
    "%cNote!",
    "color: purple; font-weight: 600; background: yellow; padding: 0 5px; border-radius: 5px",
    "lol"
  );
  function log(text) {
    console.log("%cSite script", "color: red; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
  }
  function tab(text) {
    console.log("%cTab Cloak", "color: green; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
  }
  function script(text) {
    console.log("%cScript Injection", "color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
  }

  function returnText(){
    let input = document.getElementById("username").value;
    alert(input);
}

  
  tab("Enabling Cloak");
  const local_title = localStorage.getItem("title");
  const local_icon = localStorage.getItem("icon");
  
  if (window.localStorage.hasOwnProperty("title")) {
    document.title = local_title;
    tab("Title is set to: " + local_title);
  } else {
    tab("Title is not set.");
  }
  if (window.localStorage.hasOwnProperty("icon")) {
    document.querySelector("link[rel=icon]").href = local_icon;
    tab("Icon is set to: " + local_icon);
  } else {
    tab("Icon is not set.");
  }
  tab("Cloak can be set in the settings page.");

  script("Enabling 2 scripts.");
  
  const gascript = document.createElement("script");
  gascript.setAttribute("async", "");
  gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-98DP5VKS42");
  const inlinegascript = document.createElement("script");
  inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-98DP5VKS42');`;
  document.head.append(gascript, inlinegascript);
  script("Enabled Script 1/2");
  
  const dmca = document.createElement("img");
  dmca.setAttribute("src", "https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=b58222e2-70c9-4ade-b53a-ef9a7b5ea03b");
  dmca.setAttribute("style", "display: none;")
  const dmcaS = document.createElement("script");
  dmcaS.setAttribute("src", "https://images.dmca.com/Badges/DMCABadgeHelper.min.js");
  script("Enabled Script 2/2");
  
  log("Enabling Scripts finished!");
  
  log("All done!");