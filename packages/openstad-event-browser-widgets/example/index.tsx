import 'react-app-polyfill/ie11';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet';
import 'leaflet.markercluster';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../src/app';

// admin token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzMzcwMTUyMywiZXhwIjoxNjQ5NDI2MzIzfQ.WvCsbHoeeOM-HvOCAUJmlPtW8mLyzVKF6R0oGyyZjv8
// pleb token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYzMzcwMjE0NSwiZXhwIjoxNjQ5NDI2OTQ1fQ.-KjHejLlbhPcI81kmLOeifuKHuFp3XdcjMFHTC66g48

const config = {
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImNsaWVudCI6ImRlZmF1bHQiLCJpYXQiOjE2NTM5MTU3MTAsImV4cCI6MTY2OTY0MDUxMH0.VkKLFpWROaBrR8EqDYI-txFkjvQMx9sIbLJ-ZFS7ib0', //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTYzNDcyNDA0OSwiZXhwIjoxNjUwNDQ4ODQ5fQ.6K64xnl0eIDYCv1xUq3k1L6wuH3f-rTVnzdYhBve5s0',
  siteId: 3,
  apiUrl: '/api',
  imageUrl: '/image',
  user: {
    isEventProvider: false,
    role: 'admin',
  },
  map: {
    accessToken:
      'pk.eyJ1IjoiYmFkbXV0cyIsImEiOiJja3B4eGxiZzYxYXpiMnFwOXY1bnF3OTQ1In0.eHLVPwsrmCLBb1GQWX9EJg',
    id: 'badmuts/ckpxxn1kf0n6t17p3fgmdbgoa',
    tileUrl:
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  },
  themes: [
    {
      id: 'w1151353630559146',
      value: 'Categorieën',
      flag: 'blue',
      mapUploadedFlag: null,
      mapFlagWidth: '',
      mapFlagHeight: '',
      mapicon: '',
      listicon: '',
      color: '',
      initialAvailableBudget: null,
      minimalBudgetSpent: null,
      maxIdeas: null,
      minIdeas: null,
    },
    {
      id: 'w787643766599362890',
      value: 'Leeftijd',
      flag: 'blue',
      mapUploadedFlag: null,
      mapFlagWidth: '',
      mapFlagHeight: '',
      mapicon: '',
      listicon: '',
      color: '',
      initialAvailableBudget: null,
      minimalBudgetSpent: null,
      maxIdeas: null,
      minIdeas: null,
    },
  ],
  areas: [
    { id: 'w16911478967856762', value: 'Centrum' },
    { id: 'w136021711703036594', value: 'Nieuw-West' },
    { id: 'w869620717202683373', value: 'Noord' },
    { id: 'w798411027474221411', value: 'Oost' },
    { id: 'w88663654761504373', value: 'West' },
    { id: 'w322246137345888350', value: 'Weesp' },
    { id: 'w886239040903530283', value: 'Zuid' },
    { id: 'w644839600135710165', value: 'Zuidoost' },
  ],
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
  document.querySelector('.openstad-event-browser')
);
