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

  // TODO Look into onInstalled and onUpdated.
