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

export function EventTiles({ events }: any) {
  return events.map((event: any) => (
    <ActivityCard key={event.id}>
      <Link to={`#/events/${event.id}`}>
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
