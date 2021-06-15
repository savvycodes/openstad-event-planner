import React, { useState } from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import { Marker, Popup } from 'react-leaflet';

import { Spinner } from '../components/spinner';
import { ErrorBanner } from '../components/error-banner';
import { FilterSidebar } from '../components/filters';
import { Map } from '../components/map';

export function EventsPage({}: RouteComponentProps) {
  const [filters, setFilters] = useState<any>(null);
  const [viewType, setViewType] = useState('tile');

  const { data, error } = useSWR(`/event`);

  if (error) {
    return <ErrorBanner>{error.message}</ErrorBanner>;
  }

  if (!data) {
    return <Spinner />;
  }

  function filterQuery(filter: any) {
    const fields = ['name', 'description'];
    return (event: any) =>
      filter && filter.q
        ? fields
            .map(field => event[field].toLowerCase())
            .join(' ')
            .includes(filter.q.toLowerCase())
        : true;
  }

  function filterAge(filter: any) {
    if (filter && filter.ageRanges.length) {
      const range = filter.ageRanges.flat();
      const min = Math.min(...range);
      const max = Math.max(...range);

      return (event: any) => {
        return event.minAge > min && event.maxAge < max;
      };
    }

    // skip
    return () => true;
  }

  function filterDistrict(filter: any) {
    return (event: any) =>
      filter && filter.districts.length
        ? filter.districts.includes(event.district)
        : true;
  }

  function filterTags(filter: any) {
    return (event: any) =>
      filter && filter.tagIds.length
        ? filter.tagIds.some((tagId: number) =>
            event.tags.map((tag: any) => tag.id).includes(tagId)
          )
        : true;
  }

  function filterDates(filter: any) {
    if (filter && filter.dates.length) {
      return (event: any) => {
        const dates = event.slots.map((slot: any) => new Date(slot.startTime));
        return dates.some((date: Date) =>
          filter.dates.some(
            ($date: Date) => date.toDateString() === $date.toDateString()
          )
        );
      };
    }
    return () => true;
  }

  // @todo: filter data locally
  // @todo: build filter query for events
  const { records: events } = data;
  const filteredEvents = events
    .filter(filterQuery(filters))
    .filter(filterAge(filters))
    .filter(filterDistrict(filters))
    .filter(filterTags(filters))
    .filter(filterDates(filters));

  return (
    <div style={{ display: 'flex' }}>
      <FilterSidebar onChange={setFilters} />

      <div>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            setViewType('map');
          }}
        >
          Kaart
        </a>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            setViewType('calendar');
          }}
        >
          Kalender
        </a>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            setViewType('tile');
          }}
        >
          Tegels
        </a>
      </div>

      {viewType === 'tile' ? <EventTiles events={filteredEvents} /> : null}
      {viewType === 'calendar' ? <EventTiles events={filteredEvents} /> : null}
      {viewType === 'map' ? <EventMap events={filteredEvents} /> : null}
    </div>
  );
}

function EventTiles({ events }: any) {
  return events.map((event: any) => (
    <div key={event.id}>
      <img src={event.image} alt={event.name} />
      <Link to={`/events/${event.id}`}>
        <h1>{event.name}</h1>
      </Link>
      <p>
        {event.minAge}-{event.maxAge} jaar
      </p>
      <p style={{ display: 'block' }}>
        {event.tags.map((tag: any) => tag.name).join(', ')}
      </p>
      <p style={{ display: 'block' }}>{event.district}</p>
    </div>
  ));
}

function EventMap({ events }: any) {
  return (
    <div style={{ minHeight: '500px', width: '100%' }}>
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
