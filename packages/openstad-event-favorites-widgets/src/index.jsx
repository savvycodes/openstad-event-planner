import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@savvycodes/event-favorites';

const OpenstadEventFavorites = {
  renderElement: function (config, elem) {
    ReactDOM.render(<App config={config} />, elem);
  },
};

export { OpenstadEventFavorites };
