import React, { useState } from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import { Marker, Popup } from 'react-leaflet';

import { Spinner } from '../components/spinner';
import { ErrorBanner } from '../components/error-banner';
import { FilterSidebar } from '../components/filters';
import {
  CardWrapper,
  ActivityCard,
  ActivityImage,
  CardTextContainer,
  CardTagsContainer,
  CardTag,
} from '../components/card/card';
import { BorderedCardTitle } from '../components/text/text';
import {
  DFlex,
  Header,
  Main,
  NavigationItem,
} from '../components/layout/layout';
import { styled } from 'goober';
import { Calendar, Grid, MapPin } from 'react-feather';

const styles = {
  Header: styled(Header)`
    display: flex;
    justify-content: flex-end;
  `,
};
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
    <Main>
      <styles.Header>
        <NavigationItem
          active={viewType === 'map'}
          onClick={e => {
            e.preventDefault();
            setViewType('map');
          }}
        >
          <MapPin style={{ padding: '0 4px' }} size={24} stroke={'black'} />
          Kaart
        </NavigationItem>
        <NavigationItem
          active={viewType === 'calendar'}
          onClick={e => {
            e.preventDefault();
            setViewType('calendar');
          }}
        >
          <Calendar style={{ padding: '0 4px' }} size={24} stroke={'black'} />
          Kalender
        </NavigationItem>
        <NavigationItem
          active={viewType === 'tile'}
          onClick={e => {
            e.preventDefault();
            setViewType('tile');
          }}
        >
          <Grid style={{ padding: '0 4px' }} size={24} fill={'black'} />
          Tegels
        </NavigationItem>
      </styles.Header>

      <DFlex>
        <FilterSidebar onChange={setFilters} />

        {viewType === 'tile' ? (
          <CardWrapper>
            <EventTiles events={filteredEvents} />
          </CardWrapper>
        ) : null}
        {viewType === 'calendar' ? (
          <CardWrapper>
            <EventTiles events={filteredEvents} />
          </CardWrapper>
        ) : null}
        {viewType === 'map' ? (
          <div>
            <EventMap events={filteredEvents} />
            <CardWrapper>
              <EventTiles events={filteredEvents} />
            </CardWrapper>
          </div>
        ) : null}
      </DFlex>
    </Main>
  );
}

function EventTiles({ events }: any) {
  return events.map((event: any) => (
    <ActivityCard key={event.id}>
      <Link to={`/events/${event.id}`}>
        <ActivityImage src={event.image} alt={event.name} />
        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
        </CardTextContainer>

        <CardTagsContainer>
          <CardTag>
            {event.minAge}-{event.maxAge} jaar
          </CardTag>
          <CardTag style={{ display: 'block' }}>
            {event.tags.map((tag: any) => tag.name).join(', ')}
          </CardTag>
          <CardTag style={{ display: 'block' }}>{event.district}</CardTag>
        </CardTagsContainer>
      </Link>
    </ActivityCard>
  ));
}

function EventMap({ events }: any) {
  return (
    <div style={{ minHeight: '500px', width: '100%', flexBasis: '100%' }}>
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
