var React = require('react')
var Save = require('../components/save.jsx')
var PublicationsList = require('../components/publicationsList.jsx')
var Contact = require('../components/contact.jsx')
var Modal = require('../components/modal.jsx')

module.exports = React.createClass({
	displayName: 'Author Modal',
	render: function() {
		return (
      <Modal>
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
      </Modal>
		)
	}
})
