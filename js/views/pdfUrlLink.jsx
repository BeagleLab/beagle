var React = require('react')
var url = require('../lib/url-checks')

var PDFUrlLink = React.createClass({
  displayName: 'PDFURLLink',

  getInitialState: function () {
    return { 'urlLink': null }
  },

  render: function () {
    var location = null

    if (this.props.location) {
      var urlLink = url.getPDFURL(window.location.href)

      var style = {
        'position': 'absolute',
        'bottom': '15px'
      }

      location = (<div style={style}>
         {urlLink}
        </div>)
    }

    return location
  }
})

module.exports = exports = PDFUrlLink
