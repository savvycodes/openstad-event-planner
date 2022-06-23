import 'react-app-polyfill/ie11';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet';
import 'leaflet.markercluster';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../src/app';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTYzNDcyNDA0OSwiZXhwIjoxNjUwNDQ4ODQ5fQ.6K64xnl0eIDYCv1xUq3k1L6wuH3f-rTVnzdYhBve5s0',
  siteId: 2,
  activityPageUrl: 'http://localhost:1234/#',
  activityDetailPageUrl: 'http://localhost:1234/#/events',
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
