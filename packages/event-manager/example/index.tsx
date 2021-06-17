import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2MjM2NjA5MDEsImV4cCI6MTYzOTM4NTcwMX0.was9RUPDVplwGIQSyRBX3WHM4HziSxlx4GN8L3KGo90',
  siteId: 3,
  apiUrl: '/api',
  imageUrl: '/image',
  user: {
    isEventProvider: true,
    role: 'member',
  },
};

// const config = {
//   jwt:
//    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2MjM2NTQ2ODEsImV4cCI6MTYzOTM3OTQ4MX0.nOEbuGQqztElsW28fvU2JTfCAhnuqOcarDYnxjGuf6M',
//  siteId: 3,
// apiUrl: '/api',
// imageUrl: '/image',
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
