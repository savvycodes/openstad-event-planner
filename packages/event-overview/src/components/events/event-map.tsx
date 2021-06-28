import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Link } from 'wouter';

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
        <MarkerClusterGroup>
          {events.map((event: any) => (
            <Marker
              key={event.id}
              position={[
                event.location.coordinates[1],
                event.location.coordinates[0],
              ]}
            >
              <Popup>
                <Link href={`#/events/${event.id}`}>{event.name}</Link>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    </div>
  );
}
