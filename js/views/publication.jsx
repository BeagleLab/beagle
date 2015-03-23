var React = require('react')

module.exports = React.createClass({
	displayName: 'Publication',
  propTypes: {
   data: React.PropTypes.object
  },
  render: function () {
    var dummyWarning

    if (this.props.data.id === '000000') {
      var style = {color: 'red'}
      dummyWarning = <p style={style}>Unable to find DOI: presenting sample data.</p>
    }

    return (
      <div>
        { dummyWarning }
        <ul>
          <li id='title'>{this.props.data.title}</li>
          <li>{this.props.data.journal}</li>
          <li>{this.props.data.doi}</li>
        </ul>
      </div>
    )
  }
})
