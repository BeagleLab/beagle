/** @jsx React.DOM */
var React = require('react');
var Csv = require('../utilities/csv.jsx')
var Graph = require('../views/graph.jsx')
var Tags = require('../components/tags.jsx')
var Cite = require('../components/cite.jsx')
var Champion = require('../components/champion.jsx')

var PaperModal = React.createClass({
    displayName: 'PaperModal',
    render: function () {
        return (
	        	<div className="panel-body">
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
            </div>
        );
    }
});

module.exports = PaperModal;
