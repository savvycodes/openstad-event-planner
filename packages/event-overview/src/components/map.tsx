import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useConfig } from '../context/config-context';

export function Map({ children, ...props }: any) {
  const config = useConfig();

  return (
    <MapContainer
      center={[52.367, 4.904]}
      zoom={13}
      style={{ minHeight: '500px', width: '100%' }}
      {...props}
    >
      <TileLayer
        url={
          config.map.tileUrl ||
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
        accessToken={config.map.accessToken}
        id={config.map.id || 'mapbox/streets-v9'}
      />
      {children}
    </MapContainer>
  );
}
