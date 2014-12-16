var React = require('react')
var App = require('./app.jsx')

// put dummy data here:
var data = {}

data.sampleAltmetrics = {
  title: "Rapid prototyping of 3D DNA-origami shapes with caDNAno",
  journal: "Nucleic acids research 37 (15), 5001",
  doi: "10.1093/nar/gkp436",
  cited_by_tweeters_count: "9001",
  subjects: ['tag1', 'tag2'],
}

data.m1 = {
  app: {
    altmetrics: data.sampleAltmetrics
  }
}


module.exports = React.createClass({
  render: function() {

    // add the view here:
    return (
      <div className='wrapper'>
        <h1>Milestones</h1>
        <p>This is a listing of milestones, so we can quickly see what we're working toward.</p>

        <h2>Milestones 1: basic app sidebar rendering</h2>
        <App data={data.m1.app} />

        <h2>Milestone 2: ...</h2>

        <h2>Milestone 3: ...</h2>

      </div>
    )
  }
})
