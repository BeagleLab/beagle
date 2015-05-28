var React = require('react')
var UserBar = require('./userBar.jsx')

var Comment = React.createClass({
  displayName: 'Comment',
  propTypes: {
    account: React.PropTypes.object,
    text: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      submitted: true,
      text: this.props.text || null
    }
  },
  onClick: function () {
    // TODO Add in db.put() call here. Perhaps on handleChange, too.

    this.setState({ submitted: !this.state.submitted })
  },
  share: function () {
    // TODO Add in share options
    console.log('No share functionality yet')
  },
  delete: function () {
    // TODO Add in delete functionality
    console.log('No delete functionality yet')
  },
  handleChange: function (event) {
    this.setState({ text: event.target.value })
  },
  render: function () {
    var commentStyle = {
      margin: '5px 0px',
      border: '1px solid #999',
      borderLeft: '3px solid #AE8DC7',
      borderRadius: '2px'
    }

    var textStyle = {
      padding: '5px'
    }

    var inputStyle = {
      width: '90%',
      margin: '10px'
    }

    var submitButtonStyle = {
      backgroundColor: '#4DAE4A',
      color: 'white',
      float: 'right',
      margin: '10px',
      fontSize: '12px'
    }

    // Cruel haxk
    var editStyle = {
      float: 'right',
      marginTop: '-42px',
      marginRight: '10px'
    }

    var clearFix = {clear: 'both'}

    var text = (this.state.text) ? this.state.text :
      'Realism dolphin sentient artisanal plastic youtube franchise Kowloon numinous pen bridge meta-geodesic tower receding. Convenience store nano-dome 3D-printed bicycle shanty town claymore mine 8-bit. Realism rebar katana paranoid marketing smart-faded systemic skyscraper nano-shrine girl Tokyo urban franchise. Wristwatch dolphin ablative shoes neural voodoo god shrine math. Sunglasses A.I. assassin sub-orbital-ware-space assault Shibuya cardboard skyscraper geodesic crypto-spook kanji.'

    var rendered

    if (this.state.submitted) {
      rendered = (
        <div>
          <div style={editStyle}>
            <i style={{paddingRight: '5px'}} className='fa fa-share' onClick={this.share}></i>
            <i className='fa fa-pencil' onClick={this.onClick}></i>
            <i style={{paddingLeft: '5px'}} className='fa fa-times' onClick={this.delete}></i>
          </div>
          <div style={clearFix}></div>
          <p style={textStyle}>
            {text}
          </p>
        </div>
      )
    } else {
      rendered = (
        <div>
          <textarea type='input' style={inputStyle} placeholder='Share an insight' onChange={this.handleChange} defaultValue={text} />
          <button className='btn btn-default' style={submitButtonStyle} onClick={this.onClick}>Comment</button>
        </div>
      )
    }

    return (
      <div style={commentStyle}>

        {/* TODO Remove permissions icon using an option or schema field */}
        <UserBar account={this.props.account} secondaryText='date' />

        {rendered}

        <div style={clearFix}></div>

      </div>
    )
  }
})

module.exports = exports = Comment
