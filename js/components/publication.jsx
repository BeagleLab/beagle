var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem
var scholarLink = require('google-scholar-link')

var data = require('../data/schema.js').mediaPublication

// TODO Display conditionally depending on MediaTypes

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

    // There has got to be an easier way to do this.
    var countsCommentIcon, countsBreak, countsShareIcon
    if (this.state.data.metadata.commentCount) {
      countsCommentIcon = (<i className='fa fa-comment'></i>)
    }
    if (this.state.data.metadata.commentCount && this.state.data.metadata.shareCount) {
      countsBreak = (<br />)
    }
    if (this.state.data.metadata.shareCount) {
      countsShareIcon = (<i className='fa fa-share'></i>)
    }

    return (
      <div>
        { dummyWarning }
        {/* TODO Add in the preview?*/}
        <h4>{this.state.data.title}</h4>
        {/* TODO Add in avatar pictures for authors if possible */}
        <p>{this.state.data.authors.join(', ')}</p>
        <span style={{height: '40px', width: '20%'}}>
          {countsCommentIcon} {this.state.data.metadata.commentCount} {countsBreak}
          {countsShareIcon} {this.state.data.metadata.shareCount}
        </span>
        {/* TODO Add icons */}
        <DropdownButton title={'Tools'} style={ddStyle} className='pull-right'>
          {/* TODO Make a link module */}
          <MenuItem eventKey={1}>Copy link to Beagle</MenuItem>
          <MenuItem eventKey={2}>{this.state.data.metadata.doi}</MenuItem>
          <MenuItem eventKey={3}><a href={scholarLink(this.state.data.title, {'author': this.state.data.authors})} target='_blank'>Google Scholar</a></MenuItem>
          {/* TODO Make a cite component */}
          <MenuItem eventKey={4}>Cite</MenuItem>
        </DropdownButton>
      </div>
    )
  }
})
