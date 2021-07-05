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
  Description: styled('p')`
      font-size: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
  `,
};
import { formatAges } from '../ages';
import { EmptyState } from '../emptyState/emptyState';

const LoadEvents = (events: any) => {
  return events.map((event: any) => (
    <Link to={`#/events/${event.id}`} key={event.id}>
      <ActivityCard>
        <ActivityImage src={event.image} alt={event.name} />

        {console.log(event)}
        

        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
        </CardTextContainer>
        <styles.SmallParagraph>
          door {event.organisation.name}
        </styles.SmallParagraph>
        <styles.Description>
          {event.description}
        </styles.Description>

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
