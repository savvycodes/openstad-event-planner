import React from 'react';
import { RouteComponentProps } from 'wouter';
import { styled } from 'goober';
import sample from 'lodash.samplesize';

import { CardWrapper } from '../components/card/card';
import { DFlex, Header, Main } from '../components/layout/layout';
import { EventTiles } from '../components/events/event-tiles';
import { RedButtonLink } from '../components/button/button';
import { EmptyState } from '../components/emptyState/emptyState';

import { Title } from '../components/text/text';
import { useFavorites } from '../hooks/use-favorites';
import { useEvents } from '../hooks/use-events';
import { useConfig } from '../context/config-context';

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
export function FavoritesPage({}: RouteComponentProps) {
  const { data, unfavorite, favorite } = useFavorites();
  const { events } = useEvents({
    favorites: data?.map((event: any) => event.id) ?? [],
  });
  const { activityPageUrl } = useConfig();

  return (
    <Main>
      {!data || !data.length ? (
        <EmptyState />
      ) : (
        <>
          <styles.ContentContainer>
            <styles.FavoriteActivities>
              <CardWrapper>
                <EventTiles add={false} events={data} onDelete={unfavorite} />
              </CardWrapper>
            </styles.FavoriteActivities>

            {events ? (
              <styles.OtherActivitiesContainer>
                <styles.Title>
                  Misschien vind je deze activiteiten ook leuk!
                </styles.Title>

                <CardWrapper>
                  <EventTiles
                    add={true}
                    events={sample(events, 3)}
                    onFavorite={favorite}
                  />
                </CardWrapper>

                <RedButtonLink href={activityPageUrl}>
                  Alle activiteiten bekijken
                </RedButtonLink>
              </styles.OtherActivitiesContainer>
            ) : null}
          </styles.ContentContainer>
        </>
      )}
    </Main>
  );
}
