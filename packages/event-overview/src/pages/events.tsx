import React, { useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { styled } from 'goober';
import { Calendar, Grid, MapPin } from 'react-feather';

import { Spinner } from '../components/spinner';
import { ErrorBanner } from '../components/error-banner';
import { FilterSidebar } from '../components/filters';
import { CardWrapper } from '../components/card/card';
import { Header, Main, NavigationItem } from '../components/layout/layout';
import { EventCalendar } from '../components/events/event-calendar';
import { EventTiles } from '../components/events/event-tiles';
import { EventMap } from '../components/events/event-map';

import { useEvents } from '../hooks/use-events';

const styles = {
  Header: styled(Header)`
    display: flex;
    justify-content: flex-end;
  `,
  Container: styled('div')`
    @media (min-width: 1024px) {
      display: flex;
    }
    @media (max-width: 1023px) {
      display: inline-block;
    }
  `,
};

/**
 * Page that shows events
 *
 * @returns
 */
export function EventsPage({}: RouteComponentProps) {
  // @todo: store filters in query string and restore from there
  const [filters, setFilters] = useState<any>(null);
  const [viewType, setViewType] = useState('tile');

  const { events, error, loading } = useEvents(filters);

  if (error) {
    return <ErrorBanner>{error.message}</ErrorBanner>;
  }

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

      <styles.Container>
        <FilterSidebar filters={filters} onChange={setFilters} />

        {loading ? <Spinner /> : null}

        {viewType === 'tile' ? (
          <CardWrapper>
            <EventTiles events={events} />
          </CardWrapper>
        ) : null}
        {viewType === 'calendar' ? <EventCalendar events={events} /> : null}
        {viewType === 'map' ? (
          <div>
            <EventMap events={events} />
            <CardWrapper>
              <EventTiles events={events} />
            </CardWrapper>
          </div>
        ) : null}
      </styles.Container>
    </Main>
  );
}
