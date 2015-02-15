var extensionURL = function (path) {
  return chrome.extension.getURL(path);
}

var getPDFViewerURL = function(url) {
	var PDF_VIEWER_URL = extensionURL('/content/web/viewer.html');
	return PDF_VIEWER_URL + '?file=' + encodeURIComponent(url);
}

var isPDFURL = function(url) {
	return url.toLowerCase().indexOf('.pdf') > 0;
}

var isPDFViewerURL = function(url) {
	return url.indexOf(getPDFViewerURL('')) === 0;
}

var isFileURL = function(url) {
	return url.indexOf("file:") === 0;
}

var isSupportedURL = function(url) {
	var SUPPORTED_PROTOCOLS = ['http:', 'https:', 'ftp:'];
	return SUPPORTED_PROTOCOLS.some(function (protocol) {
		return url.indexOf(protocol) === 0;
	});
}

module.exports.getPDFViewerURL = exports.getPDFViewerURL = getPDFViewerURL
module.exports.isPDFURL = exports.isPDFURL = isPDFURL
module.exports.isPDFViewerURL = exports.isPDFViewerURL = isPDFViewerURL
module.exports.isFileURL = exports.isFileURL = isFileURL
module.exports.isSupportedURL = exports.isSupportedURL = isSupportedURL
