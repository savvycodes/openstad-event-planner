import 'react-app-polyfill/ie11';
import 'leaflet/dist/leaflet.css';
import 'leaflet';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../.';

const config = {
  jwt: '',
  siteId: 2,
  apiUrl: '/api',
  imageUrl: '/image',
  user: {
    isEventProvider: true,
    role: 'member',
  },
  map: {
    accessToken:
      'pk.eyJ1IjoiYmFkbXV0cyIsImEiOiJja3B4eGxiZzYxYXpiMnFwOXY1bnF3OTQ1In0.eHLVPwsrmCLBb1GQWX9EJg',
    id: 'badmuts/ckpxxn1kf0n6t17p3fgmdbgoa',
    tileUrl:
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
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
