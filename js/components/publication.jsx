var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem
var scholarLink = require('google-scholar-link')
var staticPath = require('../utilities/staticPath.js')

// TODO Display conditionally depending on MediaTypes

module.exports = React.createClass({
  displayName: 'Publication',
  propTypes: {
    data: React.PropTypes.object
  },
  getInitialState: function () {
    return {}
  },
  render: function () {
    console.log('this.props.data', this.props.data)
    var dummyWarning

    if (!this.props.data || this.props.data.id === '000000') {
      var style = {color: 'grey', marginTop: 10}
      dummyWarning = <p style={style}>Unable to find a DOI or get document metadata. </p>
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

    function preventDefault () {}

    // There has got to be an easier way to do this.
    // TODO Get comment and share counts programmatically
    var countsCommentIcon, countsShareIcon, publicationComponent
    if (this.props.data) {
      if (!this.props.data.metadata) {
        this.props.data.metadata = false
      } else {
        if (this.props.data.metadata.commentCount) {
          countsCommentIcon = (<i className='fa fa-comment'></i>)
        }
        if (this.props.data.metadata.shareCount) {
          countsShareIcon = (<i className='fa fa-share'></i>)
        }
      }

      publicationComponent = (
      <div className='react-comp-publication'>
        {/* TODO Display a preview image of the document currently being shown. */}
        <h4>{this.props.data.title}</h4>
        {/* TODO Display an avatar of the authors, if they are Beagle members or if an avatar can be sourced */}
        <p>{ (this.props.data.authors) ? this.props.data.authors.join(', ') : null }</p>
        <span style={{height: '40px', width: '20%'}}>
          {countsCommentIcon} {this.props.data.metadata.commentCount} <br />
          {countsShareIcon} {this.props.data.metadata.shareCount}
        </span>
        <DropdownButton title={'Tools'} style={ddStyle} className='pull-right'>
          <MenuItem onSelect={preventDefault} style={menuItemStyle}>
            {/* TODO Link out to some DOI metric or database */}
            <img style={dropdownIcons} src={staticPath(null, 'images/doi.png')} />{this.props.data.doi}
          </MenuItem>
          <MenuItem eventKey={1} style={menuItemStyle} href={
            scholarLink(this.props.data.title, {'author': (this.props.data.authors) ? this.props.data.authors : null})}
            target='_new'>
            <img style={dropdownIcons} src={staticPath(null, 'images/google_scholar.png')} /> Google Scholar
          </MenuItem>
          {/* TODO Make a link module
          <MenuItem eventKey={1}>Copy link to Beagle</MenuItem> */}
          {/* TODO Make a cite component
          <MenuItem eventKey={4}>Cite</MenuItem> */}
        </DropdownButton>
      </div>
      )
    }

    return (
        <div> { (publicationComponent) ? publicationComponent : dummyWarning } </div>
    )
  }
})
