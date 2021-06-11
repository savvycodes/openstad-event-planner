import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import useDebounce from '../../hooks/use-debounce';

import { StyledInput } from './input';
import { Spinner } from '../spinner';
import { Paragraph } from '../text/text';

type LocationFinderProps = {
  onSelect: (point: Geometry) => void;
} & InputHTMLAttributes<HTMLInputElement>;

type Geometry = {
  type: 'Point';
  coordinates: [Number, Number];
};

export function LocationFinder({ onSelect, ...props }: LocationFinderProps) {
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
      {locations &&
        locations.features &&
        locations.features.map((location: any, index: number) => (
          <Paragraph
            key={index}
            onClick={() => {
              onSelect(location.geometry);
              setLocations([]);
            }}
          >
            {location.properties.display_name}
          </Paragraph>
        ))}
      {!loading &&
      query &&
      locations &&
      locations.features &&
      !locations.features.length ? (
        <Paragraph>Geen resultaten</Paragraph>
      ) : null}
    </>
  );
}

function searchLocations(search: string) {
  return fetch(
    `https://nominatim.openstreetmap.org/search?format=geojson&q=${encodeURIComponent(
      search
    )}`
  )
    .then(res => res.json())
    .catch(console.error);
}
