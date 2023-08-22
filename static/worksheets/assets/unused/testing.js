(function(){// Access the iframe element
    var iframe = document.querySelector('iframe[src="/ultraviolet/hvtr%3A-%2Flge.qhwtvlgdgv%2Crgpn.ao"]');
    
    // Check if the iframe exists
    if (iframe) {
      // Access the contentWindow of the iframe
      var iframeContent = iframe.contentWindow;
    
      // Access the document within the iframe
      var iframeDocument = iframeContent.document;
    
      // Select the element within the ifra
      var elementWithinIframe = iframeDocument.querySelector('.sc-kQoPux.gXxnRy.footer');
      var elementWithinIframe1 = iframeDocument.getElementById('js-game-video');
    
      if (elementWithinIframe) {
        elementWithinIframe.style.marginTop = '375px';
        elementWithinIframe1.style.marginTop = '375px';
      }
    }})();