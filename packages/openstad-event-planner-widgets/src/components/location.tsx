import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

interface LocationProps {
  lat: number;
  lon: number;
}

export function Location({ lat, lon }: LocationProps) {
  const [location, setLocation] = useState<any>(null);
  const address = location?.features?.[0]?.properties?.address;

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=geojson&addressdetails=1&accept-language=nl&countrycodes=nl&lat=${lat}&lon=${lon}`
    )
      .then(res => res.json())
      .then(geojson => {
        setLocation(geojson);
      })
      .catch(console.error);
  }, [lat, lon]);

  if (!location || !address) {
    return null;
  }

  return (
    <>
      {`${address.road || ''} ${address.house_number || ''}`} <br />
      {`${address.postcode || ''} ${address.town || address.city || ''}`}
    </>
  );
}
