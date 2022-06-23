import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/use-debounce';

import { StyledInput } from './input';
import { Spinner } from '../spinner';
import { Paragraph } from '../text/text';
import { LocationListItem } from '../list/list';

export function LocationFinder({ onSelect, ...props }: any) {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      searchLocations(debouncedQuery)
        .then(setLocations)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [debouncedQuery]);

  return (
    <>
      <StyledInput
        {...props}
        type="text"
        onChange={(e: any) => setQuery(e.target.value)}
        value={query}
      />
      {loading ? <Spinner /> : null}
      <div className="location-finder">
        {locations &&
          locations.features &&
          locations.features.map((location: any, index: number) => (
            <LocationListItem className="location-finder__item" key={index}>
              <p
                onClick={() => {
                  onSelect(location.geometry);
                  setLocations([]);
                }}
              >
                {`${location.properties.address.road} ${location.properties.address.house_number}`}{' '}
                <br />
                {`${location.properties.address.postcode} ${location.properties
                  .address.town || location.properties.address.city}`}
              </p>
            </LocationListItem>
          ))}
        {!loading &&
        query &&
        locations &&
        locations.features &&
        !locations.features.length ? (
          <Paragraph>Geen resultaten</Paragraph>
        ) : null}
      </div>
    </>
  );
}

function searchLocations(search: string) {
  return fetch(
    `https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&accept-language=nl&countrycodes=nl&limit=5&q=${encodeURIComponent(
      search
    )}`
  )
    .then(res => res.json())
    .catch(console.error);
}
