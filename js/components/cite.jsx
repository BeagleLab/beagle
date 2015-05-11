var React = require('react')

module.exports = React.createClass({
	displayName: 'Cite',
  render: function () {
    return (
      <div id="other-btns" className="btn-group">
        {/* After the q param, insert the title of the paper with + delimiters to link out */}
        <a href="http://scholar.google.com/scholar?q=" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="View in Google Scholar"><i className="fa fa-google"></i> Scholar</a>
        <a href="#bibtex" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Get BibTex"><i className="fa fa-file-text"></i> BibTex</a>
      </div>
    )
  }
})
