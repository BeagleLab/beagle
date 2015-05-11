var React = require('react')
var Modal = require('../components/modal.jsx')
var PublicationList = require('../components/publicationsList.jsx')

module.exports = React.createClass({
	displayName: 'Graph Modal',
  render: function () {
    return (
      <Modal>
        <h4 className="gray">Publication Graph</h4>
        <p className="lead">{this.props.data.title}</p>

        <h5>Cited by {this.props.data.publication.cited_by.length}:</h5>
        <PublicationList data={this.props.data.publication.cited_by} />

        <h5>Cites {this.props.data.publication.cites.length}:</h5>
        <PublicationList data={this.props.data.publication.cites} />

        <h5>Related to {this.props.data.publication.related.length}:</h5>
        <PublicationList data={this.props.data.publication.related} />
      </Modal>
    )
  }
})
