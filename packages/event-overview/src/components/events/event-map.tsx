import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Link } from 'wouter';

import { Map } from '../map';

export function EventMap({ events }: any) {
  const markerGroup = useMemo(() => {
    return (
      <MarkerClusterGroup showCoverageOnHover={false} key={Date.now()}>
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
    );
  }, [events]);

  return (
    <div
      style={{
        minHeight: '500px',
        width: '100%',
        flexBasis: '100%',
        display: 'block',
      }}
    >
      <Map>{markerGroup}</Map>
    </div>
  );
}
