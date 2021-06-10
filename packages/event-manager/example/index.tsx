import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE2MjMzMTAyODYsImV4cCI6MTYzOTAzNTA4Nn0.U5nJqFRrHZ0DajEQEhmcqWS8axgx4L0aWJHGAf9Umlo',
  siteId: 2,
  apiUrl: 'http://localhost:8111',
  user: {
    isEventProvider: true,
    role: 'member',
  },
};

// const config = {
//   jwt:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTYyMzMxMDE3NSwiZXhwIjoxNjM5MDM0OTc1fQ.H97xnpsJAOl01ASPw57_wJ020N8vmUnkQ8_JRv8JxQ0',
//   siteId: 2,
//   apiUrl: 'http://localhost:8111',
//   user: {
//     isEventProvider: false,
//     role: 'admin',
//   },
// };

const theme = {
  // danger: 'blue',
};

ReactDOM.render(
  <React.StrictMode>
    <App config={config} theme={theme} />
  </React.StrictMode>,
  document.querySelector('.openstad-events')
);
