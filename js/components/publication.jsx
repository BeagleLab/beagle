var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

var data = require('../data/schema.js').mediaObject

// TODO Display conditionally depending on MediaTypes
// TODO Add Comment Count and Share Count appropriately
data.commentCount = '8'
data.shareCount = '2181'
data.metadata = {
  doi: '10.100/100.100'
}

module.exports = React.createClass({
  displayName: 'Publication',
  propTypes: {
   data: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      data: this.props.data || data
    }
  },
  render: function () {
    var dummyWarning

    if (this.state.data.id === '000000') {
      var style = {color: 'red'}
      dummyWarning = <p style={style}>Unable to find DOI: presenting sample data.</p>
    }

    var ddStyle = {
      marginTop: '-15px'
    }
    return (
      <div>
        { dummyWarning }
        {/* TODO Add in the preview?*/}
        <h4>{this.state.data.title}</h4>
        {/* TODO Add in avatar pictures for authors if possible */}
        <p>{this.state.data.authors.join(', ')}</p>
        <span style={{height: '40px', width: '20%'}}>
          <i className='fa fa-comment'></i> {this.state.data.commentCount} <br />
          <i className='fa fa-share'></i> {this.state.data.shareCount}
        </span>
        {/* TODO Add icons */}
        <DropdownButton title={'Tools'} style={ddStyle} className='pull-right'>
          {/* TODO Make a link module */}
          <MenuItem eventKey={1}>Copy link to Beagle</MenuItem>
          {/* TODO Add the DOI object in the current schema to metadata */}
          <MenuItem eventKey={2}>{this.state.data.metadata.doi}</MenuItem>
          {/* TODO Make a google scholar link module: https://scholar.google.com/scholar?hl=en&q= + query */}
          <MenuItem eventKey={3}>Google Scholar</MenuItem>
          {/* TODO Make a cite component */}
          <MenuItem eventKey={4}>Cite</MenuItem>
        </DropdownButton>
      </div>
    )
  }
})
