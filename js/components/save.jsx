var React = require('react')

module.exports = React.createClass({
	displayName: 'Save',
	render: function () {
    return (
    <div className='btn-group'>
      <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Save"><i className="fa fa-star"></i></button>
      <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Share"><i className="fa fa-share"></i></button>
      <button className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Cite"><i className="fa fa-edit"></i></button>
    </div>
    )
  }
})
