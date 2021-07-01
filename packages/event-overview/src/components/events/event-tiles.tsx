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

export function EventTiles({ events }: any) {
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
            <CardTag>{tag.name}</CardTag>
          ))}
          <CardTag>{event.district}</CardTag>
        </CardTagsContainer>
      </ActivityCard>
    </Link>
  ));
}
