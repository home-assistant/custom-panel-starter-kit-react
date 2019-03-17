import React, { Component } from 'react';
import './EntityRow.css';

class EntityRow extends Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const entityId = this.props.stateObj.entity_id;
    const domain = entityId.substr(0, entityId.indexOf('.'));
    this.props.hass.callService(domain, 'toggle', {
      entity_id: entityId,
    })
  }

  render() {
    const { stateObj, hass } = this.props;
    const domain = stateObj.entity_id.substr(0, stateObj.entity_id.indexOf('.'));
    const canToggle = 'toggle' in (hass.services[domain] || {})
    return (
      <li className="EntityRow">
        {stateObj.attributes.entity_picture &&
         <img alt="" src={stateObj.attributes.entity_picture} className="avatar" />}
        {stateObj.entity_id}: {stateObj.state}
        {canToggle && <span> <button onClick={this.handleToggle}>Toggle</button></span>}
      </li>
    );
  }
}

export default EntityRow;
