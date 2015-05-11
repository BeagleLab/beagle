/** @jsx React.DOM */
var React = require('react')

var TfIdf = React.createClass({
  displayName: 'TfIdf',
  render: function () {
    var items = {}

    var length = this.props.data.length

    this.props.data.forEach(function (result, i) {
      // If result.id can look like a number (consider short hashes), then
      // object iteration order is not guaranteed. In this case, we add a prefix
      // to ensure the keys are strings.
      if (i + 1 !== length) {
        items['result-' + i] = <span>{result}, </span>
      } else {
        items['result-' + i] = <span>{result} </span>
      }
    })

    return (
      <div>
        {items}
      </div>
    )
  }
})

module.exports = TfIdf
