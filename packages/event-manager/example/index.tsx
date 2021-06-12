import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE2MjM0OTYwMDMsImV4cCI6MTYzOTIyMDgwM30.mtxOcaJcG-KgYHrh6h3_ipcmi-s4lHiAj0kT0-tskrE',
  siteId: 2,
  apiUrl: 'http://localhost:8111',
  imageUrl: '/image',
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
