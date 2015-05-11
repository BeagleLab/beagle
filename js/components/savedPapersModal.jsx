var React = require('react')
var PublicationsList = require('../components/publicationsList.jsx')
var Modal = require('../components/modal.jsx')


module.exports = React.createClass({
	displayName: 'Saved Papers Modal',
	render: function() {

		var paperlist = ['This is a paper', 'this is a paper']

		return (
      <Modal>

				<h4 className="gray">My Papers</h4>

				<ul className="nav nav-pills nav-justified">
				  <li className="active"><a href="#">My Papers</a></li>
				  <li><a href="#">Shared With Me</a></li>
				  <li><a href="#">Saved for later</a></li>
				</ul>

				<br />
				<PublicationsList data={paperlist} />

			</Modal>
		)
	}
})
