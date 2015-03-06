var React = require('react')
var db = require('level-browserify')('./mydb')

module.exports = React.createClass({
  displayName: 'Retrieve Value',
  handleClick: function (event) {
    var fingerprint = this.props.fingerprint

    // Read the entire database. TODO: Change this, it is not efficient.
    db.createReadStream()
      .on('data', function(data){

        // If a comment is attached to the PDF you're looking at, get it
        if (JSON.parse(data.value).document_id === fingerprint) {
          // Log the results for now. TODO: Send to view
          console.log('Well, this works', JSON.parse(data.value))
        }

        // Hypothetically, how you would delete everything
        // db.del(data.key, function(e) { console.log('e', e)})
      })
      .on('close', function(){
        console.log('Database exhausted.')
      })

  },
  render: function () {
    // db.get('text', function (err, value) {
    //   if (err) return console.log('Ooops!', err) // likely the key was not found
    //   value = value
    // })
    return (
      <button className="btn btn-success" type="button" onClick={this.handleClick}>
        Log data
      </button>
    )
  }
})
