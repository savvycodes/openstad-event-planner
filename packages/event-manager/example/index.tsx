import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYyMzA1NDk2MywiZXhwIjoxNjM4Nzc5NzYzfQ.BwfPQFJquY370iYO2lckiR19JsXGf9NuIIt5_xLFeMs',
  siteId: 2,
  apiUrl: 'http://localhost:8111',
  user: {
    isEventProvider: true,
    role: 'admin',
  },
};

const theme = {
  // danger: 'blue',
};

ReactDOM.render(
  <React.StrictMode>
    <App config={config} theme={theme} />
  </React.StrictMode>,
  document.querySelector('.openstad-events')
);
