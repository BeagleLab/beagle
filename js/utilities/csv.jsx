/** @jsx React.DOM */
var React = require('react')

var Util = {}

Util.csv = React.createClass({
	displayName: 'csv',
	render: function () {
    var items = {}

    var length = this.props.data.length

    var field = this.props.field

    this.props.data.forEach(function (result, i) {
      // If result.id can look like a number (consider short hashes), then
      // object iteration order is not guaranteed. In this case, we add a prefix
      // to ensure the keys are strings.
      if (i + 1 !== length) {
        items['result-' + i] = <span>{result[field]}, </span>
      } else {
        items['result-' + i] = <span>{result[field]} </span>
      }
    })

    return (
      <span>
        {items}
      </span>
    )
  }
})

module.exports = Util.csv
