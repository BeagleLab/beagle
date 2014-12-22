var React = require('react')
var Save = require('../components/save.jsx')
var PublicationsList = require('../components/publicationsList.jsx')
var Contact = require('../components/contact.jsx')

// Example data
// var author = {
// 	'name': 'Richard Feynman',
// 	'university': 'CIT',
// 	'department': 'Physics',
// 	'photo': 'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg',
// 	'publications': [
// 		'Lectures on Physics 1',
// 		'Lectures on Physics 2',
// 		'Lectures on Physics 3'
// 	]
// }

module.exports = React.createClass({
	displayName: 'Author Modal',
	render: function() {
		return (
      <div className="panel-body">
        <div className="profile-header">
          <img className="profile-image" src={this.props.data.author.photo} />
          <div className="profile-header-info">
            <h3>{this.props.data.author.name}</h3>
            <ul className="no-bullet">
              <li>{this.props.data.author.university}</li>
              <li>{this.props.data.author.department}</li>
            </ul>

            <Contact data={this.props.data} /><br />

            <div className='graph-container'>
            	<img className='graph' src={this.props.data.author.graph} />
            </div>

          </div>
          <div className="publications">

            <h5>Publications</h5>
            <PublicationsList data={this.props.data.author.publications} />

          </div>
        </div>
      </div>
		)
	}
})
