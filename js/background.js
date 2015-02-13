	console.log("Inside Background Page")

	// TODO Look into whether context menus would work

  var browserExtension = new (require("./lib/chrome-extension"))({
    chromeTabs: chrome.tabs,
    chromeBrowserAction: chrome.browserAction,
    extensionURL: function (path) {
      return chrome.extension.getURL(path);
    },
    isAllowedFileSchemeAccess: function (fn) {
      return chrome.extension.isAllowedFileSchemeAccess(fn);
    },
  });

  browserExtension.listen(window);

  // TODO Look into onInstalled and onUpdated.
