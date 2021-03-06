const React = require('react');
const _ = require('lodash');

const AppActions = require('../actions/app-actions');

const Topologies = React.createClass({

  onTopologyClick: function(ev) {
    ev.preventDefault();
    AppActions.clickTopology(ev.currentTarget.getAttribute('rel'));
  },

  renderSubTopology: function(subTopology) {
    const isActive = subTopology.name === this.props.currentTopology.name;
    const topologyId = subTopology.id;
    const title = this.renderTitle(subTopology);
    const className = isActive ? 'topologies-sub-item topologies-sub-item-active' : 'topologies-sub-item';

    return (
      <div className={className} title={title} key={topologyId} rel={topologyId}
        onClick={this.onTopologyClick}>
        <div className="topologies-sub-item-label">
          {subTopology.name}
        </div>
      </div>
    );
  },

  renderTitle: function(topology) {
    return ['Nodes: ' + topology.stats.node_count,
      'Connections: ' + topology.stats.node_count].join('\n');
  },

  renderTopology: function(topology) {
    const isActive = topology.name === this.props.currentTopology.name;
    const className = isActive ? 'topologies-item-main topologies-item-main-active' : 'topologies-item-main';
    const topologyId = topology.id;
    const title = this.renderTitle(topology);

    return (
      <div className="topologies-item" key={topologyId}>
        <div className={className} title={title} rel={topologyId} onClick={this.onTopologyClick}>
          <div className="topologies-item-label">
            {topology.name}
          </div>
        </div>
        <div className="topologies-sub">
          {topology.sub_topologies && topology.sub_topologies.map(this.renderSubTopology)}
        </div>
      </div>
    );
  },

  render: function() {
    const topologies = _.sortBy(this.props.topologies, function(topology) {
      return topology.name;
    });

    return (
      <div className="topologies">
        {this.props.currentTopology && topologies.map(function(topology) {
          return this.renderTopology(topology);
        }, this)}
      </div>
    );
  }

});

module.exports = Topologies;
