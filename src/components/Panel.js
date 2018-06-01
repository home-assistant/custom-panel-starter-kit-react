import React, { Component } from 'react';
import './Panel.css';
import EntityRow from './EntityRow.js';

class Panel extends Component {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      // Object containing all the state and methods to control Home Assistant
      hass,
      // Boolean if the sidebar is currently shown.
      showMenu,
      // Boolean if the UI should render in narrow mode.
      narrow,
      // Panel information that Home Assistant has (including config at panel.config)
      panel,
    } = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React, {panel.config.name}</h1>
        </header>
        <ul className="App-intro">
          {Object.keys(hass.states)
            .filter(key => !hass.states[key].attributes.hidden)
            .map(key =>
              <EntityRow
                key={key}
                hass={hass}
                stateObj={hass.states[key]}
              />)}
        </ul>
      </div>
    );
  }
}

export default Panel;
