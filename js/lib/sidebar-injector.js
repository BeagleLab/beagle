'use strict';

var err = require("./help-page")
var urlChecks = require("./url-checks")

/* The SidebarInjector is used to deploy and remove the Hypothesis sidebar
 * from tabs. It also deals with loading PDF documents into the PDF.js viewer
 * when applicable.
 *
 * chromeTabs - An instance of chrome.tabs.
 * dependencies - An object with additional helper methods.
 *   isAllowedFileSchemeAccess: A function that returns true if the user
 *   can access resources over the file:// protocol. See:
 *   https://developer.chrome.com/extensions/extension#method-isAllowedFileSchemeAccess
 *   extensionURL: A function that receives a path and returns an absolute
 *   url. See: https://developer.chrome.com/extensions/extension#method-getURL
 */
function SidebarInjector(chromeTabs, dependencies) {
  dependencies = dependencies || {};

  var isAllowedFileSchemeAccess = dependencies.isAllowedFileSchemeAccess;
  var extensionURL = dependencies.extensionURL;

  if (typeof extensionURL !== 'function') {
    throw new TypeError('extensionURL must be a function');
  }

  if (typeof isAllowedFileSchemeAccess !== 'function') {
    throw new TypeError('isAllowedFileSchemeAccess must be a function');
  }

  /* Injects the Hypothesis sidebar into the tab provided.
   *
   * tab - A tab object representing the tab to insert the sidebar into.
   *
   * Returns a promise that will be resolved if the injection succeeded
   * otherwise it will be rejected with an error.
   */
  this.injectIntoTab = function (tab) {
    console.log("injectIntoTab: ", tab.url)
    if (urlChecks.isFileURL(tab.url)) {
      return injectIntoLocalDocument(tab);
    } else {
      return injectIntoRemoteDocument(tab);
    }
  };

  /* Removes the Hypothesis sidebar from the tab provided.
   *
   * tab - A tab object representing the tab to remove the sidebar from.
   *
   * Returns a promise that will be resolved if the removal succeeded
   * otherwise it will be rejected with an error.
   */
  this.removeFromTab = function (tab) {
    if (urlChecks.isPDFViewerURL(tab.url)) {
      return removeFromPDF(tab);
    } else {
      return removeFromHTML(tab);
    }
  };

  function injectIntoLocalDocument(tab) {
    if (urlChecks.isPDFURL(tab.url)) {
      return injectIntoLocalPDF(tab);
    } else {
      return Promise.reject(new err.LocalFileError('Local non-PDF files are not supported'));
    }
  }

  function injectIntoRemoteDocument(tab) {
    return urlChecks.isPDFURL(tab.url) ? injectIntoPDF(tab) : injectIntoHTML(tab);
  }

  function injectIntoPDF(tab) {
    return new Promise(function (resolve, reject) {
      if (!urlChecks.isPDFViewerURL(tab.url)) {
        chromeTabs.update(tab.id, {url: urlChecks.getPDFViewerURL(tab.url)}, function () {
        	sendMessageToEmbedBeagle()
          resolve();
        });
      } else {
      	sendMessageToEmbedBeagle()
        resolve();
      }
    });
  }

  function injectIntoLocalPDF(tab) {
    return new Promise(function (resolve, reject) {
      isAllowedFileSchemeAccess(function (isAllowed) {
        if (isAllowed) {
          resolve(injectIntoPDF(tab));
        } else {
          reject(new err.NoFileAccessError('Local file scheme access denied'));
        }
      });
    });
  }

  function injectIntoHTML(tab) {
    return new Promise(function (resolve, reject) {
      if (!urlChecks.isSupportedURL(tab.url)) {
        var protocol = tab.url.split(':')[0];
        return reject(new err.RestrictedProtocolError('Cannot load Hypothesis into ' + protocol + ' pages'));
      }

      return (function (isInjected) {
        if (!isInjected) {
        	console.log('Normally, inject public/config here.')
          // injectConfig(tab.id).then(function () {
            chromeTabs.executeScript(tab.id, {
              code: 'window.annotator = true'
            }, function () {
              console.log('Normally, execute public/embed.js here.')
              sendMessageToEmbedBeagle()
              // chromeTabs.executeScript(tab.id, {
              //   file: 'public/embed.js'
              // }, resolve);
            });
          // });
        } else {
        	sendMessageToEmbedBeagle()
          resolve();
        }
      })()
    });
  }

  function removeFromPDF(tab) {
    return new Promise(function (resolve) {
      var url = tab.url.slice(urlChecks.getPDFViewerURL('').length).split('#')[0];
      chromeTabs.update(tab.id, {
        url: decodeURIComponent(url)
      }, resolve);
    });
  }

  function removeFromHTML(tab) {
    return new Promise(function (resolve, reject) {
      if (!urlChecks.isSupportedURL(tab.url)) {
        return resolve();
      }

      // TODO Implement removal

      return isSidebarInjected(tab.id).then(function (isInjected) {
        // var src  = extensionURL('/public/destroy.js');
        // var code = 'var script = document.createElement("script");' +
        //   'script.src = "{}";' +
        //   'document.body.appendChild(script);' +
        //   'delete window.annotator;';

        // if (isInjected) {
        // chromeTabs.executeScript(tab.id, {
        //   // code: code.replace('{}', src)
        // }, resolve);
    		// resolve()
        // } else {
          resolve();
        // }
      });
    });
  }

  function isSidebarInjected(tabId) {
    return new Promise(function (resolve, reject) {
      return chromeTabs.executeScript(tabId, {code: 'window.annotator'}, function (result) {
        var isAnnotatorSet = !!(result && result[0]);
        resolve(isAnnotatorSet);
      });
    });
  }

  function sendMessageToEmbedBeagle () {
  	chromeTabs.getSelected(null, function(tab) {
      chromeTabs.sendMessage(
        //Selected tab id
        tab.id,
        //Params inside a object data
        {
          callFunction: "toggleSidebar",
          modules: [  'altmetrics' ]
        },
        // Optional callback function
        function(response) {
	        console.log("Chrome tabs message 'toggleSidebar' sent.")
        }
      )
    })
  }

  // function injectConfig(tabId) {
  //   return new Promise(function (resolve) {
  //     var src  = extensionURL('/public/config.js');
  //     var code = 'var script = document.createElement("script");' +
  //       'script.src = "{}";' +
  //       'document.body.appendChild(script);';
  //     chromeTabs.executeScript(tabId, {code: code.replace('{}', src)}, resolve);
  //   });
  // }
}

module.exports = exports = SidebarInjector
