import React from 'react';
import { Link } from 'wouter';

import {
  ActivityCard,
  ActivityImage,
  CardTextContainer,
  CardTagsContainer,
  CardTag,
} from '../card/card';
import { BorderedCardTitle, SmallParagraph } from '../text/text';
import { formatAges } from '../ages';

export function EventTiles({ events }: any) {
  return events.map((event: any) => (
    <ActivityCard key={event.id}>
      <Link to={`#/events/${event.id}`}>
        <ActivityImage src={event.image} alt={event.name} />
        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
        </CardTextContainer>
        <SmallParagraph>door {event.organisation.name}</SmallParagraph>
        <CardTagsContainer>
          <CardTag>{formatAges(event.minAge, event.maxAge)}</CardTag>
          <CardTag style={{ display: 'block' }}>
            {event.tags.map((tag: any) => tag.name).join(', ')}
          </CardTag>
          <CardTag style={{ display: 'block' }}>{event.district}</CardTag>
        </CardTagsContainer>
      </Link>
    </ActivityCard>
  ));
}
