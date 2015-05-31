/*globals chrome */
'use strict'

module.exports = function (props, path) {
  var staticPath
  if (!path) return
  // props is canonically this.props.staticPath, if defined
  if (props) {
    staticPath = props + path
  } else if (chrome && chrome.extension) {
    staticPath = chrome.extension.getURL(path)
  } else {
    staticPath = path
  }
  return staticPath
}
