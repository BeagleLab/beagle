var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem
var scholarLink = require('google-scholar-link')
var staticPath = require('../utilities/staticPath.js')

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
    },
    dropdownIcons = {
      maxWidth: '20px',
      paddingRight: '3px'
    },
    menuItemStyle = {
      padding: '3px 0px'
    }

    // There has got to be an easier way to do this.
    // TODO Get comment and share counts programmatically
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
      <div className='react-comp-publication'>
        { dummyWarning }
        {/* TODO Display a preview image of the document currently being shown. */}
        <h4>{this.state.data.title}</h4>
        {/* TODO Display an avatar of the authors, if they are Beagle members or if an avatar can be sourced */}
        <p>{this.state.data.authors.join(', ')}</p>
        <span style={{height: '40px', width: '20%'}}>
          {countsCommentIcon} {this.state.data.metadata.commentCount} {countsBreak}
          {countsShareIcon} {this.state.data.metadata.shareCount}
        </span>
        <DropdownButton title={'Tools'} style={ddStyle} className='pull-right'>
          <MenuItem eventKey={1} style={menuItemStyle} ><img style={dropdownIcons} src={staticPath(null, 'images/doi.png')} />{this.state.data.metadata.doi}</MenuItem>
          <MenuItem eventKey={2} style={menuItemStyle} href={scholarLink(this.state.data.title, {'author': this.state.data.authors})} target='_new'><img style={dropdownIcons} src={staticPath(null, 'images/google_scholar.png')} /> Google Scholar</MenuItem>
          {/* TODO Make a link module
          <MenuItem eventKey={1}>Copy link to Beagle</MenuItem> */}
          {/* TODO Make a cite component
          <MenuItem eventKey={4}>Cite</MenuItem> */}
        </DropdownButton>
      </div>
    )
  }
})
