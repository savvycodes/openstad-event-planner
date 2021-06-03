import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYyMjY1MjAyMCwiZXhwIjoxNjM4Mzc2ODIwfQ.WKHZjv6UVe-25vE0HmXgBInrOJMgy1SdUEHH8ATMPxw',
  siteId: 2,
  apiUrl: 'http://localhost:8111',
  user: {
    isEventProvider: true,
    role: 'admin',
  },
};

const theme = {};

ReactDOM.render(
  <App config={config} theme={theme} />,
  document.querySelector('.openstad-events')
);
