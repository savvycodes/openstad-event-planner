import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

apos.define('@savvycodes/openstad-event-planner-widgets', {
  extend: 'openstad-widgets',
  construct: function(self, options) {
    console.log('@savvycodes/openstad-event-planner-widgets', 'construct', {
      self,
      options,
    });
    self.play = function($widget, data, options) {
      const element = $widget.find('.openstad-event-planner')[0];
      if (element) {
        ReactDOM.render(<App config={data.config} />, element);
      } else {
        console.error(
          'Could not render @savvycodes/openstad-event-planner-widgets.',
          'Could not find element with class openstad-event-planner'
        );
      }
      console.log('@savvycodes/openstad-event-planner-widgets', 'play', {
        $widget,
        data,
        options,
        element,
      });
    };
  },
});
