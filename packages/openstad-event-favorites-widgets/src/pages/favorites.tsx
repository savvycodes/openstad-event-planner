import React from 'react';
import { RouteComponentProps } from 'wouter';
import sample from 'lodash.samplesize';

import { CardWrapper } from '../components/card/card';
import { EventTiles } from '../components/events/event-tiles';
import { EmptyState } from '../components/emptyState/emptyState';

import { useFavorites } from '../hooks/use-favorites';
import { useEvents } from '../hooks/use-events';
import { useConfig } from '../context/config-context';

/**
 * Page that shows favorite events
 *
 * @returns
 */
export function FavoritesPage({}: RouteComponentProps) {
  const { data, unfavorite, favorite } = useFavorites();
  const { events } = useEvents({
    favorites: data?.map((event: any) => event.id) ?? [],
  });
  const { activityPageUrl } = useConfig();

  return (
    <main className="event-events__main">
      {!data || !data.length ? (
        <EmptyState />
      ) : (
        <>
          
            <div>
              <CardWrapper className="events__card-wrapper">
                <EventTiles className="events__tile" add={false} events={data} onDelete={unfavorite} />
              </CardWrapper>
            </div>

            {events ? (
              <div>
                <h2>Misschien vind je deze activiteiten ook leuk!</h2>

                <CardWrapper className="events__card-wrapper">
                  <EventTiles 
                    className="events__tile"
                    add={true}
                    events={sample(events, 3)}
                    onFavorite={favorite}
                  />
                </CardWrapper>

                <a href={activityPageUrl}>
                  <button>
                    Alle activiteiten bekijken
                  </button>
                </a>
              </div>
            ) : null}
          
        </>
      )}
    </main>
  );
}
