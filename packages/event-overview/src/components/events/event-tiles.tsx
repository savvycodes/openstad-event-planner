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

export function EventTiles({ events }: any) {
  return events.map((event: any) => (
    <Link to={`#/events/${event.id}`}>
      <ActivityCard key={event.id}>
        <ActivityImage src={event.image} alt={event.name} />
        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
        </CardTextContainer>
        <styles.SmallParagraph>
          door {event.organisation.name}
        </styles.SmallParagraph>
        <CardTagsContainer>
          <CardTag>
            {event.minAge}-{event.maxAge} jaar
          </CardTag>
          <CardTag style={{ display: 'block' }}>
            {event.tags.map((tag: any) => tag.name).join(', ')}
          </CardTag>
          <CardTag style={{ display: 'block' }}>{event.district}</CardTag>
        </CardTagsContainer>
      </ActivityCard>
    </Link>
  ));
}
