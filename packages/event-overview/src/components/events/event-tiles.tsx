import { styled } from 'goober';
import React from 'react';
import { Link } from 'wouter';

import {
  ActivityCard,
  ActivityImage,
  CardTextContainer,
  CardTagsContainer,
  CardTag,
} from '../card/card';
import { BorderedCardTitle } from '../text/text';

const styles = {
  SmallParagraph: styled('p')`
    display: block;
    font-size: 12px;
  `,
};
import { formatAges } from '../ages';
import { EmptyState } from '../emptyState/emptyState';

const LoadEvents = (events: any) => {
  return events.map((event: any) => (
    <Link to={`#/events/${event.id}`} key={event.id}>
      <ActivityCard>
        <ActivityImage src={event.image} alt={event.name} />

        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
        </CardTextContainer>
        <styles.SmallParagraph>
          door {event.organisation.name}
        </styles.SmallParagraph>
        <CardTagsContainer>
          <CardTag>{formatAges(event.minAge, event.maxAge)}</CardTag>
          {event.tags.map((tag: any) => (
            <CardTag key={tag.id}>{tag.name}</CardTag>
          ))}
          <CardTag>{event.district}</CardTag>
        </CardTagsContainer>
      </ActivityCard>
    </Link>
  ));
};

export function EventTiles({ events }: any) {
  return events && events.length > 0 ? LoadEvents(events) : <EmptyState />;
}
