var React = require('react')
var PublicationsList = require('../components/publicationsList.jsx')



module.exports = React.createClass({
	render: function() {

		var paperlist = ['This is a paper', 'this is a paper']

		return (
      <div className="panel-body">

				<h4 className="gray">My Papers</h4>

				<ul className="nav nav-pills nav-justified">
				  <li className="active"><a href="#">My Papers</a></li>
				  <li><a href="#">Shared With Me</a></li>
				  <li><a href="#">Saved for later</a></li>
				</ul>

				<br />
				<PublicationsList data={paperlist} />

			</div>
		)
	}
})
