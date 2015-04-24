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

OAuth.initialize('IHLK6uDxpnuH1S71dCwbf30bjBM')
console.log('Hi mom!');
//Using popup
OAuth.popup('facebook')
    .done(function(result) {
      console.log('Hi mom!!', result)
      //use result.access_token in your API request
      //or use result.get|post|put|del|patch|me methods (see below)
    })
    .fail(function (err) {
      console.log('Oh.', err)
      //handle error with err
});
