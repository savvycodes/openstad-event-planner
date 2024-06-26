import 'react-app-polyfill/ie11';
import 'react-quill/dist/quill.snow.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../src/app';

const config = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImNsaWVudCI6ImRlZmF1bHQiLCJpYXQiOjE3MTc1OTcwMTAsImV4cCI6MTczMzMyMTgxMH0.x78F70Gm8hn3gKk7p-6bUczjEx_bCg85Y1kOvGvYqLk',
  siteId: 3,
  apiUrl: 'http://localhost:8111',
  imageUrl: '/image',
  user: {
    isEventProvider: true,
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
      value: 'category',
      label: 'Categorieën',
      formLabel: 'Selecteer de categorieën die passen bij je activiteit',
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
      value: 'age',
      label: 'Leeftijd',
      formLabel: 'Voor welke leeftijd(en) is je activiteit',
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
  document.querySelector('.openstad-event-planner')
);
