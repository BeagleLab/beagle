console.log('Inside Background Page')

// Load in the chrome extension screen capture code
require('chrome-ext-screen-capture').backgroundPage()

// TODO Look into whether context menus would work

var browserExtension = new (require('./lib/chrome-extension'))({
  chromeTabs: chrome.tabs,
  chromeBrowserAction: chrome.browserAction,
  extensionURL: function (path) {
    return chrome.extension.getURL(path)
  },
  isAllowedFileSchemeAccess: function (fn) {
    return chrome.extension.isAllowedFileSchemeAccess(fn)
  }
})

browserExtension.listen(window)

// TODO Look into onInstalled and onUpdated.
