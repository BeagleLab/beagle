/** @jsx React.DOM */
var React = require('react');
var Modal = require('../components/modal.jsx')
var Input = require('react-bootstrap').Input
var Button = require('react-bootstrap').Button

var NoteModal = React.createClass({
  displayName: 'NoteModal',
  render: function () {
    return (
      <Modal>
      	<h6>Notes:</h6>
      	<Input type="textarea" label="Comment about paper" placeholder="Paper notes go here..." wrapperClassName="note-input" />
      	<div className="save-section">
	      	<Button bsStyle="link">Cancel</Button> <Button bsStyle="primary">Save</Button>
      	</div>
      </Modal>
    );
  }
});

module.exports = NoteModal;
