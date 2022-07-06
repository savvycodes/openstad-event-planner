import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { Calendar, Grid, MapPin } from 'react-feather';

import { Spinner } from '../components/spinner';
import { ErrorBanner } from '../components/error-banner';
import { FilterSidebar } from '../components/filters';
import { CardWrapper } from '../components/card/card';
import { useMediaQuery } from 'react-responsive';
import { NavigationItem } from '../components/layout/layout';
import { EventCalendar } from '../components/events/event-calendar';
import { EventTiles } from '../components/events/event-tiles';
import { EventMap } from '../components/events/event-map';
import { EmptyState } from '../components/emptyState/emptyState';

import { useEvents } from '../hooks/use-events';

import '../styles/events.css';

function restoreFilters() {
  try {
    const filterString = sessionStorage.getItem('events.filter');
    const storedFilters = filterString ? JSON.parse(filterString) : null;
    console.log('storedFilters', storedFilters);
    if (storedFilters && storedFilters?.dates) {
      storedFilters.dates = storedFilters?.dates?.map(
        (date: any) => new Date(date)
      );
    }
    return storedFilters;
  } catch (e) {
    console.error('Could not restore filters', e);
    return null;
  }
}

/**
 * Page that shows events
 *
 * @returns
 */
export function EventsPage({}: RouteComponentProps) {
  let storedFilters = restoreFilters();

  // @todo: store filters in query string and restore from there
  const [filters, setFilters] = useState<any>(storedFilters);
  const [viewType, setViewType] = useState('tile');

  const { events, error, loading, next, hasMoreResults } = useEvents(filters);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  useEffect(() => {
    if (['map', 'calendar'].includes(viewType) && hasMoreResults) {
      next();
    }
  }, [viewType, hasMoreResults, next]);

  useEffect(() => {
    if (filters && filters.ageRanges.length && hasMoreResults) {
      next();
    }
  }, [filters, hasMoreResults, next]);

  useEffect(() => {
    if (filters) {
      // store filters in session storage
      sessionStorage.setItem('events.filter', JSON.stringify(filters));
    }
  }, [filters]);

  if (error) {
    return <ErrorBanner>{error.message}</ErrorBanner>;
  }

  return (
    <main className="event-events__main">
      <nav className="event-events__nav">
        <NavigationItem
          className={
            viewType === 'map'
              ? 'event-events__nav-item active'
              : 'event-events__nav-item'
          }
          active={viewType === 'map'}
          onClick={(e) => {
            e.preventDefault();
            setViewType('map');
          }}
        >
          <MapPin size={24} stroke={viewType === 'map' ? '#fff' : '#004699'} />
          Kaart
        </NavigationItem>
        <NavigationItem
          className={
            viewType === 'calendar'
              ? 'event-events__nav-item active'
              : 'event-events__nav-item'
          }
          active={viewType === 'calendar'}
          onClick={(e) => {
            e.preventDefault();
            setViewType('calendar');
          }}
        >
          <Calendar
            size={24}
            stroke={viewType === 'calendar' ? '#fff' : '#004699'}
          />
          Kalender
        </NavigationItem>
        <NavigationItem
          className={
            viewType === 'tile'
              ? 'event-events__nav-item active'
              : 'event-events__nav-item'
          }
          active={viewType === 'tile'}
          onClick={(e) => {
            e.preventDefault();
            setViewType('tile');
          }}
        >
          <Grid size={24} fill={viewType === 'tile' ? '#fff' : '#004699'} />
          Tegels
        </NavigationItem>
      </nav>

      {isTabletOrMobile && (
        <div>
          <FilterSidebar filters={filters} onChange={setFilters} />

          {loading ? <Spinner /> : null}

          {viewType === 'tile' ? (
            <CardWrapper className="events__card-wrapper">
              <EventTiles className="events__tile" events={events} />
              {events.length === 0 ? <EmptyState /> : null}
            </CardWrapper>
          ) : null}
          {viewType === 'calendar' ? (
            <div>
              <EventCalendar filters={filters} events={events} />
            </div>
          ) : null}
          {viewType === 'map' ? (
            <div style={{ width: '100%', height: '100%' }}>
              <EventMap events={events} />
              <CardWrapper>
                <EventTiles events={events} />
                {events.length === 0 ? <EmptyState /> : null}
              </CardWrapper>
            </div>
          ) : null}
        </div>
      )}
      {isDesktopOrLaptop && (
        <div className="events-overview">
          <FilterSidebar filters={filters} onChange={setFilters} />

          {loading ? <Spinner /> : null}

          {viewType === 'tile' ? (
            <CardWrapper>
              <EventTiles events={events} />
              {events.length === 0 ? <EmptyState /> : null}
            </CardWrapper>
          ) : null}
          {viewType === 'calendar' ? (
            <div>
              <EventCalendar events={events} filters={filters} />
            </div>
          ) : null}
          {viewType === 'map' ? (
            <div style={{ width: '100%', height: '100%' }}>
              <EventMap events={events} />
              <CardWrapper>
                <EventTiles events={events} />
                {events.length === 0 ? <EmptyState /> : null}
              </CardWrapper>
            </div>
          ) : null}
        </div>
      )}
      {hasMoreResults ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          <button className="event-events__fetch-more" onClick={next}>
            Meer laden
          </button>
        </div>
      ) : null}
    </main>
  );
}
