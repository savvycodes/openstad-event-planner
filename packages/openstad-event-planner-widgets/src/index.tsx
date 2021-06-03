import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppConfig } from '@savvycodes/event-manager';

const OpenstadEventManager = {
  renderElement: function(config: AppConfig, elem: Element) {
    ReactDOM.render(<App config={config} />, elem);
  },
};

const _global = (window /* browser */ || global) /* node */ as any;
_global.OpenstadEventManager = OpenstadEventManager;
