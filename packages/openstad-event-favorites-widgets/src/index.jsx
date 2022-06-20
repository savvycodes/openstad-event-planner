import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

apos.define('@savvycodes/openstad-event-favorites-widgets', {
  extend: 'openstad-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      const element = $widget.find('.openstad-event-favorites')[0];
      if (element) {
        ReactDOM.render(<App config={data.config} />, element);
      } else {
        console.error(
          'Could not render @savvycodes/openstad-event-favorites-widgets.',
          'Could not find element with class openstad-event-favorites'
        );
      }
    };
  },
});
