var React = require('react')
var db = require('level-browserify')('./mydb')

var ListWrapper = React.createClass({
  displayName: 'Selection List Wrapper',
  render: function () {
    var data = JSON.parse(this.props.data)
    return (
      <div className="selection">
        {data.text}
      </div>
    )
  }
})

module.exports = React.createClass({
  displayName: 'Retrieve Value',
  getInitialState: function () {
    return {'selected': []}
  },
  componentDidMount: function () {
    var fingerprint = this.props.fingerprint

    var selected = []

    var that = this

    // Read the entire database. TODO: Change this, it is not efficient.
    db.createReadStream()
      .on('data', function (data) {
        // If a comment is attached to the PDF you're looking at, get it
        if (JSON.parse(data.value).document_id === fingerprint) {
          // Log the results for now. TODO: Send to view
          console.log('Well, this works', JSON.parse(data.value))
          selected.push(data.value)
        }

        // Hypothetically, how you would delete everything
        // db.del(data.key, function(e) { console.log('e', e)})
      }).on('end', function () {
        that.setState({
          'selected': selected
        })
      })
  },
  render: function () {
    var selected = this.state.selected
    return (
      <div>
        {this.state.selected.map(function (selection) {
          return <ListWrapper key={selected.indexOf(selection)} data={selection} />
        })}
      </div>
    )
  }
})
