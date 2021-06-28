import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { Map } from '../map';

export function EventMap({ events }: any) {
  return (
    <div
      style={{
        minHeight: '500px',
        width: '100%',
        flexBasis: '100%',
        display: 'block',
      }}
    >
      <Map>
        {events.map((event: any) => (
          <Marker
            key={event.id}
            position={[
              event.location.coordinates[1],
              event.location.coordinates[0],
            ]}
          >
            <Popup>{event.name}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
