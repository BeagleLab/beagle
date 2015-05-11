/** @jsx React.DOM */
var React = require('react');
var Csv = require('../utilities/csv.jsx')
var Graph = require('./graph.jsx')
var Tags = require('./tags.jsx')
var Cite = require('./cite.jsx')
var Champion = require('./champion.jsx')
var Modal = require('./modal.jsx')


var PaperModal = React.createClass({
  displayName: 'PaperModal',
  render: function () {
    return (
    	<Modal>
    		<h4>{this.props.data.publication.title}</h4>
    		<p className='authors'>
    			<Csv field='name' data={this.props.data.publication.author} />
    		</p>
    		<p>{this.props.data.publication.journal}<br />
   			<b>doi: </b>{this.props.data.publication.doi}</p>

   			<h6>Graph</h6>
   			<Graph data={this.props.data.publication} />

   			<h6>Tags</h6>
   			<Tags data={this.props.data.publication.subjects} />

   			<h6>Share with Colleagues</h6>
   			<Champion />

   			<h6>Cite</h6>
   			<Cite />
      </Modal>
    );
  }
});

module.exports = PaperModal;
