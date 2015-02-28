var React = require('react')
var db = require('level-browserify')('./mydb')

module.exports = React.createClass({
  displayName: 'Retrieve Value',
  getData: function () {
    db.createValueStream()
		  .on('data', function (data) {
		    console.log('value=', data)
		  	return data
		  })

  },
  render: function () {
    // db.get('text', function (err, value) {
    //   if (err) return console.log('Ooops!', err) // likely the key was not found
    //   value = value
    // })
    return (
      <p>{this.getData}</p>
    )
  }
})
