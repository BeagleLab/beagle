var React = require('react')
var Modal = require('../components/modal.jsx')

module.exports = React.createClass({
	displayName: 'Cite Modal',
	render: function () {
    return (
      <Modal>

        <h4 className="gray">Bibliography</h4>
        <p className="lead">{this.props.data.title}</p>

        <ul className="nav nav-pills nav-justified">
        <li className="active"><a href="#">BibTex</a></li>
        <li><a href="#">EndNote</a></li>
        <li><a href="#">ACM Ref</a></li>
        </ul>

        <br />
        <pre>
          CODE WILL GO HERE (Theres an error with semicolons atm).
          {/*@inproceedings{Maymounkov:2002:KPI:646334.687801,
          author = {Maymounkov, Petar and Mazi\`{e}res, David},
          title = {Kademlia: A Peer-to-Peer Information System Based on the XOR Metric},
          booktitle = {Revised Papers from the First International Workshop on Peer-to-Peer Systems},
          series = {IPTPS '01},
          year = {2002},
          isbn = {3-540-44179-4},
          pages = {53--65},
          numpages = {13},
          url = {http://dl.acm.org/citation.cfm?id=646334.687801},
          acmid = {687801},
          publisher = {Springer-Verlag},
          address = {London, UK, UK},
          } */}
        </pre>

      </Modal>
    )
  }
})
