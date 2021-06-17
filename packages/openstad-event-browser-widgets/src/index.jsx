import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@savvycodes/event-overview';

const OpenstadEventBrowser = {
  renderElement: function (config, elem) {
    ReactDOM.render(<App config={config} />, elem);
  },
};

export { OpenstadEventBrowser };
