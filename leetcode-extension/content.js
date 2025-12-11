let lastTitle = '';
let lastUrl = location.href;

function extractTitle() {
  const title = document.querySelector(
    '.text-title-large.font-semibold.text-text-primary.dark\\:text-text-primary a'
  );

  if (title) {
    const titleText = title.textContent.trim();
    // Only log if the title has changed
    if (titleText !== lastTitle && titleText) {
      lastTitle = titleText;
      console.log("Problem Title:", titleText);
      
      // Send to background script
      chrome.runtime.sendMessage({
        type: 'PROBLEM_TITLE',
        title: titleText
      });
      
      // Send to local server for Discord RPC
      fetch('http://localhost:3000/api/problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleText,
          url: window.location.href
        })
      })
      .then(response => response.json())
      .then(data => console.log('Sent to Discord RPC server:', data))
      .catch(error => console.error('Error sending to server:', error));
    }
  }
}

function handleNavigation() {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    lastTitle = ''; // Reset to allow new title
    setTimeout(extractTitle, 1500);
  }
}

// Run initially after page loads
setTimeout(extractTitle, 1500);

// Method 1: Check URL changes via setInterval (backup method)
setInterval(handleNavigation, 1000);

// Method 2: Override pushState and replaceState (primary method for SPA navigation)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(this, arguments);
  handleNavigation();
};

history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  handleNavigation();
};