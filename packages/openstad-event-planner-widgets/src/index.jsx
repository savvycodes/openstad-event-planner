import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@savvycodes/event-manager';

const OpenstadEventManager = {
  renderElement: function (config, elem) {
    ReactDOM.render(<App config={config} />, elem);
  },
};

export { OpenstadEventManager };
