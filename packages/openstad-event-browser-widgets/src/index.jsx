import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

apos.define('@savvycodes/openstad-event-browser-widgets', {
  extend: 'openstad-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      const element = $widget.find('.openstad-event-browser')[0];
      if (element) {
        ReactDOM.render(<App config={data.config} />, element);
      } else {
        console.error(
          'Could not render @savvycodes/openstad-event-browser-widgets.',
          'Could not find element with class openstad-event-browsers'
        );
      }
    };
  },
});
