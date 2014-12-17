var React = require('react')
var SocialSharing = require('./socialsharing.jsx')

var PublicationsListWrapper = React.createClass({
  render: function() {
  	return <li><a className="tag" href="#">{this.props.data}</a></li>
  }
});

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

	render: function() {
		return (
      <div className="subpanel profile panel panel-default">
        <div className="panel-body">
	        <div className="profile-header">
	          <img className="profile-image" src={this.props.data.author.photo} />
	          <div className="profile-header-info">
	            <h3>{this.props.data.author.name}</h3>
	            <ul className="no-bullet">
	              <li>{this.props.data.author.university}</li>
	              <li>{this.props.data.author.department}</li>
	            </ul>

	            {/* This should be a component */}
	            <div className="btn-group">
	              <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Save"><i className="fa fa-star"></i></button>
	              <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Share"><i className="fa fa-share"></i></button>
	              <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Message"><i className="fa fa-comment"></i></button>
	            </div>

	          </div>
	          <div className="publications">
	            <h5>Publications</h5>
	            <ul>
								{this.props.data.author.publications.map(function(publication){
				          return <PublicationsListWrapper key={publication.id} data={publication} />
				        })}
	            </ul>
	          </div>
	        </div>
        </div>
      </div>
		)
	}
})
