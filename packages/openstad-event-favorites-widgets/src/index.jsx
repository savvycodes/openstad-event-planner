import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@savvycodes/event-favorites';

apos.define('openstad-event-favorites-widgets', {
  extend: 'openstad-widgets',
  construct: function (self, options) {
    console.log('construct.options', options);
    self.play = function ($widget, data, options) {
      console.log('$widget', $widget);
      console.log('data', data);
      console.log('options', options);
      const element = $widget.find('.openstad-event-favorites')[0];
      console.log('element', element);
      ReactDOM.render(<App config={data.config} />, element);
    };
  },
});
