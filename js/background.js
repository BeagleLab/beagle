(function () {
  'use strict';



	// /*Send request to current tab when page action is clicked*/
	// function fxt(tab) {
	// 	chrome.tabs.getSelected(null, function(tab) {
 //      console.log("Hello")
	// 		chrome.tabs.sendMessage(
	// 			//Selected tab id
	// 			tab.id,
	// 			//Params inside a object data
	// 			{
	// 				callFunction: "toggleSidebar",
	// 				modules: [  'altmetrics' ]
	// 			}
 //        //,
	// 			//Optional callback function
	// 			// function(response) {
	// 			// 	alert('Chrome tabs message sent.')	
	// 			// }
	// 		);
	// 	});
	// }

	// chrome.browserAction.onClicked.addListener(fxt);

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
  chrome.runtime.onInstalled.addListener(onInstalled);
  chrome.runtime.onUpdateAvailable.addListener(onUpdateAvailable);

  // function onInstalled(installDetails) {
  //   if (installDetails.reason === 'install') {
  //     browserExtension.firstRun();
  //   }

  //   // We need this so that 3rd party cookie blocking does not kill us.
  //   // See https://github.com/hypothesis/h/issues/634 for more info.
  //   // This is intended to be a temporary fix only.
  //   var details = {
  //     primaryPattern: 'https://hypothes.is/*',
  //     setting: 'allow'
  //   };
  //   chrome.contentSettings.cookies.set(details);
  //   chrome.contentSettings.images.set(details);
  //   chrome.contentSettings.javascript.set(details);

  //   browserExtension.install();
  // }

  // function onUpdateAvailable() {
  //   // TODO: Implement a "reload" notification that tears down the current
  //   // tabs and calls chrome.runtime.reload().
  // }
})();
