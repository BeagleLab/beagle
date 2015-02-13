	console.log("Inside Background Page")


	// THIS BREAKS. WHY
	// Context Menu
	// chrome.contextMenus.create({
	//    title: 'Beagle',
	//    contexts: ['page'],
	//    onclick: function (detail, tab) { fxt(tab) }
	// });
	// END BREAK

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
