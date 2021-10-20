import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { styled } from 'goober';

import { CardWrapper } from '../components/card/card';
import {
  DFlex,
  Header,
  Main,
} from '../components/layout/layout';
import { EventTiles } from '../components/events/event-tiles';
import { Button, RedButton } from '../components/button/button';
import { EmptyState } from '../components/emptyState/emptyState';

import { useEvents } from '../hooks/use-events';
import { Title } from '../components/text/text';

const styles = {
  Header: styled(Header)`
    display: flex;
    justify-content: flex-end;
  `,
  ContentContainer: styled('div')`
    display: block;
  `,
  DFlex: styled(DFlex)`
    align-items: flex-start;
  `,
  OtherActivitiesContainer: styled('div')`
    background-color: white;
    text-align: center;
  `,

  Title: styled(Title)`
  font-size: 2rem;
  `,

  FavoriteActivities: styled('div')`
    margin-bottom: 32px;
    background: ${props => props.theme.colors.background};
  `,
};

/**
 * Page that shows favorite events
 *
 * @returns
 */
export function EventsPage({}: RouteComponentProps) {
  let storedFilters = sessionStorage.getItem('events.filter');
  storedFilters = storedFilters ? JSON.parse(storedFilters) : null;

  // @todo: store filters in query string and restore from there
  const [filters] = useState<any>(storedFilters);
  const [viewType] = useState('tile');

  const { events, next, hasMoreResults } = useEvents(filters);
  

  // const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  // const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

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

  return (
    <Main>
      
      {events.length === 0 ? <EmptyState /> : 
      <>
        <styles.ContentContainer>
          <styles.FavoriteActivities>
            <CardWrapper>
              <EventTiles add={false} events={events} />
              {hasMoreResults ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          <Button onClick={next}>Meer laden</Button>
        </div>
      ) : null}
            </CardWrapper>
            </styles.FavoriteActivities>
            



      <styles.OtherActivitiesContainer>
          <styles.Title>Misschien vind je deze activiteiten ook leuk!</styles.Title>

          <CardWrapper>
              <EventTiles add={true} events={[events[0], events[1], events[2]]} />
            </CardWrapper>

            <RedButton>Alle activiteiten bekijken</RedButton>
      </styles.OtherActivitiesContainer>
        </styles.ContentContainer>
    
      

      </>
}
    </Main>
  );
}
