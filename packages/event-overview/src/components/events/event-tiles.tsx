import { styled } from 'goober';
import React from 'react';
import { Link } from 'wouter';

import {
  ActivityCard,
  ActivityImageWrapper,
  ActivityImage,
  CardTextContainer,
  CardTagsContainer,
  CardTag,
  IconWrapper,
  HeartIcon,
  IconContainer,
} from '../card/card';
import { BorderedCardTitle } from '../text/text';



const styles = {
  SmallParagraph: styled('p')`
    display: block;
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: bold;
    line-height: 14px;
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

const LoadEvents = (events: any) => {
  return events.map((event: any) => (
    <Link to={`#/events/${event.id}`} key={event.id}>
      <ActivityCard>
        <IconWrapper>
          <IconContainer>

            <HeartIcon active/>

            </IconContainer>
          </IconWrapper>
        <ActivityImageWrapper>
          <ActivityImage src={event.image + '/:/rs=w:666'} alt={event.name} loading="lazy" />
          <CardTagsContainer>
            <CardTag>{formatAges(event.minAge, event.maxAge)}</CardTag>
            {event.tags.map((tag: any) => (
              <CardTag key={tag.id}>{tag.name}</CardTag>
            ))}
            <CardTag>{event.district}</CardTag>
          </CardTagsContainer>
        </ActivityImageWrapper>
        <CardTextContainer>
          <BorderedCardTitle title={event.name} />
          <styles.SmallParagraph>
            Door: {event.organisation.name}
          </styles.SmallParagraph>
          <styles.Description>
            {event.description.replace(/(<([^>]+)>)/gi, '')}
          </styles.Description>
        </CardTextContainer>
      </ActivityCard>
    </Link>
  ));
};

// export function EventTiles({ events }: any) {
//   return events && events.length > 0 ? LoadEvents(events) : <EmptyState />;
// }

export function EventTiles({ events }: any) {
  return LoadEvents(events);
}
