var React = require('react')
var UserBar = require('./userBar.jsx')

var text = 'Realism dolphin sentient artisanal plastic youtube franchise Kowloon numinous pen bridge meta-geodesic tower receding. Convenience store nano-dome 3D-printed bicycle shanty town claymore mine 8-bit. Realism rebar katana paranoid marketing smart-faded systemic skyscraper nano-shrine girl Tokyo urban franchise. Wristwatch dolphin ablative shoes neural voodoo god shrine math. Sunglasses A.I. assassin sub-orbital-ware-space assault Shibuya cardboard skyscraper geodesic crypto-spook kanji. '

var Comment = React.createClass({
  displayName: 'Comment',
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

    return (
      <div style={commentStyle}>
        <UserBar user={this.props.user} />

        <p style={textStyle}>{text}</p>

      </div>
    )
  }
})

module.exports = exports = Comment
